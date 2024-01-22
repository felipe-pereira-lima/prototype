import { ManagedEmployee } from "~/utils/types";
import Card from "../ui/card";
import { formatDate } from "~/helpers/format-date";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { Review, User } from "@prisma/client";

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
  const navigate = useNavigate();

  const navigateToReview = (employeeId: string, reviewId: string) => {
    if (reviewId)
      navigate(`/reviews/employee/${employeeId}/review/${reviewId}`);
    else navigate(`/reviews/employee/${employeeId}/review/latest`);
  };

  const renderOngoingReviewButton = (employee: any) => {
    const ongoingReview = employee.reviews.find(
      (review: Review) => !review.isComplete
    );
    return (
      <Button onClick={() => navigateToReview(employee.id, ongoingReview?.id)}>
        {!ongoingReview ? "Start" : "Continue"}
      </Button>
    );
  };

  const renderPastReviewDate = (lastReview: Review) => (
    <p>{formatDate(lastReview?.updatedAt)}</p>
  );

  const renderEmployeeReview = (employee: any) => {
    if (isReviewComplete) {
      const lastReview = employee.reviews[employee.reviews.length - 1];
      return renderPastReviewDate(lastReview);
    } else {
      return renderOngoingReviewButton(employee);
    }
  };

  const renderEmployeeCard = (employee: any) => {
    const finishedReviewsOfSupervisor = employee.reviews.filter(
      (review: Review) => review.isComplete === isReviewComplete
    );

    if (isReviewComplete && finishedReviewsOfSupervisor.length === 0) {
      return null;
    }

    const reviewInfo =
      finishedReviewsOfSupervisor.length > 0
        ? finishedReviewsOfSupervisor[0].name
        : "Not published";

    return (
      <li key={employee.id}>
        <Card customClassName="border">
          {employee.fullName} - {reviewInfo}
          {renderEmployeeReview(employee)}
        </Card>
      </li>
    );
  };

  return (
    <Card label={label} customClassName="mb-8">
      <ul>{managedEmployees.map(renderEmployeeCard)}</ul>
    </Card>
  );
}
