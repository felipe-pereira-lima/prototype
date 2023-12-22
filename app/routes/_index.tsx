// app/routes/index.ts
import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { authenticator } from "../services/auth.server";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { UserRole } from "@prisma/client";
import ApplicationSidebar from "~/components/side-bar";

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
    <div>
      <h1>
        Welcome, {data?.username}. Your role is {data?.role.toLowerCase()}
      </h1>
      {data?.role === UserRole.SUPERVISOR && (
        <Link to="/manage/manage-employee">
          <Button>Manage</Button>
        </Link>
      )}
      <Form method="post">
        <button>Log Out</button>
      </Form>
    </div>
  );
}
