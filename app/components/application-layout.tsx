import { Outlet } from "@remix-run/react";
import clsx from "clsx";
import ApplicationSidebar from "./side-bar";
import Navbar from "./nav-bar";

export interface ApplicationLayoutProps {
  isLoginRoute: boolean;
}

export default function ApplicationLayout({
  isLoginRoute,
}: ApplicationLayoutProps): JSX.Element {
  return (
    <>
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
    </>
  );
}
