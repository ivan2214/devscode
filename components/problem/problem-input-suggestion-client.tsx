"use client"

import * as React from "react"
import {type ControllerRenderProps} from "react-hook-form"

import {Button} from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {Drawer, DrawerContent, DrawerTrigger} from "@/components/ui/drawer"
import {useMediaQuery} from "@/hooks/use-media-query"

import {CreateEmptyTag} from "./problem-create-empty-tag"
import {type TagNames} from "./problem-form"

interface ProblemInputSuggestionClientProps {
  field: ControllerRenderProps
  tags?: TagNames[] | null
  tagsAlreadySelected?: TagNames[] | null
}

export function ProblemInputSuggestionClient({
  field,
  tags,
  tagsAlreadySelected,
}: ProblemInputSuggestionClientProps) {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [selectedStatus, setSelectedStatus] = React.useState<string | null | undefined>(null)
  const allTags = [...(tags || []), ...(tagsAlreadySelected || [])]

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline">
            {selectedStatus ? <>{selectedStatus}</> : <>Seleccione una etiqueta</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-[200px] p-0">
          <TagsList
            field={{...field}}
            setOpen={setOpen}
            setSelectedStatus={setSelectedStatus}
            tags={allTags}
          />
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">
          {selectedStatus ? <>{selectedStatus}</> : <>Seleccione una etiqueta</>}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <TagsList
            field={{...field}}
            setOpen={setOpen}
            setSelectedStatus={setSelectedStatus}
            tags={allTags}
          />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function TagsList({
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
  const [currentSearchValue, setCurrentSearchValue] = React.useState("")

  return (
    <Command>
      <CommandInput placeholder="Filter tag..." onValueChange={(e) => setCurrentSearchValue(e)} />
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
