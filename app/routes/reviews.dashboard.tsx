// app/routes/reviews.dashboard.tsx
import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import { Radar } from "react-chartjs-2";

import { useFetcher, useLoaderData } from "@remix-run/react";
import { prisma } from "~/db.server";
import { getSession } from "~/services/session.server";
import Card from "~/components/ui/card";
import { useEffect, useState } from "react";
import { Review } from "@prisma/client";
import { Button } from "~/components/ui/button";
import { RadioButton } from "~/components/ui/radio-button";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const user = session.get("sessionKey");

  if (!user) {
    console.log("No user found in session");
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    let employees = [] as any;
    let reviews = [] as any;

    if (user.role === "SUPERVISOR") {
      // Fetch all employees
      employees = await prisma.user.findMany({
        where: { role: "EMPLOYEE" },
      });

      // Fetch reviews given by the supervisor
      reviews = await prisma.review.findMany({
        where: { supervisorId: user.id },
        include: { employee: true },
      });

      // Filter out employees who have a review by this supervisor
      // employees = employees.filter(
      //   (emp: any) => !reviews.some((rev: any) => rev.employeeId === emp.id)
      // );
    } else if (user.role === "EMPLOYEE") {
      // Fetch reviews for the employee
      reviews = await prisma.review.findMany({
        where: { employeeId: user.id },
        include: { supervisor: true },
      });
    }

    return json({ user, employees, reviews });
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Response("Error fetching data", { status: 500 });
  }
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const reviewId = formData.get("reviewId");
  console.log("Review ID:", reviewId); // Log the review ID

  const executionRating = formData.get("executionRating");
  const communicationRating = formData.get("communicationRating");
  const commitmentRating = formData.get("commitmentRating");

  try {
    const updatedReview = await prisma.review.update({
      where: { id: Number(reviewId) },
      data: {
        execution: Number(executionRating),
        communication: Number(communicationRating),
        commitment: Number(commitmentRating),
      },
    });

    if (updatedReview) {
      return json({ message: "Review updated successfully", updatedReview });
    } else {
      return json({ message: "Review not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Failed to update review:", error);
    return json({ message: "Failed to update review" }, { status: 500 });
  }
};

export default function ReviewDashboard() {
  const { user, employees, reviews } = useLoaderData<typeof loader>();

  const [commitmentRating, setCommitmentRating] = useState<number>(0);
  const [communicationRating, setCommunicationRating] = useState<number>(0);
  const [executionRating, setExecutionRating] = useState<number>(0);

  const [selectedEmployeeId, setSelectedEmployeeId] = useState(
    undefined
  ) as any;
  const fetcher = useFetcher();

  // Check if the selectedEmployeeId exists in the list of employees with reviews
  const isEmployeeReviewed = employees.some(
    (employee: any) => employee.id === selectedEmployeeId
  );

  const isReviewSelected = reviews.find(
    (review: Review) => review.employeeId === selectedEmployeeId
  );

  const handleRatingChange = (criteria: string, rating: number) => {
    if (criteria === "commitment") {
      setCommitmentRating(rating);
    } else if (criteria === "communication") {
      setCommunicationRating(rating);
    } else if (criteria === "execution") {
      setExecutionRating(rating);
    }
  };

  const data = {
    labels: ["Commitment", "Communication", "Execution"],
    datasets: isReviewSelected
      ? [
          {
            label: isReviewSelected?.employee?.username
              ? `${isReviewSelected?.employee?.username}'s Skills`
              : "Your review",
            data: [
              isReviewSelected.commitment,
              isReviewSelected.communication,
              isReviewSelected.execution,
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

  // TODO: this can come from the db :P
  const ratingScale = {
    0: "Does not meet expectations.",
    1: "Improvement required to meet expectations.",
    2: "Meets expectations.",
    3: "Sometimes exceeds expectations.",
    4: "Consistently exceeds expectations",
  };

  return (
    <Card label="Reviews">
      {user.role === "SUPERVISOR" && (
        <select onChange={handleSelectChange} defaultValue="">
          <option value="" disabled>
            Select an employee
          </option>
          {employees.map((employee: any) => (
            <option key={employee.id} value={employee.id}>
              {employee?.username ?? ""}
            </option>
          ))}
        </select>
      )}

      {isReviewSelected && <Radar data={data} options={options} />}

      {!isReviewSelected &&
        isEmployeeReviewed &&
        user.role === "SUPERVISOR" && (
          <fetcher.Form method="post" onSubmit={handleSubmit}>
            <div className="flex flex-col py-2">
              <RadioButton<number>
                label="Commitment"
                options={[1, 2, 3, 4, 5]}
                value={commitmentRating}
                valueKey={(num) => num.toString()}
                valueLabel={(num) => num.toString()}
                onChange={(rating) => handleRatingChange("commitment", rating)}
              />
              <RadioButton<number>
                label="Communication"
                options={[1, 2, 3, 4, 5]}
                value={communicationRating}
                valueKey={(num) => num.toString()}
                valueLabel={(num) => num.toString()}
                onChange={(rating) =>
                  handleRatingChange("communication", rating)
                }
              />
              <RadioButton<number>
                label="Execution"
                options={[1, 2, 3, 4, 5]}
                value={executionRating}
                valueKey={(num) => num.toString()}
                valueLabel={(num) => num.toString()}
                onChange={(rating) => handleRatingChange("execution", rating)}
              />
            </div>
            <div className="flex justify-end mt-2">
              <Button type="submit">Submit Review</Button>
            </div>
          </fetcher.Form>
        )}
    </Card>
  );
}
