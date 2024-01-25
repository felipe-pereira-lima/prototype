import { Separator } from "../ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Reflection } from "@prisma/client";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

type ReflectionsProps = {
  reflections?: Reflection;
};

export default function Reflections({
  reflections,
}: ReflectionsProps): JSX.Element {
  return (
    <div className="my-4">
      <h1 className="text-xl font-bold">Reflections</h1>
      <Separator className="bg-gray-100 mt-4" />
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Reflections on the past 6 months</AccordionTrigger>
          <AccordionContent>
            <Label htmlFor="managerReflection">Manager's Reflection</Label>
            <Textarea
              id="managerReflection"
              name="managerReflection"
              className="m-2"
              defaultValue={reflections?.managerReflection || ""}
              placeholder="Enter your reflection here"
            />
          </AccordionContent>
          <AccordionContent>
            <Label htmlFor="employeeReflection">Employee's Reflection</Label>
            <Textarea
              id="employeeReflection"
              name="employeeReflection"
              className="m-2"
              defaultValue={reflections?.employeeReflection || ""}
              placeholder="Enter your reflection here"
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
