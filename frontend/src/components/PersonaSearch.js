"use client";
import { useState, useRef } from "react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
} from "@/components/ui/command";
import personas from "../../data/personaData.json";

export default function PersonaSearch({ label, onSelect }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const names = Object.keys(personas);

  const filtered = names.filter((name) =>
    name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative w-full max-w-s" ref={containerRef}>
      <Command className="w-full border rounded-md shadow-sm">
        <CommandInput
          placeholder="Search for a persona..."
          value={query}
          onValueChange={(val) => {
            setQuery(val);
            setOpen(true);
          }}
        />
        {open && query && (
          <CommandList className="absolute z-50 mt-9 max-h-48 w-full overflow-y-auto rounded-md border bg-white shadow-md">
            <CommandEmpty>No Persona found.</CommandEmpty>
            {filtered.slice(0, 5).map((name) => (
              <CommandItem key={name} onSelect={() => {
                setOpen(false);
                setQuery(name);
                onSelect(name);
              }}>
                {name}
              </CommandItem>
            ))}
          </CommandList>
        )}
      </Command>
    </div>
  );
}
