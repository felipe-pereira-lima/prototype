import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "Reviews | Detail" }];
};
export default function ReviewDetail() {
  return (
    <div className="pl-4 bg-red-500 flex items-center justify-center"></div>
  );
}
