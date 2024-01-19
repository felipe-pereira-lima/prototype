// app/routes/reviews.dashboard.tsx
import { useLoaderData } from "@remix-run/react";
import { ReviewDashboardCard } from "~/components/reviews/review-dashboard-list";
import { getManagedEmployees } from "~/services/user/get-managed-employees.server";

import { ManagedEmployee } from "~/utils/types";

export const loader = getManagedEmployees;

export default function ReviewDashboard() {
  const { managedEmployees } = useLoaderData<typeof loader>();

  const managedEmployeesWithReview = managedEmployees?.filter(
    (employee: ManagedEmployee) =>
      employee.reviews && employee.reviews.length > 0
  );

  return (
    <div className="my-3">
      <ReviewDashboardCard
        label="Ongoing Assessments"
        managedEmployeesWithReview={managedEmployeesWithReview}
        // reviewedEmployee?={isSupervisor ? managedEmployeesWithReview : 'Hey employee :)'}
        isReviewComplete={false}
      />
      <ReviewDashboardCard
        label="Past Assessments"
        managedEmployeesWithReview={managedEmployeesWithReview}
        isReviewComplete={true}
      />
    </div>
  );
}
