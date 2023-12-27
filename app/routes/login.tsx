// app/routes/index.ts
import { ActionFunction, LoaderFunction, json } from "@remix-run/node";
import { authenticator } from "../services/auth.server";
import { Form, useLoaderData } from "@remix-run/react";
import { sessionStorage } from "../services/session.server";
import { TextField } from "~/components/ui/text-field";
import { Button } from "~/components/ui/button";
import Card from "~/components/ui/card";

export const loader: LoaderFunction = async ({ request }) => {
  await authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });

  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );

  const error = session.get("sessionErrorKey");
  return json<any>({ error });
};

/**
 * called when the user hits button to login
 *
 */
export const action: ActionFunction = async ({ request, context }) => {
  // call my authenticator
  const resp = await authenticator.authenticate("form", request, {
    successRedirect: "/",
    failureRedirect: "/login",
    throwOnError: true,
    context,
  });
  return resp;
};

export default function LoginPage() {
  // if i got an error it will come back with the loader data
  const loaderData = useLoaderData<typeof loader>();
  return (
    <Card size="small" customClassName="mx-auto my-0 max-w-md">
      <h1>Welcome to Final Project Prototype - Web Development Template</h1>
      <Form method="post">
        <TextField type="email" label="email" placeholder="email" required />
        <TextField
          type="password"
          label="password"
          placeholder="password"
          autoComplete="current-password"
        />

        <Button type="submit">Sign In</Button>
      </Form>
      <div>
        {loaderData?.error ? <p>ERROR: {loaderData?.error?.message}</p> : null}
      </div>
    </Card>
  );
}
