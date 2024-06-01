"use client"

import {ListOrderedIcon} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@ui/dropdown-menu"
import {Button} from "@ui/button"

interface FilterDropDownOrderProps {}

export const FilterDropDownOrder: React.FC<FilterDropDownOrderProps> = ({}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <ListOrderedIcon className="mr-2 h-4 w-4" />
          Sort by
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]">
        <DropdownMenuRadioGroup>
          <DropdownMenuRadioItem value="newest">Newest</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="oldest">Oldest</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="top">Top Voted</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="popular">Most Popular</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
