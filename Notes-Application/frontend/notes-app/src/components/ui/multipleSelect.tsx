import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTrigger } from "./dialog";
import { DrawerDescription, DrawerTitle } from "./drawer";
import CreateTags from "../templates/CreateTags";

interface Tags {
  id: number;
  name: string;
}

interface MultiSelectComponentProps {
  unitsData: Tags[];
  selectedUnits: Tags[];
  setSelectedUnits: (units: Tags[]) => void;
  placeholder: string;
  onCreate?: (placeholder: string, isItemFound: boolean, moduleName: string) => void;
}

export default function MultiSelectComponent({
  unitsData,
  selectedUnits,
  setSelectedUnits,
  placeholder,
  onCreate,
}: MultiSelectComponentProps) {
  const [open, setOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>(""); // checking for the entered input value
  const [isItemFound, setIsItemFound] = useState(true); // checking for the item found case

  const handleSetValue = (unit: Tags) => {
    if (selectedUnits.some((selected: any) => selected.id === unit.id)) {
      setSelectedUnits(selectedUnits.filter((item) => item.id !== unit.id));
    } else {
      setSelectedUnits([...selectedUnits, unit]);
    }
  };

  const doesNotExistInArray = selectedUnits.every(
    (arr) =>
      (arr.name?.toLowerCase() || "") !== (inputValue?.toLowerCase() || "")
  );

  const handleItemNotFound = () => {
    setIsItemFound(false);
    onCreate?.(placeholder || "", false, ""); // setting the is item found prop
    setIsDialogOpen(true);
  };

  const generateRenders = (placeholder: string) => {
    if (placeholder === "Tags") {
      return <CreateTags />;
    }
  };

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[480px] justify-between"
          >
            <div className="flex gap-2 justify-start">
              {selectedUnits.length > 0
                ? selectedUnits.map((unit) => (
                    <div
                      key={unit.id}
                      className="px-2 py-1 rounded-xl border bg-secondary text-xs font-medium"
                    >
                      {unit.name}
                    </div>
                  ))
                : "Select Tags..."}
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput
              placeholder={`Select ${placeholder}`}
              value={inputValue}
              onValueChange={(val) => setInputValue(val)}
            />
            <CommandList>
              {doesNotExistInArray && inputValue && (
                <CommandEmpty className="flex flex-col gap-4 items-center justify-center">
                  <h2 className="font-semibold text-sm">
                    No {`${placeholder}`} found.
                  </h2>
                  <Button
                    type="button"
                    className="mb-2 rounded-md shadow-sm text-sm font-semibold"
                    onClick={() => handleItemNotFound()}
                  >
                    Create {placeholder}
                  </Button>
                </CommandEmpty>
              )}
              <CommandGroup>
                {unitsData.map((unit) => (
                  <CommandItem
                    key={unit.id}
                    onSelect={() => handleSetValue(unit)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedUnits.some(
                          (selected) => selected.id === unit.id
                        )
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {unit.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
        {isDialogOpen && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger>
              <Button type="button">Create {placeholder}</Button>
            </DialogTrigger>
            <DialogContent>
              <DrawerTitle>Create {placeholder}</DrawerTitle>
              <DrawerDescription>
                The {placeholder} created will be saved and available in the
                dropdown list after exiting this dialog. Search for the newly
                created {placeholder} to find in the dropdown.
              </DrawerDescription>
              {generateRenders(String(placeholder))}
            </DialogContent>
          </Dialog>
        )}
      </Popover>
    </>
  );
}
