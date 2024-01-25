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
import Reflections from "./reflections-section";
import { Form } from "@remix-run/react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface CreateReviewProps {
  competencies: Competency[];
  employee: User;
}

export function CreateReview({ competencies, employee }: CreateReviewProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{employee.fullName}'s assessment</CardTitle>
        <CardDescription className="mt-2">
          <Label htmlFor="managerReflection">Review name</Label>
          <Input required name="name" className="w-50 mt-1" />
        </CardDescription>
      </CardHeader>
      <Form method="post">
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
