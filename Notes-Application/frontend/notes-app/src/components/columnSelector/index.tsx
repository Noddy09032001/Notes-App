import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import React from "react";
import { Button } from "../../components/ui/button";
import { Check, ChevronDownIcon } from "lucide-react";
import { Table } from "@tanstack/react-table";
import useLanguage from "@/locale/useLanguage";


interface TableProps {
  tab: Table<any>;
}

export const SelectDataTableColumns: React.FC<TableProps> = ({ tab }) => {
  const translate = useLanguage();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="ml-auto border-2 rounded-3xl gap-2"
        >
          Columns <ChevronDownIcon className="h-5 w-5" color="#7f7ffb" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
        style={{ maxHeight: "300px", overflowY: "auto" }}
      >
        {tab
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .filter((column) => column.id.toUpperCase() !== "INDEX")
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none justify-between transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {translate(column.id)}
                {column.getIsVisible() && <Check color="#7f7ffb" size="18" />}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
