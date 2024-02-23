import { useNavigate } from "react-router-dom";
import { Review, User } from "@prisma/client";
import { CardContent } from "../../ui/card";
import Avatar from "../../ui/avatar";
import { Button } from "../../ui/button";
import { formatDate } from "~/helpers/format-date";

export interface EmployeeSelfAssessmentDashboardCardProps {
  employee: User;
  reviews: Review[];
}

export function EmployeeSelfAssessmentDashboardCard({
  employee,
  reviews,
}: EmployeeSelfAssessmentDashboardCardProps) {
  const navigate = useNavigate();

  const navigateToSelfAssessment = (reviewId: number) => {
    navigate(`/self-assessment/employee/${employee.id}/review/${reviewId}`);
  };

  const renderReviewList = () => {
    const filteredReviews = reviews.filter(
      (review) => review.isCompleteBySupervisor && !review.isCompleteByEmployee
    );

    if (filteredReviews.length === 0) {
      return (
        <p className="text-sm">
          Currently there are no reviews submitted by your supervisor.
        </p>
      );
    }

    // Return the list of filtered reviews
    return filteredReviews.map((review) => (
      <div key={review.id} className="border p-4 rounded-md mb-2">
        <div className="flex justify-between items-center">
          <span>
            {review.name || "Review"} - {formatDate(review.createdAt)}
          </span>
          <Button onClick={() => navigateToSelfAssessment(review.id)}>
            Start Self-Assessment
          </Button>
        </div>
      </div>
    ));
  };

  return (
    <div className="bg-white py-2 rounded-md border">
      <CardContent className="grid gap-4">
        <div className="flex items-center space-x-4 p-4 pt-8">
          <Avatar string={employee?.fullName} />
          <div className="flex-1">
            <p className="text-sm font-medium">{employee.fullName}</p>
            {reviews && reviews.length > 0 ? (
              renderReviewList()
            ) : (
              <p className="text-sm">
                No reviews available for self-assessment.
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </div>
  );
}
