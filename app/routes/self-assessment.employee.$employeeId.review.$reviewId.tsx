import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { CreateSelfAssessment } from "~/components/reviews/create-self-assessment";
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

  return { employee, competencies, employeeLevel, reviewId };
};

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const reviewId = params.reviewId;

  if (!reviewId) {
    console.error("Review ID is not provided");
    throw new Response("Review ID is not provided", { status: 400 });
  }

  // Reflection and Development Outlook Updates
  const reflectionText = formData.get("employeeReflection")?.toString();
  const developmentOutlookText = formData
    .get("employeeDevelopment")
    ?.toString();

  // Prepare updates for competencies
  const competencyUpdates = [];

  for (const [key, value] of formData.entries()) {
    if (key.startsWith("competency-score-")) {
      const competencyId = parseInt(key.split("-")[2], 10);
      const employeeScore = parseInt(value.toString(), 10);

      competencyUpdates.push({
        competencyId,
        employeeScore,
      });
    }
  }

  try {
    // Update reflection and development outlook
    await prisma.review.update({
      where: { id: Number(reviewId) },
      data: {
        reflection: reflectionText
          ? {
              upsert: {
                create: { employeeReflection: reflectionText },
                update: { employeeReflection: reflectionText },
              },
            }
          : undefined,
        developmentOutlook: developmentOutlookText
          ? {
              upsert: {
                create: { employeeDevelopment: developmentOutlookText },
                update: { employeeDevelopment: developmentOutlookText },
              },
            }
          : undefined,
        isCompleteByEmployee: true,
      },
    });

    // Update competencies scores
    await Promise.all(
      competencyUpdates.map(({ competencyId, employeeScore }) =>
        prisma.reviewCompetency.updateMany({
          where: {
            reviewId: Number(reviewId),
            competencyId,
          },
          data: {
            employeeScore,
          },
        })
      )
    );

    return redirect("/reviews/dashboard");
  } catch (error) {
    console.error("Failed to update review and competencies", error);
    return new Response("Failed to update the review", { status: 500 });
  }
};

export default function SelfAssessmentCreateDetails() {
  return <CreateSelfAssessment />;
}
