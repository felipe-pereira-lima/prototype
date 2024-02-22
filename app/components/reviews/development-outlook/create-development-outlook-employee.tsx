import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";

import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { CardDescription } from "../../ui/card";
import AlertFormError from "../../ui/alert-form-error";
import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

type CreateDevelopmentOutlookProps = {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
};

export default function CreateSelfDevelopmentOutlook({
  register,
  errors,
}: CreateDevelopmentOutlookProps): JSX.Element {
  const hasError = Boolean(errors.employeeDevelopment);

  return (
    <div className="my-4">
      <h1 className="text-xl font-bold">Development Outlook</h1>
      <CardDescription>
        <p className="my-1">
          After looking at the strengths and development areas by assessing the
          competencies above this part is about committing to clear next steps
          regarding development.
        </p>
      </CardDescription>
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="item-1"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-left">
            Based on the evaluation above: What are the two most important
            development goals that your employee should work on?
          </AccordionTrigger>
          <AccordionContent>
            <Label htmlFor="employeeDevelopment">
              Your employee's development outlook
            </Label>
            <Textarea
              {...register("employeeDevelopment", { required: true })}
              id="employeeDevelopment"
              name="employeeDevelopment"
              className={clsx("mt-2", {
                "border-red-500": hasError,
              })}
              placeholder="Enter employee development goals here"
            />
            {hasError && (
              <AlertFormError message="Manager development is required." />
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
