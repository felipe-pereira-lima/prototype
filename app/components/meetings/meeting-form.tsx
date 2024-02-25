// components/MeetingForm.tsx

import { useState } from "react";
import { useFetcher } from "@remix-run/react";
import { useUser } from "~/context/user-context";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

const MeetingForm = ({ companyUsers }) => {
  const fetcher = useFetcher();
  const [meeting, setMeeting] = useState({
    title: "",
    scheduledAt: "",
    attendeeIds: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetcher.submit(
      {
        ...meeting,
        attendeeIds: JSON.stringify(meeting.attendeeIds),
        _action: "create",
      },
      { method: "post" }
    );
    // Reset form state
    setMeeting({ title: "", scheduledAt: "", attendeeIds: [] });
  };

  const handleCheckboxChange = (userId) => {
    setMeeting((prevMeeting) => {
      const isAlreadySelected = prevMeeting.attendeeIds.includes(userId);
      if (isAlreadySelected) {
        return {
          ...prevMeeting,
          attendeeIds: prevMeeting.attendeeIds.filter((id) => id !== userId),
        };
      } else {
        return {
          ...prevMeeting,
          attendeeIds: [...prevMeeting.attendeeIds, userId],
        };
      }
    });
  };

  const user = useUser();
  const currentUserId = user.id;
  const currentUserCompanyId = user.companyId;

  return (
    <fetcher.Form method="post" onSubmit={handleSubmit}>
      <Card>
        <div className="p-2">
          <div className="flex">
            <Input
              type="text"
              name="title"
              placeholder="Meeting Title"
              value={meeting.title}
              onChange={(e) =>
                setMeeting({ ...meeting, title: e.target.value })
              }
            />
            <Input
              type="datetime-local"
              name="scheduledAt"
              value={meeting.scheduledAt}
              onChange={(e) =>
                setMeeting({ ...meeting, scheduledAt: e.target.value })
              }
            />
          </div>
          <fieldset>
            <legend>Select Attendees</legend>
            {companyUsers.map((user) => (
              <div key={user.id} className="flex items-center mb-4">
                <Label className="flex text-sm font-medium text-gray-900 dark:text-gray-300">
                  <Input
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    type="checkbox"
                    name="attendeeIds"
                    value={user.id}
                    checked={meeting.attendeeIds.includes(user.id)}
                    onChange={() => handleCheckboxChange(user.id)}
                  />
                  {user.fullName}
                </Label>
              </div>
            ))}
          </fieldset>
          <input type="hidden" name="companyId" value={currentUserCompanyId} />
          <input type="hidden" name="createdById" value={currentUserId} />

          <Button
            className=" justify-end"
            type="submit"
            name="_action"
            value="create"
          >
            Create Meeting
          </Button>
        </div>
      </Card>
    </fetcher.Form>
  );
};

export default MeetingForm;
