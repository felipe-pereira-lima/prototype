// app/routes/login.ts
import {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
  json,
} from "@remix-run/node";
import { authenticator } from "../services/auth.server";
import { Form, useLoaderData } from "@remix-run/react";
import { sessionStorage } from "../services/session.server";
import { Button } from "~/components/ui/button";

import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Warning } from "phosphor-react";
import { Input } from "~/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
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

export const meta: MetaFunction = () => {
  return [{ title: "Crescendo | Login" }];
};

export default function LoginPage() {
  const loaderData = useLoaderData<typeof loader>();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Crescendo Final Project</CardTitle>
        <CardDescription>Web Development Template</CardDescription>
      </CardHeader>
      <CardContent>
        <Form method="post">
          <div className="mb-2">
            <Input type="email" name="email" placeholder="email" required />
          </div>
          <Input
            type="password"
            name="password"
            placeholder="password"
            required
            autoComplete="current-password"
          />
          <div className="flex justify-center">
            <Button type="submit" className="mt-4">
              Sign In
            </Button>
          </div>
        </Form>
        <div>
          {loaderData?.error ? (
            <div className="pt-2">
              <Alert variant="destructive">
                <Warning className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {loaderData?.error?.message}
                </AlertDescription>
              </Alert>
            </div>
          ) : null}
        </div>
      </CardContent>
      <CardFooter>
        <p>Forgot your password?</p>
      </CardFooter>
    </Card>
  );
}
