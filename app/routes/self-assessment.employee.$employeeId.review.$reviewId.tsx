import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { CreateSelfAssessment } from "~/components/reviews/create-self-assessment";
import { prisma } from "~/db.server";
import { getAllCompetenciesFromDepartmentByTeamId } from "~/services/competencies/get-all-competencies-of-department-by-team-id.server";
import { getUserById } from "~/services/user/get-user-by-id.server";
import { getEmployeeLevel } from "~/services/user/get-user-level";

export const loader: LoaderFunction = async ({ params }) => {
  const { reviewId, employeeId } = params;

  const employee = await getUserById(employeeId ?? "");
  if (!employee) {
    throw new Error("Employee not found");
  }

  let competencies;
  if (employee?.teamId) {
    competencies = await getAllCompetenciesFromDepartmentByTeamId(
      employee.teamId
    );
  }

  if (!competencies) {
    throw new Error("User is not assigned to a department");
  }

  const employeeLevel = await getEmployeeLevel(employee.id);
  if (!employeeLevel) {
    throw new Error("User has no skill level");
  }

  const review = await prisma.review.findUnique({
    where: { id: Number(reviewId) },
    select: { name: true },
  });

  if (!review) {
    throw new Error("Review not found");
  }
  return {
    employee,
    competencies,
    employeeLevel,
    reviewId,
    reviewName: review.name,
  };
};

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const reviewId = params.reviewId;

  if (!reviewId) {
    console.error("Review ID is not provided");
    throw new Response("Review ID is not provided", { status: 400 });
  }

  // Extract reflection and development outlook text from the form data
  const reflectionText = formData.get("employeeReflection")?.toString();
  const developmentOutlookText = formData
    .get("employeeDevelopment")
    ?.toString();

  // Initialize an array to store promises for updating competencies, reflections, and development outlook
  const updates = [];

  // Iterate through formData to find employee competencies scores and feedback
  for (const [key, value] of formData.entries()) {
    if (key.startsWith("employee-competency-") && !key.includes("-feedback")) {
      const competencyId = parseInt(key.split("-")[2], 10);
      const employeeScore = parseInt(value.toString(), 10);
      const feedbackTextKey = `employee-competency-${competencyId}-feedback`;
      const employeeFeedbackText = formData.get(feedbackTextKey)?.toString();

      // Push the update promise for each competency to the updates array
      updates.push(
        prisma.reviewCompetency.updateMany({
          where: {
            reviewId: Number(reviewId),
            competencyId,
          },
          data: {
            employeeScore,
            employeeFeedbackText,
          },
        })
      );
    }
  }

  // Add the update promise for reflection, development outlook, and marking the review as complete
  updates.push(
    prisma.review.update({
      where: { id: Number(reviewId) },
      data: {
        reflection: {
          upsert: {
            create: { employeeReflection: reflectionText || "" },
            update: { employeeReflection: reflectionText || "" },
          },
        },
        developmentOutlook: {
          upsert: {
            create: { employeeDevelopment: developmentOutlookText || "" },
            update: { employeeDevelopment: developmentOutlookText || "" },
          },
        },
        isCompleteByEmployee: true,
      },
    })
  );

  try {
    // Execute all updates in a single transaction
    await prisma.$transaction(updates);
    return redirect("/reviews/dashboard");
  } catch (error) {
    console.error("Failed to update review and competencies", error);
    return new Response("Failed to update the review", { status: 500 });
  }
};

export default function SelfAssessmentCreateDetails() {
  return <CreateSelfAssessment />;
}
