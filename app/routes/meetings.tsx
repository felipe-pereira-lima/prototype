import { MetaFunction } from "@remix-run/node";
import { Card, CardDescription, CardTitle } from "~/components/ui/card";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

export const meta: MetaFunction = () => {
  return [{ title: "Meetings | List" }];
};

export default function Meetings() {
  const localizer = momentLocalizer(moment);
  return (
    <div className="space-y-2">
      <CardTitle>Your meetings</CardTitle>
      <CardDescription>Check your calendar</CardDescription>
      <Card title="Meetings">
        <div className="p-8">
          <Calendar
            localizer={localizer}
            // events={myEventsList}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
          />
        </div>
      </Card>
    </div>
  );
}
