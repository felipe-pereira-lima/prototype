import { useState, useEffect } from "react";
import { Compass } from "@phosphor-icons/react";
import { Link, useLocation } from "@remix-run/react";
import clsx from "clsx";

export default function ApplicationSidebar() {
  const navigationEmployee = [
    { name: "Home", href: "/" },
    {
      name: "Meetings",
      href: "/meetings/list",
      submenu: [{ name: "My Meetings", href: "/meetings/list" }],
    },
    {
      name: "Reviews",
      href: "/reviews/dashboard",
      submenu: [
        { name: "Dashboard", href: "/reviews/dashboard" },
        { name: "All Reviews", href: "/reviews/all" },
        { name: "Analytics", href: "/reviews/analytics" },
      ],
    },
  ];

  const location = useLocation();
  const [activeItem, setActiveItem] = useState<string>("Home");
  const [submenuOpen, setSubmenuOpen] = useState<boolean>(false);

  useEffect(() => {
    let matchedItem = navigationEmployee.find(
      (item) => item.href === location.pathname
    );

    const reviewsSubmenuMatch = navigationEmployee
      .find((item) => item.name === "Reviews")
      ?.submenu?.find((subItem) => subItem.href === location.pathname);

    if (reviewsSubmenuMatch) {
      setActiveItem(reviewsSubmenuMatch.name);
    } else if (matchedItem) {
      setActiveItem(matchedItem.name);
    } else {
      setActiveItem("Dashboard");
    }
  }, [location]);

  const handleMenuClick = (item: any) => {
    if (item.submenu) {
      // If the item has a submenu, toggle it
      setSubmenuOpen(item.name === "Reviews");
    } else {
      // If the item does not have a submenu, close any open submenu
      setSubmenuOpen(false);
      setActiveItem(item.name);
    }
  };

  return (
    <>
      <div>
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
            <Link to="/">
              <div className="flex h-16 shrink-0 items-center gap-x-1">
                <Compass weight="fill" size={28} />
                <p className="font-bold">Crescendo</p>
              </div>
            </Link>

            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-2">
                {navigationEmployee.map((item) => (
                  <li
                    key={item.name}
                    className={clsx(activeItem === item.name && "bg-gray-50")}
                  >
                    <Link
                      to={item.href}
                      className="group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-700 hover:text-blue-500 hover:bg-gray-50"
                      onClick={() => handleMenuClick(item)}
                    >
                      {item.name}
                    </Link>
                    {submenuOpen && item.submenu && item.name === "Reviews" && (
                      <ul role="list" className="pl-4 space-y-1">
                        {item.submenu.map((subItem) => (
                          <li key={subItem.name}>
                            <Link
                              to={subItem.href}
                              className={clsx(
                                activeItem === subItem.name
                                  ? "text-blue-500"
                                  : "text-gray-700 hover:text-blue-500 hover:bg-gray-50",
                                "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                              )}
                              onClick={() => setActiveItem(subItem.name)}
                            >
                              {subItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
