import { useState, useEffect } from "react";
import { Compass } from "phosphor-react";
import { Link, useLocation } from "@remix-run/react";
import clsx from "clsx";
import {
  NavigationItem,
  navigationList,
} from "./utils/side-bar-navigation-list";

export default function ApplicationSidebar(): JSX.Element {
  const location = useLocation();
  const [activeMainItem, setActiveMainItem] = useState<string>("Home");
  const [activeItem, setActiveItem] = useState<string>("Home");
  const [openedMenu, setOpenedMenu] = useState<string>("");

  const handleMenuClick = (item: NavigationItem) => {
    if (item.submenu) {
      setOpenedMenu(openedMenu === item.name ? "" : item.name);
    } else {
      setOpenedMenu("");
    }
    setActiveMainItem(item.name); // Set the active main menu item
    setActiveItem(item.name);
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

    setActiveItem(findActiveItem(navigationList));
  }, [location, navigationList]);

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
                {navigationList.map((item) => (
                  <li
                    key={item.name}
                    className={clsx(
                      activeMainItem === item.name && "bg-gray-100 rounded-md"
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
                      <ul role="list" className="pl-4 space-y-1 rounded-md">
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
