// app/routes/reviews.dashboard.tsx
import {
  ActionFunction,
  json,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { Radar } from "react-chartjs-2";

import { useFetcher, useLoaderData } from "@remix-run/react";
import { prisma } from "~/db.server";
import { getSession } from "~/services/session.server";
import Card from "~/components/ui/card";
import { useEffect, useState } from "react";
import { Review } from "@prisma/client";
import { Button } from "~/components/ui/button";
import { RadioButton } from "~/components/ui/radio-button";
import { ComboBox } from "~/components/ui/combo-box";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const supervisorId = formData.get("supervisorId"); // Supervisor's ID
  const employeeId = formData.get("employeeId"); // Employee's ID to be reviewed
  const executionRating = formData.get("executionRating");
  const communicationRating = formData.get("communicationRating");
  const commitmentRating = formData.get("commitmentRating");

  try {
    // Check if there is an existing review for this employee by this supervisor
    console.log("ads", formData);
    const existingReview = await prisma.review.findFirst({
      where: {
        employeeId: Number(employeeId),
        supervisorId: Number(supervisorId),
      },
    });

    let review;

    if (existingReview) {
      // Update the existing review
      review = await prisma.review.update({
        where: { id: existingReview.id },
        data: {
          execution: Number(executionRating),
          communication: Number(communicationRating),
          commitment: Number(commitmentRating),
          updatedAt: new Date(), // Update the 'updatedAt' timestamp
        },
      });
    } else {
      // Create a new review
      review = await prisma.review.create({
        data: {
          execution: Number(executionRating),
          communication: Number(communicationRating),
          commitment: Number(commitmentRating),
          employeeId: Number(employeeId),
          supervisorId: Number(supervisorId),
        },
      });
    }

    return json({ message: "Review processed successfully", review });
  } catch (error) {
    console.error("Failed to process review:", error);
    return json({ message: "Failed to process review" }, { status: 500 });
  }
};

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

export const meta: MetaFunction = () => {
  return [{ title: "Reviews | Dashboard" }];
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
        suggestedMax: 5,
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
    const formData = new FormData();
    formData.append("employeeId", selectedEmployeeId.toString());
    formData.append("supervisorId", user.id.toString());
    formData.append("executionRating", executionRating.toString());
    formData.append("communicationRating", communicationRating.toString());
    formData.append("commitmentRating", commitmentRating.toString());

    fetcher.submit(formData, { method: "post" });
  };

  return (
    <Card label="Reviews">
      {user.role === "SUPERVISOR" && (
        <div className="pb-2">
          <ComboBox
            options={employees.map((employee: any) => ({
              id: employee.id,
              label: employee.username,
            }))}
            valueKey={(option: any) => option.id}
            valueLabel={(option) => option.label}
            onSelection={(newValue) => {
              setSelectedEmployeeId(newValue ? newValue.id : undefined);
            }}
            placeholder="Select an employee"
          />
        </div>
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
              <input type="hidden" name="supervisorId" value={user.id} />
            </div>
            <div className="flex justify-end mt-2">
              <Button type="submit">Submit Review</Button>
            </div>
          </fetcher.Form>
        )}
    </Card>
  );
}
