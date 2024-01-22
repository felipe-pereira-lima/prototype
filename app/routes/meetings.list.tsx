import { MetaFunction } from "@remix-run/node";
import { Card } from "~/components/ui/card";

export const meta: MetaFunction = () => {
  return [{ title: "Meetings | List" }];
};

export default function Meetings() {
  return (
    <Card title="Meetings">
      <div>TBD</div>
    </Card>
  );
}
