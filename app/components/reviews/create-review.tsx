// CreateReview.tsx
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

import { useForm } from "react-hook-form";
import clsx from "clsx";
import { useSnackbar } from "notistack";
import AlertFormError from "../ui/alert-form-error";
import { useState } from "react";
import ConfirmationDialog from "../ui/review/confirmation-dialog";
import CreateReflections from "./reflection/create-reflection-supervisor";
import CreateDevelopmentOutlook from "./development-outlook/create-development-outlook-supervisor";

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onSubmit = (data: any, event: any) => {
    event.preventDefault();
    setIsDialogOpen(true);
  };

  const handleDialogConfirm = () => {
    setIsDialogOpen(false);

    const form = document.getElementById("create-form") as HTMLFormElement;
    form?.submit();

    enqueueSnackbar("Success", {
      variant: "success",
    });
  };

  const handleDialogCancel = () => {
    setIsDialogOpen(false);
  };

  const [isEmployeeAllowedToStart, setisEmployeeAllowedToStart] =
    useState(false);

  const handleSwitchChange = (newValue: boolean) => {
    setisEmployeeAllowedToStart(newValue);
  };

  return (
    <Card className="w-full">
      <Form id="create-form" method="post" onSubmit={handleSubmit(onSubmit)}>
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
              <AlertFormError message="Review name is required." />
            )}
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
          <CreateDevelopmentOutlook register={register} errors={errors} />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Back
          </Button>
          <Button>Submit</Button>
        </CardFooter>
        {isDialogOpen && (
          <ConfirmationDialog
            isOpen={isDialogOpen}
            onConfirm={handleDialogConfirm}
            onCancel={handleDialogCancel}
            title="Confirm Submission"
            description="Are you sure you want to submit this form?"
            isEmployeeAllowedToStart={isEmployeeAllowedToStart}
            setisEmployeeAllowedToStart={handleSwitchChange}
          />
        )}

        {/* Hidden input to hold the actual value to be submitted */}
        <input
          type="hidden"
          name="isEmployeeAllowedToStart"
          value={isEmployeeAllowedToStart ? "true" : "false"}
        />
      </Form>
    </Card>
  );
}
