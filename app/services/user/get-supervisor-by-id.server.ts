import { prisma } from "~/db.server";

export async function findSupervisorIdForEmployee(employeeId: any) {
  const latestReview = await prisma.review.findFirst({
    where: {
      employeeId: Number(employeeId),
      reviewType: "REVIEW",
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return latestReview ? latestReview.supervisorId : 0;
}
