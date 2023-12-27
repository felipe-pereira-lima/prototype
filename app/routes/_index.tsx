// app/routes/index.ts
import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { authenticator } from "../services/auth.server";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { UserRole } from "@prisma/client";
import Card from "~/components/ui/card";

export const loader: LoaderFunction = async ({ request }) => {
  return await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
};

export const action: ActionFunction = async ({ request }) => {
  await authenticator.logout(request, { redirectTo: "/login" });
};

export default function DashboardPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <Card label={`Welcome, ${data?.username} 👋`}>
      <h1>Your role is {data?.role.toLowerCase()}</h1>
    </Card>
  );
}
