import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableFilterField } from "@/types";
import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import React from "react";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

interface DataTableToolbarProps<TData>
  extends React.HTMLAttributes<HTMLDivElement> {
  table: Table<TData>;
  filterFields?: DataTableFilterField<TData>[];
}

export function DataTableToolbar<TData>({
  table,
  filterFields,
  children,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-wrap gap-2 items-center justify-between">
      <div className="flex flex-wrap items-center gap-2">
        {filterFields?.map((field) =>
          field.options ? (
            <DataTableFacetedFilter
              key={field.id}
              column={table.getColumn(field.id)}
              title={field.label}
              options={field.options}
            />
          ) : (
            <Input
              key={field.id}
              placeholder={field.placeholder}
              value={
                (table.getColumn(field.id)?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn(field.id)?.setFilterValue(event.target.value)
              }
              className="h-8 w-[150px] lg:w-[250px]"
            />
          )
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">{children}</div>
    </div>
  );
}
