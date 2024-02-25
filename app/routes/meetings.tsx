import { LoaderFunction, MetaFunction, json } from "@remix-run/node";
import { Card, CardDescription, CardTitle } from "~/components/ui/card";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import MeetingForm from "~/components/meetings/meeting-form";

export const meta: MetaFunction = () => {
  return [{ title: "Meetings | List" }];
};

import { redirect, ActionFunction } from "@remix-run/node";
import { parseMeetingFormData } from "~/helpers/parse-meeting-data";
import { createMeeting } from "~/services/meetings/create-meeting.server";
import { listMeetings } from "~/services/meetings/get-meetings.server";
import { useLoaderData } from "@remix-run/react";
import { listUsersByCompany } from "~/services/meetings/get-users-by-company.server";
import { findUsersByIds } from "~/services/user/get-users-by-id.server";
import { deleteMeeting } from "~/services/meetings/delete-meeting.server";
import { getSession } from "~/services/session.server";
import { formatDate } from "~/helpers/format-date";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Trash } from "lucide-react";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const sessionUser = session.get("sessionKey");

  const companyId = sessionUser.companyId ?? "";
  let meetings = await listMeetings(companyId);

  meetings = await Promise.all(
    meetings.map(async (meeting) => {
      const attendeeIds = JSON.parse(meeting.attendeeIds);
      const attendeeIdsInt = attendeeIds.map((id) => parseInt(id, 10));

      const attendees = await findUsersByIds(attendeeIdsInt);
      return { ...meeting, attendees };
    })
  );

  const companyUsers = await listUsersByCompany(companyId);
  return json({ meetings, companyUsers });
};
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const actionType = formData.get("_action");

  const session = await getSession(request.headers.get("Cookie"));
  const sessionUser = session.get("sessionKey");

  if (actionType === "create") {
    const { title, description, scheduledAt, attendeeIds } =
      parseMeetingFormData(formData);

    const createdById = sessionUser.id;
    const companyId = sessionUser.companyId;

    await createMeeting({
      title,
      description,
      scheduledAt: new Date(scheduledAt),
      companyId,
      createdById,
      attendeeIds,
    });

    return redirect("/meetings");
  }

  if (actionType === "delete") {
    const meetingId = Number(formData.get("meetingId"));
    await deleteMeeting(meetingId);
    return redirect("/meetings");
  }

  return redirect("/meetings");
};

export default function Meetings() {
  const { companyUsers, meetings } = useLoaderData<typeof loader>();

  const localizer = momentLocalizer(moment);

  const calendarEvents = meetings.map((meeting) => ({
    ...meeting,
    start: new Date(meeting.scheduledAt),
    end: new Date(new Date(meeting.scheduledAt).getTime() + 60 * 60 * 1000),
    title: meeting.title,
  }));

  console.log(meetings);

  return (
    <div className="space-y-2 !w-full ">
      <CardTitle>Your meetings</CardTitle>
      <CardDescription>Check your calendar</CardDescription>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <MeetingForm companyUsers={companyUsers} />
        </Card>
        <Card>
          {meetings.map((meeting) => (
            <div key={meeting.id} className="flex flex-row">
              <h2>
                {meeting.title} - {formatDate(meeting.scheduledAt)}
              </h2>
              <ul>
                {meeting.attendees.map((attendee) => (
                  <li className="flex" key={attendee.id}>
                    {attendee.name}
                  </li>
                ))}
              </ul>
              <form method="post">
                <Input type="hidden" name="_action" value="delete" />
                <Input type="hidden" name="meetingId" value={meeting.id} />
                <Button
                  className="p-4"
                  size={"sm"}
                  variant={"destructive"}
                  type="submit"
                >
                  <Trash />
                </Button>
              </form>
            </div>
          ))}
        </Card>
      </div>
      <Card title="Meetings">
        <div className="p-8">
          <Calendar
            localizer={localizer}
            events={calendarEvents}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
          />
        </div>
      </Card>
    </div>
  );
}
