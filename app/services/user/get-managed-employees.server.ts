// get-managed-employees.server.ts
import { prisma } from "~/db.server";

export async function getManagedEmployees(userId: number, companyId: number) {
  return await prisma.user.findMany({
    where: {
      companyId: companyId,
      roles: {
        none: {
          role: {
            name: {
              in: ["SUPERVISOR", "ADMIN"],
            },
          },
        },
      },
    },
    include: {
      reviews: {
        where: {
          supervisorId: userId,
        },
        include: {
          competencies: true,
        },
      },
    },
  });
}
