import { ManagedEmployee } from "~/utils/types";
import Card from "../ui/card";
import { Review } from "@prisma/client";

export interface ReviewDashboardCardProps {
  label: string;
  isReviewComplete: boolean;
  managedEmployeesWithReview: ManagedEmployee[];
}

export function ReviewDashboardCard({
  label,
  isReviewComplete,
  managedEmployeesWithReview,
}: ReviewDashboardCardProps) {
  return (
    <Card label={label} customClassName="my-8">
      <ul>
        {managedEmployeesWithReview.map((employee) =>
          employee.reviews
            .filter((review: Review) => review.isComplete === isReviewComplete)
            .map((review: Review) => (
              <li key={review.id}>
                <Card customClassName="border">
                  {employee.fullName} - {review.name}
                </Card>
              </li>
            ))
        )}
      </ul>
    </Card>
  );
}
