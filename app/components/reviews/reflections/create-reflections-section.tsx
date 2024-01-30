import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import clsx from "clsx";
import AlertFormError from "../../ui/alert-form-error";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

type CreateReflectionsProps = {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
};

export default function CreateReflections({
  register,
  errors,
}: CreateReflectionsProps): JSX.Element {
  const hasError = Boolean(errors.managerReflection);

  return (
    <div className="my-4">
      <h1 className="text-xl font-bold">Reflections</h1>
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="item-1"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>Reflections on the past 6 months</AccordionTrigger>
          <AccordionContent>
            <Label>Manager's Reflection</Label>
            <Textarea
              {...register("managerReflection", { required: true })}
              id="managerReflection"
              name="managerReflection"
              className={clsx("mt-2", {
                "border-red-500": hasError,
              })}
              placeholder="Enter your reflection here"
            />
            {hasError && (
              <AlertFormError message="Manager reflection is required." />
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
