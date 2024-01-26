import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import { CreateReview } from "~/components/reviews/create-review";
import { prisma } from "~/db.server";
import { getAllCompetenciesFromDepartmentByTeamId } from "~/services/competencies/get-all-competencies-of-department-by-team-id.server";
import { getUserById } from "~/services/user/get-user-by-id.server";

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
    throw new Error("No competencies for this company");
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

  return { review, employee, competencies };
};

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const employeeId = params.employeeId;
  const reviewName = formData.get("name");

  // Ensure reviewName is a string
  const reviewNameString =
    typeof reviewName === "string" ? reviewName : "Default Review Name";

  const reflectionText = formData.get("reflection");

  console.log(reviewNameString);
  const developmentOutlookText = formData.get("developmentOutlook");
  const careerDevelopmentText = formData.get("careerDevelopment");

  // Create a new Review record
  const createdReview = await prisma.review.create({
    data: {
      name: reviewNameString,
      employeeId: Number(employeeId),
      companyId: 1,
      supervisorId: 2,
      reviewType: "REVIEW",
      isComplete: true,
      reflection: {
        create: {
          managerReflection:
            typeof reflectionText === "string" ? reflectionText : "",
          employeeReflection: "",
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

  // Run the ReviewCompetency creation in a transaction
  await prisma.$transaction(reviewCompetencyPromises);

  return redirect("/reviews/dashboard");
};

// Component
export default function ReviewCreateDetails() {
  const data = useLoaderData<typeof loader>();
  return (
    <CreateReview competencies={data.competencies} employee={data.employee} />
  );
}
