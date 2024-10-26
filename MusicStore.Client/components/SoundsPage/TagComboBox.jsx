import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions, ComboboxButton, Field, Label } from "@headlessui/react";
import CheckIcon from "icons/CheckIcon";
import { useState } from "react";
import UpDownIcon from "icons/UpDownIcon";

export default function TagComboBox({ possibleValues, selectedTagsToAdd, setSelectedTagsToAdd }) {

  const [query, setQuery] = useState("");

  const filteredTags =
    query === ""
      ? possibleValues
      : possibleValues.filter((tag) => {
        return tag.name.toLowerCase().includes(query.toLowerCase());
      });

  return (
    <Field className="col-span-2">
      <Label className="font-medium">Tags</Label>
      <Combobox multiple value={selectedTagsToAdd} onChange={setSelectedTagsToAdd} onClose={() => setQuery("")}>
        <div className="relative mt-2">
          <ComboboxInput
            aria-label="Tags"
            displayValue={(selected) => selected.map(s => s.name).join(", ")}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full py-2 pr-8 pl-2 text-sm/6 bg-bg1 border-2 border-gray-300 dark:border-fg/50 rounded-lg focusable data-[focus]:focusable"
          />
          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
            <UpDownIcon className="size-5 stroke-fg/50" />
          </ComboboxButton>
          <ComboboxOptions
            anchor="bottom"
            transition
            className="w-[var(--input-width)] p-1 border-2 border-gray-300 dark:border-fg/50 bg-bg1 rounded-lg [--anchor-gap:var(--spacing-1)] empty:invisible transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
          >
            {filteredTags.map((tag) => (
              <ComboboxOption
                key={tag.id}
                value={tag}
                className="group flex gap-2 items-center py-1.5 px-3 cursor-default select-none rounded-lg data-[focus]:bg-green-100 dark:data-[focus]:bg-green-900"
              >
                <CheckIcon className="size-4 text-fg invisible group-data-[selected]:visible" />
                <div className="text-sm/6 text-fg">{tag.name}</div>
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        </div>
      </Combobox>
    </Field>
  );
}
