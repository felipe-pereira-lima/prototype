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
import { Label } from "../ui/label";

import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import CreateSelfReflections from "./reflection/create-reflection-employee";
import CreateSelfDevelopmentOutlook from "./development-outlook/create-development-outlook-employee";
import { useState } from "react";
import SelfAssessmentDialog from "../ui/review/self-assessment-dialog";
import EmployeeCompetencies from "./competencies/employee-create-competencies";

export function CreateSelfAssessment() {
  const data = useLoaderData() as any;

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onSubmit = (formData: any, event: any) => {
    event.preventDefault();
    setIsDialogOpen(true);
  };

  const handleDialogConfirm = () => {
    setIsDialogOpen(false);

    const form = document.getElementById("update-form") as HTMLFormElement;
    form?.submit();

    enqueueSnackbar("Review submitted successfully.", {
      variant: "success",
    });
  };

  const handleDialogCancel = () => {
    setIsDialogOpen(false);
  };

  return (
    <Card className="w-full">
      <Form id="update-form" method="post" onSubmit={handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle>Your Self-Assessment</CardTitle>
          <CardDescription className="mt-4">
            <div className="flex flex-col space-y-2">
              <Label className="text-lg font-medium">
                Seniority level - {data.employeeLevel.toLowerCase()}
              </Label>
              <Label className="pt-2 text-black">{"review name"}</Label>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Separator />
          <CreateSelfReflections register={register} errors={errors} />
          <EmployeeCompetencies
            competencies={data.competencies}
            register={register}
            errors={errors}
          />
          <CreateSelfDevelopmentOutlook register={register} errors={errors} />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Back
          </Button>
          <Button>Submit</Button>
        </CardFooter>
        {isDialogOpen && (
          <SelfAssessmentDialog
            isOpen={isDialogOpen}
            onConfirm={handleDialogConfirm}
            onCancel={handleDialogCancel}
            title="Confirm Submission"
            description="Are you sure you want to submit this form?"
          />
        )}
      </Form>
    </Card>
  );
}
