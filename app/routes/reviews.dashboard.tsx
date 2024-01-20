// app/routes/reviews.dashboard.tsx
import { useLoaderData } from "@remix-run/react";
import { ReviewDashboardCard } from "~/components/reviews/review-dashboard-list";
import { getManagedEmployees } from "~/services/user/get-managed-employees.server";

export const loader = getManagedEmployees;

export default function ReviewDashboard() {
  const { managedEmployees } = useLoaderData<typeof loader>();

  return (
    <div className="my-3">
      <ReviewDashboardCard
        label="Ongoing Assessments"
        managedEmployees={managedEmployees}
        isReviewComplete={false}
      />
      <ReviewDashboardCard
        label="Past Assessments"
        managedEmployees={managedEmployees}
        isReviewComplete={true}
      />
    </div>
  );
}
