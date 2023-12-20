// app/routes/index.ts
import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { authenticator } from "../services/auth.server";
import { Form, useLoaderData } from "@remix-run/react";

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

  console.log(data);
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix Protected Dashboard</h1>
      <p>{data?.username}</p>
      <Form method="post">
        <button>Log Out</button>
      </Form>
    </div>
  );
}
