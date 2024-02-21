import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Review } from "@prisma/client"; // Assuming this is the correct type
import { CardContent } from "../../ui/card";
import Avatar from "../../ui/avatar";
import { Button } from "../../ui/button";
import { formatDate } from "~/helpers/format-date";

export interface EmployeeSelfAssessmentDashboardCardProps {
  employee: any; // More specific typing recommended
  reviews: Review[]; // Prop for passing reviews
}

export function EmployeeSelfAssessmentDashboardCard({
  employee,
  reviews,
}: EmployeeSelfAssessmentDashboardCardProps) {
  const navigate = useNavigate();

  // Function to navigate to self-assessment page for a specific review
  const navigateToSelfAssessment = (reviewId: number) => {
    navigate(`/self-assessment/employee/${employee.id}/review/${reviewId}`);
  };

  // Function to render list of reviews for starting self-assessment
  const renderReviewList = () => {
    return reviews
      .filter((review) => review.isCompleteBySupervisor) // Show if completed by supervisor
      .map((review) => (
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
        <div className="flex items-center space-x-4 rounded-md border p-4">
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
