import { Card, CardContent, CardHeader, CardTitle } from "../card";

export interface ProfileCardProps {
  data: any;
}
export default function ProfileCard({ data }: ProfileCardProps): JSX.Element {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <h1>{data?.email}</h1>
      </CardContent>
    </Card>
  );
}
