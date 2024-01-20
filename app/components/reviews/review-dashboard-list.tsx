import { ManagedEmployee } from "~/utils/types";
import Card from "../ui/card";
import { formatDate } from "~/helpers/format-date";
import { Button } from "../ui/button";

export interface ReviewDashboardCardProps {
  label: string;
  isReviewComplete: boolean;
  managedEmployees: ManagedEmployee[];
}

export function ReviewDashboardCard({
  label,
  isReviewComplete,
  managedEmployees,
}: ReviewDashboardCardProps) {
  // Function to render the appropriate element based on review status
  const renderReviewElement = (
    employee: ManagedEmployee,
    isReviewComplete: boolean
  ) => {
    if (!isReviewComplete) {
      // For ongoing reviews
      if (
        employee.reviews.length === 0 ||
        employee.reviews.every((review) => review.isComplete)
      ) {
        return <Button>Start</Button>; // Start button for not started reviews
      } else {
        return <Button>Continue</Button>; // Continue button for ongoing reviews
      }
    } else {
      // For past reviews, return a paragraph with the date of the last review
      const lastReview = employee.reviews[employee.reviews.length - 1];
      return <p>{formatDate(lastReview.updatedAt)}</p>;
    }
  };

  return (
    <Card label={label} customClassName="my-8">
      <ul>
        {managedEmployees.map((employee) => {
          const finishedReviews = employee.reviews.filter(
            (review) => review.isComplete === isReviewComplete
          );

          return finishedReviews.length > 0 ? (
            <li key={employee.id}>
              <Card customClassName="border">
                {employee.fullName} - {finishedReviews[0].name}
                {renderReviewElement(employee, isReviewComplete)}
              </Card>
            </li>
          ) : !isReviewComplete && employee.reviews.length === 0 ? (
            <li key={employee.id}>
              <Card customClassName="border">
                {employee.fullName} - No Reviews
                {renderReviewElement(employee, isReviewComplete)}
              </Card>
            </li>
          ) : null;
        })}
      </ul>
    </Card>
  );
}
