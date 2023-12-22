import { useState } from "react";
import { House } from "@phosphor-icons/react";
import { Link, useLoaderData } from "@remix-run/react";
import clsx from "clsx";
import { ReactNode } from "react";
import { ActionFunction, LoaderFunction } from "react-router-dom";
import { authenticator } from "~/services/auth.server";
import { User } from "@prisma/client";

export interface ApplicationSidebarProps {
  // children: ReactNode;
  user: User;
}

export default function ApplicationSidebar({
  // children,
  user,
}: ApplicationSidebarProps) {
  const navigationEmployee = [
    { name: "Dashboard", href: "/" },
    { name: "Reviews", href: "/reviews/dashboard" },
  ];
  const [activeItem, setActiveItem] = useState<string>("Dashboard");

  return (
    <>
      <div>
        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
            <div className="flex h-16 shrink-0 items-center">logo</div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigationEmployee.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          className={clsx(
                            activeItem === item.name
                              ? "bg-gray-50 text-blue-500"
                              : "text-gray-700 hover:text-blue-500 hover:bg-gray-50",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          )}
                          onClick={() => setActiveItem(item.name)}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                {/* TODO: create a modal for profile */}
                <li className="-mx-6 mt-auto">
                  <a
                    href="#"
                    className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
                  >
                    <span className="h-8 w-8 rounded-full flex items-center justify-center bg-blue-100">
                      {user?.username[0] ?? ""}
                    </span>
                    <span className="sr-only">Your profile</span>
                    <span aria-hidden="true">{user?.username}</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
