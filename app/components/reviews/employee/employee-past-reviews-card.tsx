import { Review, User } from "@prisma/client";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { formatDate } from "~/helpers/format-date";
import { CardContent } from "~/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Button } from "~/components/ui/button";
import Avatar from "~/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Question, Warning } from "phosphor-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

export interface EmployeePastReviewsCardProps {
  pastReviews: Review[];
  employee: User;
}

export function EmployeePastReviewsCard({
  pastReviews,
  employee,
}: EmployeePastReviewsCardProps) {
  const navigate = useNavigate();
  const [selectedReviewId, setSelectedReviewId] = useState<string>("");
  const [isReviewCompleteToEmployee, setIsReviewCompleteToEmployee] =
    useState(false);

  const handleReviewChange = (reviewId: string) => {
    setSelectedReviewId(reviewId);
    const selectedReview = pastReviews.find(
      (review) => review.id.toString() === reviewId
    );
    if (selectedReview) {
      setIsReviewCompleteToEmployee(selectedReview.isCompleteByEmployee);
    }
  };

  useEffect(() => {
    if (selectedReviewId) {
      handleReviewChange(selectedReviewId);
    }
  }, [selectedReviewId, pastReviews]);

  const navigateToReview = () => {
    if (selectedReviewId) {
      navigate(
        `/reviews/employee/review/is-complete-by-supervisor/${selectedReviewId}`
      );
    }
  };

  const renderSelectAndButton = () => {
    return (
      <div className="flex space-x-4 items-center">
        <Select value={selectedReviewId} onValueChange={handleReviewChange}>
          <SelectTrigger aria-label="Review selection">
            <SelectValue placeholder="Select a review" />
          </SelectTrigger>
          <SelectContent>
            {pastReviews.map((review) => (
              <SelectItem key={review.id} value={review.id.toString()}>
                {review.name} - {formatDate(review.updatedAt)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          onClick={navigateToReview}
          disabled={!isReviewCompleteToEmployee}
        >
          View Details
        </Button>
        {!isReviewCompleteToEmployee && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="cursor-pointer">
                  <Question color="red" size={16} />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>You need to complete this review in order to view it.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    );
  };

  return (
    <div className="!pt-6 bg-white py-2 rounded-md border">
      <CardContent className="grid gap-4">
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          <Avatar string={employee?.fullName ?? ""} />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              {employee?.fullName ?? ""}
            </p>
          </div>
          {renderSelectAndButton()}
        </div>
      </CardContent>
    </div>
  );
}
