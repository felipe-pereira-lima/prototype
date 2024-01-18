// In a file like services/team.server.ts
import { prisma } from "../../db.server";

export async function getTeamForUser(userId: number) {
  if (userId)
    return prisma.user.findUnique({
      where: { id: userId },
      include: {
        team: true,
      },
    });
}
