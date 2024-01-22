import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "./button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./command";
import { cn } from "./utils/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { useState } from "react";

// This component is a junction of shadcn components, therefore it has a different format
interface Option {
  value: string;
  label: string;
}
export interface ComboBoxProps {
  options: Option[];
  onSelect: (value: string) => void;
  selectedValue: string;
  placeholder: string;
}

export function ComboBox({
  options,
  onSelect,
  selectedValue,
  placeholder = "Select an option...",
}: ComboBoxProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(selectedValue);

  const handleSelect = (currentValue: string) => {
    setValue(currentValue);
    setOpen(false);
    onSelect(currentValue);
  };

  const selectedOption = options.find((option) => option.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedOption ? selectedOption.label : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            placeholder={`${placeholder.toLowerCase()}...`}
            autoComplete="off"
          />
          <CommandEmpty>No option found.</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={() => handleSelect(option.value)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === option.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
