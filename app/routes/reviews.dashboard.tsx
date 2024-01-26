// app/routes/reviews.dashboard.tsx
import { MetaFunction, useLoaderData } from "@remix-run/react";
import { SupervisorReviewDashboardCard } from "~/components/reviews/supervisor/supervisor-review-dashboard-list";
import { CardDescription, CardTitle } from "~/components/ui/card";
import { getManagedEmployees } from "~/services/user/get-managed-employees.server";

export const loader = getManagedEmployees;

export const meta: MetaFunction = () => {
  return [{ title: "Reviews | Dashboard" }];
};

export default function ReviewDashboard() {
  const { managedEmployees } = useLoaderData<typeof loader>();

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
}
