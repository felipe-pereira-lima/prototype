import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { CreateReview } from "~/components/reviews/create-review";
import { CreateSelfAssessment } from "~/components/reviews/create-self-assessment";
import { prisma } from "~/db.server";
import { getAllCompetenciesFromDepartmentByTeamId } from "~/services/competencies/get-all-competencies-of-department-by-team-id.server";
import { getSession } from "~/services/session.server";
import { findSupervisorIdForEmployee } from "~/services/user/get-supervisor-by-id.server";
import { getUserById } from "~/services/user/get-user-by-id.server";
import { getEmployeeLevel } from "~/services/user/get-user-level";

export const loader: LoaderFunction = async ({ params }) => {
  const { reviewId, employeeId } = params;

  // Handle invalid employeeId
  const employee = await getUserById(employeeId ?? "");
  if (!employee) {
    throw new Error("Employee not found");
  }

  // Fetch competencies based on the employee's companyId
  let competencies;
  if (employee?.teamId)
    competencies = await getAllCompetenciesFromDepartmentByTeamId(
      employee.teamId
    );

  if (!competencies) {
    throw new Error("User is not assigned to a department");
  }

  const employeeLevel = await getEmployeeLevel(employee.id);

  if (!employeeLevel) {
    throw new Error("User has no skill level");
  }

  let review = null;

  // Ensure reviewId is 'latest' or a valid number for existing reviews
  if (reviewId === "latest") {
    review = { isComplete: false };
  } else if (!isNaN(Number(reviewId))) {
    // Fetch the review for an existing review ID
    review = await prisma.review.findUnique({
      where: {
        id: Number(reviewId),
      },
      include: {
        competencies: {
          include: {
            competency: true,
          },
        },
      },
    });
  }

  return { review, employee, competencies, employeeLevel };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const session = await getSession(request.headers.get("Cookie"));
  const employeeId = session.get("userId");

  // Basic validation (ensure employeeId exists)
  if (!employeeId) {
    throw new Error("Session is invalid or expired.");
  }

  const reviewName = formData.get("name")?.toString() || "Self Assessment";
  const reflectionText = formData.get("reflection")?.toString() || "";
  const developmentGoals = formData.get("developmentGoals")?.toString() || "";

  // Fetch employee details
  const employee = await prisma.user.findUnique({
    where: { id: Number(employeeId) },
  });

  if (!employee) {
    throw new Error("Employee not found");
  }

  // Await the resolution of findSupervisorIdForEmployee
  const supervisorId = await findSupervisorIdForEmployee(employee.id);

  // Create the self-assessment review with reflection and development outlook
  const createdReview = await prisma.review.create({
    data: {
      name: reviewName,
      employeeId: Number(employeeId),
      companyId: employee.companyId,
      supervisorId, // Now correctly awaiting the Promise
      reviewType: "SELF_ASSESSMENT",
      isCompleteBySupervisor: true,
      isCompleteByEmployee: true, // Set true as the employee completes it upon submission
      isEmployeeAllowedToStart: true,
      reflection: {
        create: {
          employeeReflection: reflectionText,
          managerReflection: "",
        },
      },
      developmentOutlook: {
        create: {
          employeeDevelopment: developmentGoals,
          managerDevelopment: "",
        },
      },
      // Include competencies if applicable
    },
  });

  // Redirect or return success response
  return redirect(`/review/${createdReview.id}`);
};

export default function SelfAssessmentCreateDetails() {
  return <CreateSelfAssessment />;
}
