import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
} from "~/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import Avatar from "~/components/ui/avatar";

type ViewReflectionsProps = {
  managerValue: string;
  supervisorName: string;
};

export default function ViewReflections({
  managerValue,
  supervisorName,
}: ViewReflectionsProps): JSX.Element {
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
          <AccordionTrigger className="text-left">
            The goal of this section is to reflect on the biggest achievements
            in the past months, the progress on the employee's development goals
            and also to discuss the current job satisfaction of the employee.
          </AccordionTrigger>

          <AccordionContent>
            <div className="flex gap-x-4 items-center">
              <Avatar string={supervisorName} />
              {managerValue}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
