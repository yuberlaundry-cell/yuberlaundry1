
"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "./input"

const countries = [
  { name: "South Africa", code: "ZA", dial_code: "+27" },
  { name: "United Kingdom", code: "GB", dial_code: "+44" },
  { name: "United States", code: "US", dial_code: "+1" },
  { name: "Nigeria", code: "NG", dial_code: "+234" },
  { name: "Ghana", code: "GH", dial_code: "+233" },
  { name: "Kenya", code: "KE", dial_code: "+254" },
]

export function PhoneNumberInput() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("ZA")

  return (
    <div className="flex gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[120px] justify-between"
          >
            {value
              ? countries.find((country) => country.code === value)?.code
              : "Select"}
             ({countries.find((country) => country.code === value)?.dial_code})
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search country..." />
            <CommandList>
                <CommandEmpty>No country found.</CommandEmpty>
                <CommandGroup>
                {countries.map((country) => (
                    <CommandItem
                    key={country.code}
                    value={country.name}
                    onSelect={() => {
                        setValue(country.code)
                        setOpen(false)
                    }}
                    >
                    <Check
                        className={cn(
                        "mr-2 h-4 w-4",
                        value === country.code ? "opacity-100" : "opacity-0"
                        )}
                    />
                    {country.name} ({country.dial_code})
                    </CommandItem>
                ))}
                </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Input type="tel" placeholder="82 123 4567" />
    </div>
  )
}
