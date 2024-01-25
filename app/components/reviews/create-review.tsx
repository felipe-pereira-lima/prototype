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
import { Form, useNavigate } from "@remix-run/react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface CreateReviewProps {
  competencies: Competency[];
  employee: User;
}

export function CreateReview({ competencies, employee }: CreateReviewProps) {
  const navigate = useNavigate();
  return (
    <Card className="w-full">
      <Form method="post">
        <CardHeader>
          <CardTitle>{employee.fullName}'s assessment</CardTitle>
          <CardDescription className="mt-2">
            <Label htmlFor="managerReflection">Review name</Label>
            <Input required name="name" className="w-50 mt-1" />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Separator />
          <Reflections />
          <Competencies competencies={competencies} />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Back
          </Button>
          <Button>Submit</Button>
        </CardFooter>
      </Form>
    </Card>
  );
}
