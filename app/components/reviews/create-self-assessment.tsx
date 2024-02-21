// CreateSelfAssessment.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";

import Competencies from "./competencies/create-competencies";
import { Separator } from "../ui/separator";
import { Form, useLoaderData, useNavigate } from "@remix-run/react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import DevelopmentOutlook from "./development-outlook/create-development-outlook";

import { useForm } from "react-hook-form";
import clsx from "clsx";
import { useSnackbar } from "notistack";
import AlertFormError from "../ui/alert-form-error";
import CreateReflections from "./reflection/create-reflection";

export function CreateSelfAssessment() {
  const data = useLoaderData() as any;

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    // Client-side actions, if needed
    console.log(data);
    // No need to call event.preventDefault() or manually submit the form
  };

  return (
    <Card className="w-full">
      <Form method="post" onSubmit={handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle>Your Self-Assessment</CardTitle>
          <CardDescription className="mt-4">
            <div className="flex flex-col space-y-2">
              <Label className="text-lg font-medium">
                Seniority level - {data.employeeLevel.toLowerCase()}
              </Label>
              <Label className="pt-2 text-black">Review's name</Label>
              <Input
                id="managerReflection"
                className={clsx(
                  "p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                )}
                {...register("name", { required: true })}
              />
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Separator />
          <CreateReflections register={register} errors={errors} />
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
