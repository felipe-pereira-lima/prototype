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
    navigate(`/reviews/employee/${employeeId}/review/${reviewId}`);
  };

  // TODO: fix reviews does not exist in User
  const renderOngoingReviewButton = (employee: any) => {
    const ongoingReview = employee.reviews.find(
      (review: Review) => !review.isComplete
    );
    const buttonLabel = employee.reviews.length === 0 ? "Start" : "Continue";
    return (
      <Button onClick={() => navigateToReview(employee.id, ongoingReview?.id)}>
        {buttonLabel}
      </Button>
    );
  };

  const renderPastReviewDate = (lastReview: Review) => (
    <p>{formatDate(lastReview?.updatedAt)}</p>
  );

  // TODO: fix reviews does not exist in User
  const renderEmployeeReview = (employee: any) => {
    if (isReviewComplete) {
      const lastReview = employee.reviews[employee.reviews.length - 1];
      return renderPastReviewDate(lastReview);
    } else {
      return renderOngoingReviewButton(employee);
    }
  };

  // TODO: fix reviews does not exist in User
  const renderEmployeeCard = (employee: any) => {
    const userReview = employee.reviews.filter(
      (review: Review) => review.isComplete === isReviewComplete
    );

    if (isReviewComplete && userReview.length === 0) {
      return null;
    }

    const reviewInfo =
      userReview.length > 0 ? userReview[0].name : "No Reviews";

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
