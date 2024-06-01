"use client"
import {type ControllerRenderProps} from "react-hook-form"
import {useState, useTransition} from "react"
import {type Tag} from "@prisma/client"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@ui/command"
import {tagsMatch} from "@/actions/tag/tags-match"

import {CreateEmptyTag} from "./problem/problem-create-empty-tag"

export function TagsList({
  setOpen,
  setSelectedStatus,

  field,
}: {
  setOpen: (open: boolean) => void
  setSelectedStatus: (tag?: string) => void

  field: ControllerRenderProps
}) {
  const [currentSearchValue, setCurrentSearchValue] = useState("")
  const [tagMatchResult, setTagMatchResult] = useState<Tag[] | null>(null)
  const [, startTransition] = useTransition()

  const onValueChange = (value: string) => {
    setCurrentSearchValue(value)
    startTransition(() => {
      tagsMatch(value).then((res) => {
        if (res?.tags) {
          setTagMatchResult(res?.tags)
        }
      })
    })
  }

  return (
    <Command>
      <CommandInput
        placeholder="Filter tag..."
        value={currentSearchValue}
        onValueChange={(e) => onValueChange(e)}
      />
      <CommandList>
        {!tagMatchResult?.length ? (
          <CommandEmpty>
            <CreateEmptyTag
              currentValue={currentSearchValue || "tags"}
              field={{...field}}
              setOpen={setOpen}
              setSelectedStatus={setSelectedStatus}
            />
          </CommandEmpty>
        ) : null}
        <CommandGroup>
          {tagMatchResult?.map((tag) => (
            <CommandItem
              key={tag.name}
              value={tag.name}
              onSelect={(value: string) => {
                const valueMatch = tagMatchResult?.find((tag) => tag.name === value)

                setSelectedStatus(valueMatch?.name)
                setCurrentSearchValue(valueMatch?.name || "")
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
