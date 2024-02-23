import React from "react";
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";
import { Competency } from "@prisma/client";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Textarea } from "../../ui/textarea";
import AlertFormError from "../../ui/alert-form-error";
import { Label } from "../../ui/label";
import { competencyLevels } from "~/utils/constants";

type EmployeeCompetenciesProps = {
  competencies: Competency[];
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
};

const EmployeeCompetencies = ({
  competencies,
  register,
  errors,
}: EmployeeCompetenciesProps): JSX.Element => {
  return (
    <div className="my-4">
      <h2 className="text-xl font-bold">Your Competencies Assessment</h2>
      {competencies.map((competency) => (
        <div key={competency.id} className="mb-6">
          <h3 className="text-lg font-semibold">{competency.name}</h3>
          <div className="mt-2">
            <RadioGroup name={`employee-competency-${competency.id}`}>
              {Object.entries(competencyLevels).map(([value, label]) => (
                <div key={value} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={value}
                    id={`employee-competency-${competency.id}-${value}`}
                    {...register(`employee-competency-${competency.id}`)}
                  />
                  <Label
                    htmlFor={`employee-competency-${competency.id}-${value}`}
                  >
                    {label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <Textarea
            {...register(`employee-competency-${competency.id}-feedback`)}
            placeholder="Your feedback"
            className="mt-2 w-full"
          />

          {errors[`employee-competency-${competency.id}`] && (
            <AlertFormError message="Score is required." />
          )}
          {errors[`employeeFeedbackText-${competency.id}`] && (
            <AlertFormError message="Feedback is required." />
          )}
        </div>
      ))}
    </div>
  );
};

export default EmployeeCompetencies;
