// app/routes/reviews.dashboard.tsx
import { json, LoaderFunction } from "@remix-run/node";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

import { useFetcher, useLoaderData } from "@remix-run/react";
import { prisma } from "~/db.server";
import { getSession } from "~/services/session.server";
import Card from "~/components/ui/card";
import { useEffect, useState } from "react";
import { Review } from "@prisma/client";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const user = session.get("sessionKey"); // Use the same key you've set in the authenticator

  if (!user) {
    console.log("No user found in session");
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const reviews = await prisma.review.findMany({
      where:
        user.role === "EMPLOYEE"
          ? { employeeId: user.id }
          : { supervisorId: user.id },
      include: {
        employee: true,
        supervisor: user.role === "SUPERVISOR",
      },
    });
    return json({ user, reviews });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw new Response("Error fetching reviews", { status: 500 });
  }
};

export default function ReviewDashboard() {
  const { user, reviews } = useLoaderData<typeof loader>();

  console.log(reviews);

  const [selectedEmployeeId, setSelectedEmployeeId] = useState(user?.id);
  const fetcher = useFetcher();
  const selectedReview = reviews.find(
    (review: Review) => review.employeeId === selectedEmployeeId
  );

  const data = {
    labels: ["Commitment", "Communication", "Execution"],
    datasets: selectedReview
      ? [
          {
            label: `${selectedReview.employee.username}'s Skills`,
            data: [
              selectedReview.commitment,
              selectedReview.communication,
              selectedReview.execution,
            ],
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ]
      : [],
  };

  const options = {
    scales: {
      r: {
        beginAtZero: true,
      },
    },
    maintainAspectRatio: true,
    aspectRatio: 3,
  };

  useEffect(() => {
    // If the user is an employee, auto-select their ID for the radar chart
    if (user.role === "EMPLOYEE") {
      setSelectedEmployeeId(user.id);
    }
  }, [user]);

  const handleSelectChange = (event: any) => {
    setSelectedEmployeeId(Number(event.target.value));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    formData.append("employeeId", selectedEmployeeId.toString());

    fetcher.submit(formData, { method: "post" });
  };

  return (
    <Card label="Reviews">
      {user.role === "SUPERVISOR" ? (
        <select onChange={handleSelectChange} defaultValue="">
          <option value="" disabled>
            Select an employee
          </option>
          {reviews.map(({ employee }: { employee: any }) => (
            <option key={employee.id} value={employee.id}>
              {employee.username}
            </option>
          ))}
        </select>
      ) : null}

      {selectedReview ? (
        <Radar data={data} options={options} />
      ) : user.role === "SUPERVISOR" ? (
        <fetcher.Form method="post" onSubmit={handleSubmit}>
          <input
            name="commitment"
            type="number"
            placeholder="Commitment"
            required
          />
          <input
            name="communication"
            type="number"
            placeholder="Communication"
            required
          />
          <input
            name="execution"
            type="number"
            placeholder="Execution"
            required
          />
          <button type="submit">Submit Review</button>
        </fetcher.Form>
      ) : (
        <p>You do not have any reviews yet.</p>
      )}
    </Card>
  );
}
