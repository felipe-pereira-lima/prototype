// app/routes/reviews.dashboard.tsx
import { UserRole } from "@prisma/client";
import { MetaFunction, useLoaderData } from "@remix-run/react";
import { SupervisorReviewDashboardCard } from "~/components/reviews/supervisor/supervisor-review-dashboard-list";
import { CardDescription, CardTitle } from "~/components/ui/card";
import { useUser } from "~/context/user-context";
import { getManagedEmployees } from "~/services/user/get-managed-employees.server";

export const loader = getManagedEmployees;

export const meta: MetaFunction = () => {
  return [{ title: "Reviews | Dashboard" }];
};

export default function ReviewDashboard() {
  const { managedEmployees } = useLoaderData<typeof loader>();

  const user = useUser();

  // @ts-ignore
  const isUserEmployee = user.roles.includes(UserRole.EMPLOYEE);
  // @ts-ignore
  const isUserSupervisor = user.roles.includes(UserRole.SUPERVISOR);

  console.log(isUserEmployee);
  console.log(isUserSupervisor);

  if (isUserSupervisor)
    return (
      <div className="space-y-2">
        <CardTitle>Ongoing Assessments</CardTitle>
        <CardDescription>Submit a new review.</CardDescription>
        <SupervisorReviewDashboardCard
          managedEmployees={managedEmployees}
          isReviewComplete={false}
        />
        <div className="pt-4"></div>
        <CardTitle>Past Assessments</CardTitle>
        <CardDescription>
          Check previous reviews from your managed employees.
        </CardDescription>
        <SupervisorReviewDashboardCard
          managedEmployees={managedEmployees}
          isReviewComplete={true}
        />
      </div>
    );

  if (isUserEmployee)
    return (
      <div className="space-y-2">
        <CardTitle>Start a self-assessment</CardTitle>
        <CardDescription>Submit a review of yourself.</CardDescription>
        New card
        <div className="pt-4"></div>
        <CardTitle>Past Assessments</CardTitle>
        <CardDescription>Check previous results.</CardDescription>
        New card
      </div>
    );
}
