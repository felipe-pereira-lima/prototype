import { prisma } from "~/db.server";

export async function findUsersByIds(userIds: number[]) {
  return prisma.user.findMany({
    where: {
      id: {
        in: userIds,
      },
    },
  });
}
