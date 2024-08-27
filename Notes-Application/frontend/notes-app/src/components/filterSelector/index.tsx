import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { DropdownMenuItem } from "../../components/ui/dropdown-menu";
import { Check } from "lucide-react";
import useLanguage from "@/locale/useLanguage";


interface TableProps {
  list: string[];
  onChange: React.Dispatch<React.SetStateAction<string>>;
}

export const FilterSelector: React.FC<TableProps> = ({ list, onChange }) => {
  const [selected, setSelected] = useState<string>("All");
  const translate = useLanguage();
  console.log(list);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="ml-auto border-2 rounded-3xl gap-2"
        >
          Filters{" "}
          <img
            alt="slider.png"
            src="./assets/images/icons/slider.png"
            height="20"
            width="20"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
        style={{ maxHeight: "300px", overflowY: "auto" }}
      >
        {list.map((column) => {
          column = column === "default" ? "All" : column;
          const isSelected = column === selected;
          return (
            <DropdownMenuItem
              key={column}
              textValue={column}
              className={`capitalize relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${
                isSelected ? "font-bold justify-between" : ""
              }`}
              onClick={() => {
                setSelected(column);
                column = column === "All" ? "default" : column;
                onChange(column);
              }}
            >
              {translate(column)}
              {isSelected && <Check color="#7f7ffb" size="18" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
