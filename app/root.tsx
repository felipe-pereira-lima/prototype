import stylesheet from "./tailwind.css";
import type {
  ActionFunction,
  LinksFunction,
  LoaderFunction,
} from "@remix-run/node";
import {
  Form,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
} from "@remix-run/react";
import { authenticator } from "./services/auth.server";
import ApplicationSidebar from "./components/side-bar";
import { SnackbarProvider } from "notistack";
import clsx from "clsx";
import Navbar from "./components/nav-bar";
import { Button } from "./components/ui/button";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const user = await authenticator.isAuthenticated(request);
    return user;
  } catch (error) {
    return { user: null };
  }
};

export const action: ActionFunction = async ({ request }) => {
  await authenticator.logout(request, { redirectTo: "/login" });
};

export default function App() {
  const data = useLoaderData<typeof loader>();
  const location = useLocation();
  const isLoginRoute = location.pathname === "/login";

  console.log(data);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-blue-50">
        <SnackbarProvider
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          maxSnack={3}
        >
          {!isLoginRoute && (
            <div>
              <ApplicationSidebar />
              <Navbar user={data} />
            </div>
          )}
          <main
            className={clsx("lg:pl-72", {
              "flex justify-center items-center h-screen": isLoginRoute,
            })}
          >
            <div
              className={clsx("px-4 py-10 sm:px-6 lg:px-8 lg:py-6", {
                "w-full": isLoginRoute,
              })}
            >
              <Outlet />
            </div>
          </main>
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </SnackbarProvider>
      </body>
    </html>
  );
}
