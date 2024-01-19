import { LoaderFunction, json } from "@remix-run/node";
import { prisma } from "~/db.server";

export const getEmployeeReviews: LoaderFunction = async ({ params }) => {
  const employeeId = params.employeeId;
  if (!employeeId) {
    return new Response("Employee ID is required", { status: 400 });
  }

  const reviews = await prisma.review.findMany({
    where: { employeeId: parseInt(employeeId, 10) },
  });

  return json(reviews);
};
