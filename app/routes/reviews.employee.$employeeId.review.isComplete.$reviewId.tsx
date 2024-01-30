import { useLoaderData } from "@remix-run/react";
import { getReviewById } from "~/services/reviews/get-review-by-id.server";
import { Radar } from "react-chartjs-2";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { Label } from "~/components/ui/label";
import Reflections from "~/components/reviews/reflections/create-reflections-section";
import { Textarea } from "~/components/ui/textarea";
import ViewReflections from "~/components/reviews/reflections/view-reflections-section";
import DevelopmentOutlook from "~/components/reviews/development-outlook/create-development-outlook-section";
import ViewDevelopmentOutlook from "~/components/reviews/development-outlook/view-development-outlook-section";

export const loader = getReviewById;

export default function CompletedReviewDetails() {
  const reviewDetails = useLoaderData<typeof loader>();

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
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          Completed {reviewDetails.employee.fullName}'s Assessment
        </CardTitle>
        <CardDescription className="mt-4">
          <div className="flex flex-col space-y-2">
            <Label className="text-lg font-medium">
              Review's name: {reviewDetails.name}
            </Label>
            <Label className="pt-2 text-black">
              Seniority level -{" "}
              {reviewDetails.employee.employeeLevel.toLowerCase()}
            </Label>
          </div>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ViewReflections
          managerValue={reviewDetails?.reflection?.managerReflection}
          supervisorName={reviewDetails?.supervisor?.fullName}
        />
        <CardContent>
          <div className="rounded-md border p-4 my-4">
            <Radar data={data} options={options} />
          </div>
        </CardContent>
        <Separator />
        <ViewDevelopmentOutlook
          managerValue={reviewDetails?.reflection?.managerReflection}
          supervisorName={reviewDetails?.supervisor?.fullName}
        />
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
