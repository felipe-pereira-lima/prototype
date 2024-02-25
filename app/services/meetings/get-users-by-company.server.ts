import { prisma } from "~/db.server";

export async function listUsersByCompany(companyId: number) {
  return prisma.user.findMany({
    where: { companyId },
    select: { id: true, fullName: true },
  });
}
