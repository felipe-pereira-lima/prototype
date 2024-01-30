import { ManagedEmployee } from "~/utils/types";
import { formatDate } from "~/helpers/format-date";
import { Button } from "../../ui/button";
import { useNavigate } from "react-router-dom";
import { Review } from "@prisma/client";
import { CardContent } from "../../ui/card";
import Avatar from "../../ui/avatar";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export interface SupervisorReviewDashboardCardProps {
  isReviewComplete: boolean;
  managedEmployees: ManagedEmployee[];
}

export function SupervisorReviewDashboardCard({
  isReviewComplete,
  managedEmployees,
}: SupervisorReviewDashboardCardProps) {
  const navigate = useNavigate();

  const [selectedReviews, setSelectedReviews] = useState<{
    [key: string]: string;
  }>({});

  const handleReviewChange = (employeeId: string, reviewId: string) => {
    setSelectedReviews((prev) => ({ ...prev, [employeeId]: reviewId }));
  };

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

  const renderReviewSelect = (employee: any) => {
    return (
      <Select
        value={selectedReviews[employee.id] || ""}
        onValueChange={(value) => handleReviewChange(employee.id, value)}
      >
        <SelectTrigger aria-label="Review selection">
          <SelectValue placeholder="Select a review" />
        </SelectTrigger>
        <SelectContent>
          {employee.reviews.map((review: any) => (
            <SelectItem key={review.id} value={review.id}>
              {review.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  };

  const renderEmployeeReview = (employee: any) => {
    return (
      <div className="flex space-x-4 items-center">
        {renderReviewSelect(employee)}
        <Button
          onClick={() =>
            navigateToReview(
              employee.id,
              selectedReviews[employee.id],
              isReviewComplete
            )
          }
        >
          View Details
        </Button>
      </div>
    );
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
