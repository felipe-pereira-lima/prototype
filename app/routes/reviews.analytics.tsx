import { MetaFunction } from "@remix-run/node";
import { Card } from "~/components/ui/card";

export const meta: MetaFunction = () => {
  return [{ title: "Reviews | Analytics" }];
};

export default function Analytics() {
  return (
    <Card title="Analytics">
      <div>TBD</div>
    </Card>
  );
}
