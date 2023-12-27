import { useState } from "react";
import { Compass } from "@phosphor-icons/react";
import { Link } from "@remix-run/react";
import clsx from "clsx";
export interface ApplicationSidebarProps {}

export default function ApplicationSidebar({}: ApplicationSidebarProps) {
  const navigationEmployee = [
    { name: "Home", href: "/" },
    { name: "Reviews", href: "/reviews/dashboard" },
  ];
  const [activeItem, setActiveItem] = useState<string>("Home");

  return (
    <>
      <div>
        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
            <div className="flex h-16 shrink-0 items-center gap-x-1">
              <Compass weight="fill" size={28} />
              <p className="font-bold">Crescendo</p>
            </div>
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
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
