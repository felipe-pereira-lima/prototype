import { Card, CardContent, CardHeader, CardTitle } from "../card";

export interface LatestReviewCardProps {}

export default function LatestReviewCard({}: LatestReviewCardProps): JSX.Element {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Here's your most recent review</CardTitle>
      </CardHeader>
      <CardContent>Tbd</CardContent>
    </Card>
  );
}
