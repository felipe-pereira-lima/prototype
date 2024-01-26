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
import DevelopmentOutlook from "./development-outlook-section";

import { useForm } from "react-hook-form";
import AlertFormError from "../ui/alert-form-error";
import clsx from "clsx";
import { useSnackbar } from "notistack";

interface CreateReviewProps {
  competencies: Competency[];
  employee: User;
}

export function CreateReview({ competencies, employee }: CreateReviewProps) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const hasTitleError = Boolean(errors.name);

  const onSubmit = (data: any, event: any) => {
    // Prevent default form submission initially
    event.preventDefault();

    // Perform client-side validation
    console.log(data);

    // If validation passes, proceed with the Remix form submission
    event.target.submit();

    enqueueSnackbar("Success", {
      variant: "success",
    });
  };
  return (
    <Card className="w-full">
      <Form method="post" onSubmit={handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle>{employee.fullName}'s assessment</CardTitle>
          <CardDescription className="mt-2">
            <Label htmlFor="managerReflection">Review name</Label>
            <Input
              className={clsx("mt-2 w-50", {
                "border-red-500": hasTitleError,
              })}
              {...register("name", { required: true })}
            />
            {hasTitleError && (
              <AlertFormError message="Review name is required." />
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Separator />
          <Reflections register={register} errors={errors} />
          <Competencies
            competencies={competencies}
            register={register}
            errors={errors}
          />
          <DevelopmentOutlook register={register} errors={errors} />
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
