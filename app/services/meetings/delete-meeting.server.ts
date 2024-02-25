import { prisma } from "~/db.server";

export async function deleteMeeting(meetingId: number) {
  return prisma.meeting.delete({
    where: { id: meetingId },
  });
}
