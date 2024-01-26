import { Card, CardContent, CardHeader, CardTitle } from "../card";

export interface WelcomeCardProps {
  data: any;
}
export default function WelcomeCard({ data }: WelcomeCardProps): JSX.Element {
  console.log(data);
  return (
    <Card>
      <CardHeader>
        <CardTitle>{`Welcome, ${data?.fullName} 👋`}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* <h1>Your role is {data?.role?.toLowerCase()}</h1> */}
      </CardContent>
    </Card>
  );
}
