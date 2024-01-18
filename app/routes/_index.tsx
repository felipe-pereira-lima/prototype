// app/routes/index.ts
import { ActionFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { authenticator } from "../services/auth.server";
import { useLoaderData } from "@remix-run/react";
import Card from "~/components/ui/card";

export const loader: LoaderFunction = async ({ request }) => {
  return await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
};

export const action: ActionFunction = async ({ request }) => {
  await authenticator.logout(request, { redirectTo: "/login" });
};

export const meta: MetaFunction = () => {
  return [{ title: "Home" }];
};

export default function DashboardPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <Card label={`Welcome, ${data?.fullName} 👋`}>
      <h1>Your role is {data?.role.toLowerCase()}</h1>
    </Card>
  );
}
