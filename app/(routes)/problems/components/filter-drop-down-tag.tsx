"use client"
import {type Tag} from "@prisma/client"
import {FilterIcon} from "lucide-react"

import {Button} from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@ui/dropdown-menu"

interface FilterDropDownTagProps {
  tags: Tag[]
}

export const FilterDropDownTag: React.FC<FilterDropDownTagProps> = ({tags}) => {
  const selectedTags: string[] = []
  const handleTagClick = (tagValue: string) => {}

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <FilterIcon className="mr-2 h-4 w-4" />
          Filter by tag
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]">
        {tags.map((tag) => (
          <DropdownMenuCheckboxItem
            key={tag.id}
            checked={selectedTags.includes(tag.name)}
            onCheckedChange={() => handleTagClick(tag.name)}
          >
            {tag.name}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
