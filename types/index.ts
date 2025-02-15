import { Icons } from "@/components/icons";
import { DataTableConfig } from "@/config/data-table";
import { ColumnSort, Row } from "@tanstack/react-table";

export interface NavItem {
  title: string;
  url: string;
  disabled?: boolean;
  external?: boolean;
  shortcut?: [string, string];
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
  isActive?: boolean;
  items?: NavItem[];
  allowedRoles?: string[];
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;

export interface DataTableRowAction<TData> {
  row: Row<TData>;
  type: "update" | "delete";
}

export interface DataTableFilterField<TData> {
  id: StringKeyOf<TData>;
  label: string;
  placeholder?: string;
  options?: Option[];
}

export interface DataTableAdvancedFilterField<TData>
  extends DataTableFilterField<TData> {
  type: ColumnType;
}

export interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  count?: number;
}

export type StringKeyOf<TData> = Extract<keyof TData, string>;

export type ColumnType = DataTableConfig["columnTypes"][number];

export type ExtendedSortingState<TData> = ExtendedColumnSort<TData>[];

export interface ExtendedColumnSort<TData> extends Omit<ColumnSort, "id"> {
  id: StringKeyOf<TData>;
}

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
