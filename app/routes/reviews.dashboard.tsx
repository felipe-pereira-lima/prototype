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

import { useLoaderData } from "@remix-run/react";
import { prisma } from "~/db.server";
import { commitSession, getSession } from "~/services/session.server";

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

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function SeeReview() {
  const { user, reviews } = useLoaderData<typeof loader>();

  // TODO: implement context for user permissions - also with the navbar, etc.
  // do not approach this component by component or it will become an ugly mess

  const data = {
    labels: ["commitment", "communication", "execution"],
    datasets: [
      {
        label: `${reviews[0].employee.username}'s skill matrix`,
        data: [
          reviews[0].commitment,
          reviews[0].communication,
          reviews[0].execution,
        ],
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
      },
    },
  };

  return (
    <div>
      <h1>Reviews</h1>
      <Radar data={data} options={options} />
    </div>
  );
}
