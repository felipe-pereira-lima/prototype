// app/routes/index.ts
import { ActionFunction, LoaderFunction, json } from "@remix-run/node";
import { authenticator } from "../services/auth.server";
import { Form, useLoaderData } from "@remix-run/react";
import { sessionStorage } from "../services/session.server";

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
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Final Project Prototype - Web Development Template</h1>
      <Form method="post">
        <input type="email" name="email" placeholder="email" required />
        <input
          type="password"
          name="password"
          placeholder="password"
          autoComplete="current-password"
        />
        <button>Sign In</button>
      </Form>
      <div>
        {loaderData?.error ? <p>ERROR: {loaderData?.error?.message}</p> : null}
      </div>
    </div>
  );
}
