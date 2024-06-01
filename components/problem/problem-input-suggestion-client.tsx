"use client"

import {useState} from "react"
import {type ControllerRenderProps} from "react-hook-form"

import {Button} from "@components/ui/button"
import {Popover, PopoverContent, PopoverTrigger} from "@components/ui/popover"
import {Drawer, DrawerContent, DrawerTrigger} from "@components/ui/drawer"
import {useMediaQuery} from "@/hooks/use-media-query"

import {TagsList} from "../tag-list"

interface ProblemInputSuggestionClientProps {
  field: ControllerRenderProps
}

export function ProblemInputSuggestionClient({field}: ProblemInputSuggestionClientProps) {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [selectedStatus, setSelectedStatus] = useState<string | null | undefined>(null)

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline">
            {selectedStatus ? <>{selectedStatus}</> : <>Seleccione una etiqueta</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-[200px] p-0">
          <TagsList field={{...field}} setOpen={setOpen} setSelectedStatus={setSelectedStatus} />
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
          <TagsList field={{...field}} setOpen={setOpen} setSelectedStatus={setSelectedStatus} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
