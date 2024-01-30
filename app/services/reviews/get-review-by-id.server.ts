import { LoaderFunction } from "@remix-run/node";
import { prisma } from "~/db.server";

export const getReviewById: LoaderFunction = async ({ params }) => {
  const reviewId = params.reviewId;
  if (!reviewId) {
    throw new Response("Not Found", { status: 404 });
  }

  const review = await prisma.review.findUnique({
    where: { id: Number(reviewId) },
    include: {
      competencies: {
        include: {
          competency: true,
        },
      },
      developmentOutlook: true,
      careerDevelopment: true,
      reflection: true,
      employee: true,
      supervisor: true,
    },
  });

  if (!review) {
    throw new Response("Not Found", { status: 404 });
  }

  return review;
};
