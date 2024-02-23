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

import ViewDevelopmentOutlook from "~/components/reviews/development-outlook/view-development-outlook";
import ViewReflections from "~/components/reviews/reflection/view-reflection";
import ViewCompetencies from "~/components/reviews/competencies/view-competencies";

export const loader = getReviewById;

export default function CompletedReviewDetails() {
  const reviewDetails = useLoaderData<typeof loader>();

  console.log(reviewDetails);

  const labels = reviewDetails.competencies.map((c: any) => c.competency.name);

  // Mapping supervisor scores
  const supervisorScores = reviewDetails.competencies.map(
    (c: any) => c.supervisorScore ?? 0
  );

  // Mapping employee scores
  const employeeScores = reviewDetails.competencies.map(
    (c: any) => c.employeeScore ?? 0
  );

  console.log(reviewDetails);

  const data = {
    labels: labels,
    datasets: [
      {
        label: `Supervisor score`,
        data: supervisorScores,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: `Employee self-assessment score`,
        data: employeeScores,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
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
          employeeName={reviewDetails?.employee?.fullName}
          employeeValue={reviewDetails?.reflection?.employeeReflection}
        />
        <CardContent>
          <div className="rounded-md border p-4 my-4">
            <Radar data={data} options={options} />
          </div>
          <ViewCompetencies competencies={reviewDetails.competencies} />
        </CardContent>
        <Separator />
        <ViewDevelopmentOutlook
          managerValue={reviewDetails?.developmentOutlook?.managerDevelopment}
          supervisorName={reviewDetails?.supervisor?.fullName}
          employeeName={reviewDetails?.employee?.fullName}
          employeeValue={reviewDetails?.developmentOutlook?.employeeDevelopment}
        />
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
