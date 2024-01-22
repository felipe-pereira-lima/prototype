import { MetaFunction } from "@remix-run/node";
import { Card } from "~/components/ui/card";

export const meta: MetaFunction = () => {
  return [{ title: "Meetings | Action Items" }];
};

export default function ActionItems() {
  return (
    <Card title="Action Items">
      <div>TBD</div>
    </Card>
  );
}
