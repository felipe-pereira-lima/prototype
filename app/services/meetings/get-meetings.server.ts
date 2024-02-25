import { prisma } from "~/db.server";

export async function listMeetings(companyId: number) {
  return prisma.meeting.findMany({
    where: { companyId },
  });
}
