import stylesheet from "./tailwind.css";
import type {
  ActionFunction,
  LinksFunction,
  LoaderFunction,
} from "@remix-run/node";
import {
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
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { UserContext } from "./context/user-context";

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

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function App() {
  const data = useLoaderData<typeof loader>();
  const location = useLocation();
  const isLoginRoute = location.pathname === "/login";

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-blue-50">
        <UserContext.Provider value={data}>
          <SnackbarProvider
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            maxSnack={3}
          >
            {!isLoginRoute && (
              <div>
                <ApplicationSidebar />
                <Navbar />
              </div>
            )}
            <main
              className={clsx({
                "lg:pl-72": !isLoginRoute,
                "flex justify-center items-center min-h-screen": isLoginRoute,
              })}
            >
              <div
                className={clsx("px-4 py-10 sm:px-6 lg:px-8 lg:py-6", {
                  "max-w-full": isLoginRoute,
                })}
              >
                <Outlet />
              </div>
            </main>

            <ScrollRestoration />
            <Scripts />
            <LiveReload />
          </SnackbarProvider>
        </UserContext.Provider>
      </body>
    </html>
  );
}
