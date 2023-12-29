import { NavigationItem } from "~/utils/types";

export const navigationList: NavigationItem[] = [
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
