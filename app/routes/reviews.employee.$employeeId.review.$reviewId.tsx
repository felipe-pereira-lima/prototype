import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { CreateReview } from "~/components/reviews/create-review";
import { prisma } from "~/db.server";
import { getAllCompetenciesFromDepartmentByTeamId } from "~/services/competencies/get-all-competencies-of-department-by-team-id.server";
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

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const employeeId = params.employeeId;
  const reviewName = formData.get("name");

  const employee = await getUserById(employeeId ?? "");
  if (!employee) {
    throw new Error("Employee not found");
  }

  const reviewNameString =
    typeof reviewName === "string" ? reviewName : "Default Review Name";

  const reflectionText = formData.get("managerReflection");
  const developmentOutlookText = formData.get("managerDevelopment");

  const isReviewVisibleToEmployee =
    formData.get("isEmployeeAllowedToStart") === "true";

  const createdReview = await prisma.review.create({
    data: {
      name: reviewNameString,
      employeeId: Number(employeeId),
      companyId: employee.companyId,
      supervisorId: employee.id,
      reviewType: "REVIEW",
      // changes stuff here, if it breaks check here
      isCompleteBySupervisor: true,
      isCompleteByEmployee: false,
      isEmployeeAllowedToStart: isReviewVisibleToEmployee,

      reflection: {
        create: {
          managerReflection:
            typeof reflectionText === "string" ? reflectionText : "",
          employeeReflection: "",
        },
      },
      developmentOutlook: {
        create: {
          managerDevelopment:
            typeof developmentOutlookText === "string"
              ? developmentOutlookText
              : "",
          employeeDevelopment: "",
        },
      },
    },
  });

  const reviewCompetencyPromises = [];
  for (const [key, value] of formData.entries()) {
    if (key.startsWith("competency-") && !key.includes("feedbackText")) {
      const competencyId = parseInt(key.split("-")[1], 10);
      const score = parseInt(value.toString(), 10);
      const feedbackTextKey = `competency-feedbackText-${competencyId}`;
      const feedbackText = formData.get(feedbackTextKey) || "";

      const reviewCompetencyPromise = prisma.reviewCompetency.create({
        data: {
          reviewId: createdReview.id,
          competencyId: competencyId,
          score: score,
          feedbackText: typeof feedbackText === "string" ? feedbackText : "",
        },
      });

      reviewCompetencyPromises.push(reviewCompetencyPromise);
    }
  }

  await prisma.$transaction(reviewCompetencyPromises);

  return redirect("/reviews/dashboard");
};

export default function ReviewCreateDetails() {
  return <CreateReview />;
}
