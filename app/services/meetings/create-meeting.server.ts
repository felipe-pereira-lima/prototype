import { prisma } from "~/db.server";

export async function createMeeting(data: {
  title: string;
  description?: string;
  scheduledAt: Date;
  companyId: number;
  createdById: number;
  attendeeIds: string[];
}) {
  const attendeeIdsJson = JSON.stringify(data.attendeeIds);

  const { attendeeIds, ...rest } = data;

  return prisma.meeting.create({
    data: {
      ...rest,
      attendeeIds: attendeeIdsJson,
    },
  });
}
