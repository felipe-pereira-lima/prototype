import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { CardDescription } from "../ui/card";

export default function DevelopmentOutlook(): JSX.Element {
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
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            Based on the evaluation above: What are the two most important
            development goals that your employee should work on?
          </AccordionTrigger>
          <AccordionContent>
            <Label htmlFor="managerDevelopment">
              Your employee's development outlook
            </Label>
            <Textarea
              id="managerDevelopment"
              name="managerDevelopment"
              className="m-2"
              placeholder="Enter your employee's development outlook here"
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
