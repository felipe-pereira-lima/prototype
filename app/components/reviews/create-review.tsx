// CreateReviewForm.tsx

import { Competency, User } from "@prisma/client";
import { Form } from "@remix-run/react";

interface CreateReviewFormProps {
  competencies: Competency[];
  employee: User;
}

export function CreateReviewForm({
  competencies,
  employee,
}: CreateReviewFormProps) {
  return (
    <Form method="post" action="/reviews/employee/1/review/latest">
      <h1>Review for Employee ID: {employee?.fullName}</h1>
      {competencies?.map((competency) => (
        <div key={competency.id}>
          <label htmlFor={`competency-${competency?.id}`}>
            {competency.name}
          </label>
          <input
            type="number"
            id={`competency-${competency?.id}`}
            name={`competency-${competency?.id}`}
            min="1"
            max="5"
            required
          />
        </div>
      ))}

      <input type="hidden" name="employeeId" value={employee?.id} />
      <button type="submit">Submit Review</button>
    </Form>
  );
}
