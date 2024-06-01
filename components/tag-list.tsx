"use client"
import {type ControllerRenderProps} from "react-hook-form"
import {useState} from "react"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@ui/command"

import {type TagNames} from "./problem/problem-form"
import {CreateEmptyTag} from "./problem/problem-create-empty-tag"

export function TagsList({
  setOpen,
  setSelectedStatus,
  tags,
  field,
}: {
  setOpen: (open: boolean) => void
  setSelectedStatus: (tag?: string) => void
  tags?: TagNames[] | null
  field: ControllerRenderProps
}) {
  const [currentSearchValue, setCurrentSearchValue] = useState("")

  const onValueChange = (value: string) => {
    setCurrentSearchValue(value)
  }

  return (
    <Command>
      <CommandInput
        placeholder="Filter tag..."
        value={currentSearchValue}
        onValueChange={(e) => onValueChange(e)}
      />
      <CommandList>
        <CommandEmpty>
          <CreateEmptyTag
            currentValue={currentSearchValue || "tags"}
            field={{...field}}
            setOpen={setOpen}
            setSelectedStatus={setSelectedStatus}
          />
        </CommandEmpty>
        <CommandGroup>
          {tags?.map((tag) => (
            <CommandItem
              key={tag.name}
              value={tag.name}
              onSelect={(value: string) => {
                const valueMatch = tags?.find((tag) => tag.name === value)

                setSelectedStatus(valueMatch?.name)

                setOpen(false)
                field.onChange(value)
              }}
            >
              {tag.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
