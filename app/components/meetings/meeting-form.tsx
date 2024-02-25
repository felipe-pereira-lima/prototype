// components/MeetingForm.tsx

import { useState } from "react";
import { useFetcher } from "@remix-run/react";
import { useUser } from "~/context/user-context";

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

  // TODO:
  const currentUserId = user.id;
  const currentUserCompanyId = user.companyId;

  return (
    <fetcher.Form method="post" onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Meeting Title"
        value={meeting.title}
        onChange={(e) => setMeeting({ ...meeting, title: e.target.value })}
      />
      <input
        type="datetime-local"
        name="scheduledAt"
        value={meeting.scheduledAt}
        onChange={(e) =>
          setMeeting({ ...meeting, scheduledAt: e.target.value })
        }
      />
      <fieldset>
        <legend>Select Attendees</legend>
        {companyUsers.map((user) => (
          <div key={user.id}>
            <label>
              <input
                type="checkbox"
                name="attendeeIds"
                value={user.id}
                checked={meeting.attendeeIds.includes(user.id)}
                onChange={() => handleCheckboxChange(user.id)}
              />
              {user.fullName}
            </label>
          </div>
        ))}
      </fieldset>
      <input type="hidden" name="companyId" value={currentUserCompanyId} />
      <input type="hidden" name="createdById" value={currentUserId} />

      <button type="submit" name="_action" value="create">
        Create Meeting
      </button>
    </fetcher.Form>
  );
};

export default MeetingForm;
