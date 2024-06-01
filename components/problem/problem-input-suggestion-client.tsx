"use client"

import * as React from "react"
import {type ControllerRenderProps} from "react-hook-form"

import {Button} from "@/components/ui/button"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {Drawer, DrawerContent, DrawerTrigger} from "@/components/ui/drawer"
import {useMediaQuery} from "@/hooks/use-media-query"

import {TagsList} from "../tag-list"

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
