// app/routes/reviews/completed/$reviewId.tsx

import { useLoaderData } from "@remix-run/react";
import { getReviewById } from "~/services/reviews/get-review-by-id.server";
import { Radar } from "react-chartjs-2";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";

export const loader = getReviewById;

export default function CompletedReviewDetails() {
  const reviewDetails = useLoaderData<typeof loader>();

  console.log(reviewDetails);

  const labels = reviewDetails.competencies.map((c: any) => c.competency.name);
  const scores = reviewDetails.competencies.map((c: any) => c.score);

  const data = {
    labels: labels,
    datasets: [
      {
        label: `${reviewDetails.employee.fullName}'s Competencies`,
        data: scores,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        beginAtZero: true,
        suggestedMax: 5,
      },
    },
    maintainAspectRatio: true,
    aspectRatio: 3,
  };

  console.log(reviewDetails);

  return (
    <Card className="max-w-4xl mx-auto my-8 p-4">
      <CardHeader>
        <h1 className="text-2xl font-semibold">
          Completed Review for {reviewDetails?.employee?.fullName}
        </h1>
      </CardHeader>
      <CardContent>
        <p className="mb-4">Review name: {reviewDetails.name}</p>
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          <div className="flex-1 space-y-1">
            <Radar data={data} options={options} />
          </div>
        </div>

        <ul className="list-disc pl-5 mt-4">
          {reviewDetails?.competencies.map(
            ({ competency, score, feedbackText }: any) => (
              <li key={competency.id} className="mt-2">
                <h2 className="font-semibold">
                  {competency.name}: {score}
                </h2>
                <p>Feedback: {feedbackText}</p>
              </li>
            )
          )}
        </ul>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
