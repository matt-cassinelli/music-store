import { Fragment } from "react";
import { RadioGroup, Radio } from "@headlessui/react";
import clsx from "clsx";

export default function TagList({ tags, selectedTagId, setSelectedTagId, handleAddTagClick }) {
  return (
    <RadioGroup
      value={selectedTagId}
      onChange={(value) => setSelectedTagId(value)}
      className="flex flex-wrap p-4 gap-4 m-auto list-none"
      aria-label='Tag'
      as='ul'
    >
      <Tag key={"All"} label={"All"} value={null} />
      {tags.map((tag) => (
        <Tag key={tag.name} label={tag.name} value={tag.id} />
      ))}
      <button
        className="rounded-full px-3 py-1 text-sm tracking-tight shadow-lg hover:brightness-95 bg-bg1 cursor-pointer"
        onClick={handleAddTagClick}
      >
        +
      </button>
    </RadioGroup>
  );
}

function Tag({ label, value }) {
  return (
    <Radio
      as={Fragment}
      key={label}
      value={value}
    >
      {({ checked }) => (
        <li
          className={clsx(
            "rounded-full px-3 py-1 text-sm tracking-tight hover:brightness-95 shadow-md",
            checked ? "bg-green-200 dark:bg-green-800 cursor-default" : "bg-bg1 cursor-pointer"
          )}
        >
          {label}
        </li>
      )}
    </Radio>
  );
}
