// CreateReview.tsx

import { Competency, User } from "@prisma/client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";

import Competencies from "./competencies-section";
import { Separator } from "../ui/separator";
import Reflections from "./reflections.section";
import { Form } from "@remix-run/react";

interface CreateReviewProps {
  competencies: Competency[];
  employee: User;
}

export function CreateReview({ competencies, employee }: CreateReviewProps) {
  console.log(employee);
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{employee.fullName}'s assessment</CardTitle>
        <CardDescription> something here </CardDescription>
      </CardHeader>
      <Form method="post" action={`/reviews/${employee.id}/1/review/latest}`}>
        <CardContent>
          <Separator />
          <Reflections />
          <Competencies competencies={competencies} />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Back</Button>
          <Button>Submit</Button>
        </CardFooter>
      </Form>
    </Card>
  );
}
