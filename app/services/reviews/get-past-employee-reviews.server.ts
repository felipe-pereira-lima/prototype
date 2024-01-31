// get-past-employee-reviews.server.ts
import { prisma } from "~/db.server";

export async function getPastEmployeeReviews(employeeId: number) {
  return await prisma.review.findMany({
    where: {
      employeeId: employeeId,
      isComplete: true,
    },
    include: {
      competencies: true,
      supervisor: true,
    },
  });
}
