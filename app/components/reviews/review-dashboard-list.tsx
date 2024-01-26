import { ManagedEmployee } from "~/utils/types";
import { formatDate } from "~/helpers/format-date";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { Review } from "@prisma/client";
import { CardContent } from "../ui/card";
import Avatar from "../ui/avatar";

export interface ReviewDashboardCardProps {
  isReviewComplete: boolean;
  managedEmployees: ManagedEmployee[];
}

export function ReviewDashboardCard({
  isReviewComplete,
  managedEmployees,
}: ReviewDashboardCardProps) {
  const navigate = useNavigate();

  const navigateToReview = (
    employeeId: string,
    reviewId: string,
    isComplete: boolean
  ) => {
    if (isComplete)
      navigate(`/reviews/employee/${employeeId}/review/isComplete/${reviewId}`);

    if (!isComplete) {
      if (reviewId)
        navigate(`/reviews/employee/${employeeId}/review/${reviewId}`);
      else navigate(`/reviews/employee/${employeeId}/review/latest`);
    }
  };

  const renderOngoingReviewButton = (employee: any) => {
    console.log(employee);
    const ongoingReview = employee.reviews.find(
      (review: Review) => !review.isComplete
    );
    return (
      <Button
        onClick={() => navigateToReview(employee.id, ongoingReview?.id, false)}
      >
        {!ongoingReview ? "Start" : "Continue"}
      </Button>
    );
  };

  const renderEmployeeReview = (employee: any) => {
    if (isReviewComplete) {
      return employee.reviews
        .filter((review: Review) => review.isComplete)
        .map((completedReview: any) => (
          <div key={completedReview.id} className="flex space-x-4 items-center">
            <p className="text-xs">{formatDate(completedReview.updatedAt)}</p>
            <Button
              onClick={() =>
                navigateToReview(employee.id, completedReview.id, true)
              }
            >
              View Details
            </Button>
          </div>
        ));
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

    const reviewName =
      finishedReviewsOfSupervisor.length > 0
        ? finishedReviewsOfSupervisor[0].name
        : "Submit a new review";

    return (
      <li key={employee.id} className="!pt-6">
        <CardContent className="grid gap-4">
          <div className=" flex items-center space-x-4 rounded-md border p-4">
            <Avatar string={employee?.fullName} />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                {employee.fullName}
              </p>
              <p className="text-sm text-muted-foreground">{reviewName}</p>
            </div>
            {renderEmployeeReview(employee)}
          </div>
        </CardContent>
      </li>
    );
  };

  return (
    <div className="bg-white py-2 rounded-md border">
      <ul>{managedEmployees?.map(renderEmployeeCard)}</ul>
    </div>
  );
}
