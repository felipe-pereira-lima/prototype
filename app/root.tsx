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
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
} from "@remix-run/react";
import { authenticator } from "./services/auth.server";
import { SnackbarProvider } from "notistack";
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
import ApplicationLayout from "./components/application-layout";
import agGridCSS from "ag-grid-community/styles/ag-grid.css";
import agThemeMaterialCSS from "ag-grid-community/styles/ag-theme-material.css";
import agThemeQuartzCSS from "ag-grid-community/styles/ag-theme-quartz.css";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  { rel: "stylesheet", href: agGridCSS },
  { rel: "stylesheet", href: agThemeMaterialCSS },
  { rel: "stylesheet", href: agThemeQuartzCSS },
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
            <ApplicationLayout isLoginRoute={isLoginRoute} />
            <ScrollRestoration />
            <Scripts />
            <LiveReload />
          </SnackbarProvider>
        </UserContext.Provider>
      </body>
    </html>
  );
}
