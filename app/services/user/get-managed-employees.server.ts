import { prisma } from "~/db.server";

export async function getManagedEmployees(userId: number, companyId: number) {
  return await prisma.user.findMany({
    where: {
      AND: [
        {
          companyId: companyId,
          NOT: {
            id: userId,
          },
        },
        {
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
      ],
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
