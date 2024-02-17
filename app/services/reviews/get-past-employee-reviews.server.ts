// get-past-employee-reviews.server.ts
import { prisma } from "~/db.server";

export async function getPastEmployeeReviews(employeeId: number) {
  return await prisma.review.findMany({
    where: {
      employeeId: employeeId,
      // Adjust based on your definition of "complete"
      isCompleteBySupervisor: true, // Assuming a review is "complete" when approved by the supervisor
      isCompleteByEmployee: true, // Optional, based on how you define "complete"
    },
    include: {
      competencies: true, // Assuming you want to include competencies
      supervisor: true, // Assuming you want to include supervisor information
    },
  });
}
