import { Label } from "../../ui/label";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Competency } from "@prisma/client";
import { Question } from "phosphor-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";
import { Separator } from "../../ui/separator";
import { Textarea } from "../../ui/textarea";
import { CardDescription } from "../../ui/card";
import AlertFormError from "../../ui/alert-form-error";
import clsx from "clsx";
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";
import { cardDescription, competencyLevels } from "~/utils/constants";

type CompetenciesProps = {
  competencies: Competency[];
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
};

export default function Competencies({
  competencies,
  register,
  errors,
}: CompetenciesProps): JSX.Element {
  return (
    <div className="my-4">
      <h1 className="text-xl font-bold">Competencies</h1>
      <CardDescription>
        <ul className="my-1">
          {cardDescription.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </CardDescription>

      {competencies?.map((competency, index) => (
        <div key={competency.id} className="my-4">
          <div className="flex flex-row space-x-1 items-center">
            <h2 className="mb-2">{competency.name}</h2>
            <div className="pb-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Question />
                  </TooltipTrigger>
                  <TooltipContent>{competency.description}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <RadioGroup name={`competency-${competency.id}`}>
            {Object.entries(competencyLevels).map(([value, label]) => (
              <div key={value} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={value}
                  id={`competency-${competency.id}-${value}`}
                  {...register(`competency-${competency.id}`)}
                />
                <Label htmlFor={`competency-${competency.id}-${value}`}>
                  {label}
                </Label>
              </div>
            ))}
          </RadioGroup>

          <div className="mt-4">
            <Textarea
              {...register(`competency-feedbackText-${competency.id}`, {
                required: true,
              })}
              name={`competency-feedbackText-${competency.id}`}
              className={clsx("w-full mt-1", {
                "border-red-500":
                  errors[`competency-feedbackText-${competency.id}`],
              })}
              placeholder={`Enter your feedback for '${competency.name.toLowerCase()}' here`}
            />

            {errors[`competency-feedbackText-${competency.id}`] && (
              <AlertFormError message={`${competency.name} is required.`} />
            )}
          </div>
        </div>
      ))}
      <Separator className="mt-4" />
    </div>
  );
}
