// app/routes/reviews/completed/$reviewId.tsx

import { useLoaderData } from "@remix-run/react";
import { getReviewById } from "~/services/reviews/get-review-by-id.server";
import { Radar } from "react-chartjs-2";

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

  return (
    <div>
      <h1>Completed Review for {reviewDetails?.employee?.fullName}</h1>
      <p>General feedback: {reviewDetails?.feedbackText}</p>

      <Radar data={data} options={options} />

      <ul>
        {reviewDetails?.competencies.map(
          ({
            competency,
            score,
            supervisorAssessment,
            employeeAssessment,
          }: {
            competency: any;
            score: any;
            supervisorAssessment: any;
            employeeAssessment: any;
          }) => (
            <li key={competency.id}>
              <h1>
                {competency.name}: {score}
              </h1>
              <p>What your supervisor said: {supervisorAssessment}</p>
              <p>What you said: {employeeAssessment}</p>
            </li>
          )
        )}
      </ul>
    </div>
  );
}
