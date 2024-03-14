import { Fragment } from 'react';
import { RadioGroup } from '@headlessui/react';
import joinWithSpaces from 'utils/joinWithSpaces';

export default function TagList( {tags, setSelectedTagId} ) {
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
    </RadioGroup>
  );
}

function Tag({label, value}) {
  return (
    <RadioGroup.Option
      as={Fragment}
      key={label}
      value={value}
    >
      {({ checked }) => (
        <li
          className={joinWithSpaces(
            "rounded-full px-3 py-1 text-sm tracking-tight shadow-sm hover:brightness-95",
            checked ? "bg-accent1" : "bg-panel cursor-pointer"
          )}
        >
          {label}
        </li>
      )}
    </RadioGroup.Option>
  );
}