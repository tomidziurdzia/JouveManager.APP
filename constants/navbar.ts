import { NavItem } from "@/types";

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard/overview",
    icon: "dashboard",
    isActive: false,
    shortcut: ["d", "d"],
    items: [],
    allowedRoles: ["Manager", "Owner", "Driver"],
  },
  {
    title: "Travels",
    url: "/dashboard/travels",
    icon: "mapPin",
    isActive: false,
    shortcut: ["t", "t"],
    items: [],
    allowedRoles: ["Manager", "Owner"],
  },
  {
    title: "Shipments",
    url: "/dashboard/shipment",
    icon: "travel",
    isActive: false,
    shortcut: ["e", "e"],
    items: [],
    allowedRoles: ["Manager", "Owner"],
  },
  {
    title: "Vehicles",
    url: "#",
    icon: "truck",
    isActive: true,
    allowedRoles: ["Manager", "Owner"],
    items: [
      {
        title: "Trucks",
        url: "/dashboard/trucks",
        icon: "truck",
        shortcut: ["v", "v"],
        allowedRoles: ["Manager", "Owner"],
      },
      {
        title: "SemiTrailers",
        shortcut: ["s", "s"],
        url: "/dashboard/semi-trailers",
        icon: "semiTrailer",
        allowedRoles: ["Manager", "Owner"],
      },
    ],
  },
  {
    title: "Users",
    url: "/dashboard/users",
    icon: "users",
    isActive: false,
    shortcut: ["e", "e"],
    items: [],
    allowedRoles: ["Assistant", "Administrative", "Owner"],
  },
];
