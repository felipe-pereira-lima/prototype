import { Separator } from "../ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

type ReflectionsProps = {};

export default function Reflections({}: ReflectionsProps): JSX.Element {
  return (
    <div className="my-4">
      <h1 className="text-xl font-bold">Reflections</h1>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Reflections on the past 6 months</AccordionTrigger>
          <AccordionContent>
            <Label htmlFor="managerReflection">Manager's Reflection</Label>
            <Textarea
              id="managerReflection"
              name="managerReflection"
              className="m-2"
              placeholder="Enter your reflection here"
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
