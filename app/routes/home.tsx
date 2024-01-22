import { User } from "@prisma/client";
import { MetaFunction } from "@remix-run/node";
import ProfileCard from "~/components/ui/home/profile-card";
import UpcomingMeetingsCard from "~/components/ui/home/upcoming-meetings-card";
import WelcomeCard from "~/components/ui/home/welcome-card";

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
            <WelcomeCard data={data} />
          </div>
          <div className="col-span-3">
            <UpcomingMeetingsCard />
          </div>
          {/* TODO: add position to data model, e.g, web developer */}
          <ProfileCard data={data} />
        </div>
      </div>
    </div>
  );
}
