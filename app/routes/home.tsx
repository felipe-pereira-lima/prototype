import { User } from "@prisma/client";
import { MetaFunction } from "@remix-run/node";
import Card from "~/components/ui/card";

export interface HomeProps {
  data: User;
}

export const meta: MetaFunction = () => {
  return [{ title: "Home" }];
};

export default function Home({ data }: HomeProps) {
  return (
    <div className="flex h-screen max-h-full flex-col overflow-y-auto p-4">
      <div className="flex-grow">
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-4">
            <Card label={`Welcome, ${data?.fullName} 👋`}>
              <h1>Your role is {data?.role.toLowerCase()}</h1>
            </Card>
          </div>

          <div className="col-span-3">
            <Card label={`Next meetings`}>
              <h1>tbd</h1>
            </Card>
          </div>

          {/* TODO: add position to data model, e.g, web developer */}
          <Card label={`Profile`}>
            <h1 className="truncate"> {data?.email}</h1>
          </Card>
        </div>
      </div>
    </div>
  );
}
