import { prisma } from "~/db.server";

export async function getReviewsBySupervisor(supervisorId: number) {
  return await prisma.review.findMany({
    where: { supervisorId },
    include: { employee: true },
  });
}
