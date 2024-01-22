import { Card, CardContent, CardHeader, CardTitle } from "../card";

export interface UpcomingMeetingsCardProps {}

export default function UpcomingMeetingsCard({}: UpcomingMeetingsCardProps): JSX.Element {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Meetings</CardTitle>
      </CardHeader>
      <CardContent>Tbd</CardContent>
    </Card>
  );
}
