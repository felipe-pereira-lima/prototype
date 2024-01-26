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
import { Form, useLoaderData, useNavigate } from "@remix-run/react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import DevelopmentOutlook from "./development-outlook-section";

import { useForm } from "react-hook-form";
import clsx from "clsx";
import { useSnackbar } from "notistack";

export function CreateReview() {
  const data = useLoaderData() as any;

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const hasTitleError = Boolean(errors.name);

  const onSubmit = (data: any, event: any) => {
    // Prevent default form submission initially
    event.preventDefault();

    // If validation passes, proceed with the Remix form submission
    event.target.submit();

    enqueueSnackbar("Success", {
      variant: "success",
    });
  };

  console.log(data);
  return (
    <Card className="w-full">
      <Form method="post" onSubmit={handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle>{data.employee.fullName}'s Assessment</CardTitle>
          <CardDescription className="mt-4">
            <div className="flex flex-col space-y-2">
              <Label className="text-lg font-medium">
                Seniority level - {data.employeeLevel.toLowerCase()}
              </Label>
              <Label className="pt-2 text-black">Review's name</Label>
              <Input
                id="managerReflection"
                className={clsx(
                  "p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                  {
                    "border-red-500": hasTitleError,
                  }
                )}
                {...register("name", { required: true })}
              />
            </div>
            {hasTitleError && (
              <span className="text-sm text-red-500 mt-1">
                Review name is required.
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Separator />
          <Reflections register={register} errors={errors} />
          <Competencies
            competencies={data.competencies}
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
