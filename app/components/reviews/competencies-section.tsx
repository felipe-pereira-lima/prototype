import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Competency } from "@prisma/client";
import { Question } from "phosphor-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import { CardDescription } from "../ui/card";
import AlertFormError from "../ui/alert-form-error";
import clsx from "clsx";
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";

type CompetenciesProps = {
  competencies: Competency[];
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
};

const cardDescription = [
  "Please evaluate yourself / your employee based on:",
  "(1) the seniority level and",
  "(2) the current role / job description.",
  'If the rating differs from "Meets the expectations for current position", please include remarks on:',
  "(+) what is going well and",
  "(!) where you see room for improvement.",
];

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
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1" id={`competency-${competency.id}-1`} />
              <Label htmlFor={`competency-${competency.id}-1`}>
                Does not meet expectations for current position.
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="2" id={`competency-${competency.id}-2`} />
              <Label htmlFor={`competency-${competency.id}-2`}>
                Improvement required to meet expectations for current position.
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="3" id={`competency-${competency.id}-3`} />
              <Label htmlFor={`competency-${competency.id}-3`}>
                Meets expectations for current position.
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="4" id={`competency-${competency.id}-4`} />
              <Label htmlFor={`competency-${competency.id}-4`}>
                Sometimes exceeds expectations for current position.
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="5" id={`competency-${competency.id}-5`} />
              <Label htmlFor={`competency-${competency.id}-5`}>
                Consistently exceeds expectations for current position.
              </Label>
            </div>
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
