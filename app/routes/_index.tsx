// app/routes/index.ts
import { ActionFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { authenticator } from "../services/auth.server";
import { useLoaderData } from "@remix-run/react";
import Home from "./home";

export const loader: LoaderFunction = async ({ request }) => {
  return await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
};

export const action: ActionFunction = async ({ request }) => {
  await authenticator.logout(request, { redirectTo: "/login" });
};

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return <Home data={data} />;
}
