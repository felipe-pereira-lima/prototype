// CreateReview.tsx

import { Competency, User } from "@prisma/client";
import { Form } from "@remix-run/react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import Competencies from "./competencies-section";
import { Separator } from "../ui/separator";

interface CreateReviewProps {
  competencies: Competency[];
  employee: User;
}

export function CreateReview({ competencies, employee }: CreateReviewProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Your assessment</CardTitle>
        <CardDescription>Contributors: ... </CardDescription>
      </CardHeader>
      <CardContent>
        <Separator />
        <h1 className="text-xl font-bold">Reflections</h1>
        <Separator />
        <Competencies competencies={competencies} />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Back</Button>
        <Button>Submit</Button>
      </CardFooter>
    </Card>
  );
}
