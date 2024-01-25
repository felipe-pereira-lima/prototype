// app/routes/reviews.dashboard.tsx
import { MetaFunction, useLoaderData } from "@remix-run/react";
import { ReviewDashboardCard } from "~/components/reviews/review-dashboard-list";
import { Card, CardDescription, CardTitle } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
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
      <ReviewDashboardCard
        managedEmployees={managedEmployees}
        isReviewComplete={false}
      />
      <div className="pt-4"></div>
      <CardTitle>Past Assessments</CardTitle>
      <CardDescription>
        Check previous reviews from your managed employees.
      </CardDescription>
      <ReviewDashboardCard
        managedEmployees={managedEmployees}
        isReviewComplete={true}
      />
    </div>
  );
}
