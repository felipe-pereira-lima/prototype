import { useState, useEffect } from "react";
import { Compass } from "@phosphor-icons/react";
import { Link, useLocation } from "@remix-run/react";
import clsx from "clsx";

type NavigationItem = {
  name: string;
  href: string;
  submenu?: NavigationItem[];
};

export default function ApplicationSidebar(): JSX.Element {
  const navigationEmployee: NavigationItem[] = [
    { name: "Home", href: "/" },
    {
      name: "Meetings",
      href: "/meetings/list",
      submenu: [
        { name: "My Meetings", href: "/meetings/list" },
        { name: "Action Items", href: "/meetings/action-items" },
      ],
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
  const [openedMenu, setOpenedMenu] = useState<string>("");
  const [activeMainItem, setActiveMainItem] = useState<string>("Home");

  const handleMenuClick = (item: NavigationItem) => {
    if (item.submenu) {
      setOpenedMenu(openedMenu === item.name ? "" : item.name);
    } else {
      setOpenedMenu("");
    }
    setActiveItem(item.name);
    setActiveMainItem(item.name); // Set the active main menu item
  };

  // Update this in your submenu item click handler
  const handleSubmenuItemClick = (
    mainItemName: string,
    subItemName: string
  ) => {
    setActiveItem(subItemName);
    setActiveMainItem(mainItemName); // Set the active main menu item
  };

  useEffect(() => {
    const findActiveItem = (navItems: NavigationItem[]) => {
      for (let item of navItems) {
        // Check if the current location matches the main menu item
        if (item.href === location.pathname) {
          // If it has a submenu, return the name of the first submenu item
          if (item.submenu && item.submenu.length > 0) {
            return item.submenu[0].name;
          }
          // Otherwise, return the name of the main menu item
          return item.name;
        }

        // Check the submenu items
        if (item.submenu) {
          const submenuMatch = item.submenu.find(
            (subItem) => subItem.href === location.pathname
          );
          if (submenuMatch) {
            return submenuMatch.name;
          }
        }
      }
      return "Home"; // Default if no match is found
    };

    setActiveItem(findActiveItem(navigationEmployee));
  }, [location, navigationEmployee]);

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
                    className={clsx(
                      activeMainItem === item.name && "bg-gray-100"
                    )}
                  >
                    <Link
                      to={item.href}
                      className="group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-700 hover:text-blue-500 hover:bg-gray-100"
                      onClick={() => handleMenuClick(item)}
                    >
                      {item.name}
                    </Link>
                    {openedMenu === item.name && item.submenu && (
                      <ul role="list" className="pl-4 space-y-1">
                        {item.submenu.map((subItem) => (
                          <li key={subItem.name}>
                            <Link
                              to={subItem.href}
                              className={clsx(
                                activeItem === subItem.name
                                  ? "text-blue-500"
                                  : "text-gray-700 hover:text-blue-500 hover:bg-gray-100",
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
