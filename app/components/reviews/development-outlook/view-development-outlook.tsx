import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import Avatar from "~/components/ui/avatar";

type ViewDevelopmentOutlookProps = {
  managerValue: string;
  supervisorName: string;
  employeeValue: string;
  employeeName: string;
};

export default function ViewDevelopmentOutlook({
  employeeValue,
  employeeName,
  managerValue,
  supervisorName,
}: ViewDevelopmentOutlookProps): JSX.Element {
  return (
    <div className="my-4">
      <h1 className="text-xl font-bold">Development Outlook</h1>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-left">
            Upon reviewing the strengths and areas for development identified in
            the competency assessment above, this section is dedicated to
            committing to clear and actionable next steps for your development.
          </AccordionTrigger>

          <AccordionContent>
            <div className="flex gap-x-4 items-center">
              <Avatar string={supervisorName} />
              {managerValue}
            </div>
            <div className="flex pt-4 gap-x-4 items-center">
              <Avatar string={employeeName} />
              {employeeValue ?? "TBD: Waiting for employee"}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
