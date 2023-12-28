import { MetaFunction } from "@remix-run/node";
import Card from "~/components/ui/card";

export const meta: MetaFunction = () => {
  return [{ title: "Reviews | All Reviews" }];
};

export default function AllReviews() {
  return (
    <Card label="All Reviews">
      <div>TBD</div>
    </Card>
  );
}
