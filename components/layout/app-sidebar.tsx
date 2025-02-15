"use client";

import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { navItems } from "@/constants/navbar";
import { useSession } from "./SessionContext";
import { NavItem } from "@/types";
import { Role } from "@/app/interfaces/roles.interface";
import { NavMain } from "./nav-main";
import { NavFooter } from "./nav-footer";

export function AppSidebar() {
  const { session } = useSession();
  const userRoles = session?.roles || [];

  const hasAccess = (item: NavItem) => {
    if (!item.allowedRoles) return true;
    return item.allowedRoles.some((role) => userRoles.includes(role as Role));
  };

  const filterNavItems = (items: NavItem[]): NavItem[] => {
    return items
      .filter((item) => {
        if (!hasAccess(item)) return false;

        if (item.items && item.items.length > 0) {
          const filteredItems = filterNavItems(item.items);
          return filteredItems.length > 0;
        }

        return true;
      })
      .map((item) => ({
        ...item,
        items: item.items ? filterNavItems(item.items) : [],
      }));
  };

  const filteredNavItems = filterNavItems(navItems);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 py-2 text-sidebar-accent-foreground">
          <div className="flex aspect-square size-8 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground">
            <Image
              src="/Jota.png"
              width={675}
              height={900}
              alt="Login image"
              className="h-full w-full object-cover rounded-full"
            />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Transporte Jouve</span>
            <span className="truncate text-xs">Logistica y Distribucion</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="overflow-x-hidden">
        <NavMain items={filteredNavItems} />
      </SidebarContent>
      <NavFooter />
    </Sidebar>
  );
}
