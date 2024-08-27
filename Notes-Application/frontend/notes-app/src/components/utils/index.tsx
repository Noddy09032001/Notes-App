import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "./utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "../ui/dialog";


interface ComboBoxType {
  value: any;
  setValue: (state: any) => void;
  placeholder?: string;
  array: any[];
  setId: (state: any) => void;
  classname: string;
}

export const SearchAndSelect = ({
  value,
  setValue,
  placeholder,
  array,
  setId,
  classname,
}: ComboBoxType) => {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = useState("")  // checking for the entered input value
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const doesNotExistInArray = array.every(
    (arr) => arr.name.toLowerCase() !== inputValue.toLowerCase()
  );

  const handleButtonClick = () => {
    setIsDialogOpen(true)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("", classname)}
        >
          {value.id !== 0
            ? array.find((arr) => arr.name === value.name)?.name
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 shadow-sm">
        <Command>
          <CommandInput placeholder={`Select ${placeholder}`}
          value={inputValue}
          onValueChange={(val) => setInputValue(val)}  // setting the input value on the change
          />
          <CommandList className="bg-secondary">
            {doesNotExistInArray && inputValue && (
              <CommandEmpty>
                No {`${placeholder}`} found.
                <Button
                type="button"
                className="rounded-md shadow-sm text-sm font-semibold"
                onClick={handleButtonClick}
                >
                    Create "{inputValue}" Tag
                </Button>
              </CommandEmpty>
            )}
            <CommandGroup>
              {array.map((arr) => (
                <CommandItem
                  key={arr.id}
                  value={arr}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? null : arr);
                    setOpen(false);
                    setId(arr.id);
                  }}
                  className="font-semibold"
                >
                  <Check
                    className={`mr-2 h-4 w-4 ${
                      value && value.id === arr.id ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  {arr.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
      {isDialogOpen && (
        <Dialog open = {isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
                <DialogTitle>Create {placeholder}</DialogTitle>
                <DialogDescription>
                    Create {placeholder}. The {placeholder} will be automatically rendered in the list in the notes creation form
                </DialogDescription>
            </DialogContent>
        </Dialog>
      )}
    </Popover>
  );
};
