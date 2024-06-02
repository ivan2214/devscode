"use client"
import {type Tag} from "@prisma/client"
import {FilterIcon} from "lucide-react"
import {usePathname, useRouter, useSearchParams} from "next/navigation"

import {Button} from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@ui/dropdown-menu"
import {createUrl} from "@/lib/utils"
import {TagIcon, TagIcons} from "@/components/ui/tag-icon"

interface FilterDropDownTagProps {
  tags: Tag[]
}

export const FilterDropDownTag: React.FC<FilterDropDownTagProps> = ({tags}) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const selectedTags: string[] = []

  const handleTagSelection = (tagName: string) => {
    const newParams = new URLSearchParams(searchParams.toString())

    if (tagName === "all") {
      newParams.delete("tags")
    }

    if (tagName !== "all") {
      newParams.set("tags", tagName)
    }

    router.push(createUrl(pathname, newParams))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <FilterIcon className="mr-2 h-4 w-4" />
          Filter by tag
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="h-[200px] w-[200px] overflow-y-auto">
        {tags.map((tag) => {
          const isValidIcon = tag.name !== "All" && tag.name in TagIcons

          return (
            <DropdownMenuCheckboxItem
              key={tag.id}
              checked={selectedTags.includes(tag.name)}
              onCheckedChange={() => handleTagSelection(tag.name)}
            >
              {isValidIcon ? <TagIcon className="mr-2 h-4 w-4" name={tag.name} /> : null}
              {tag.name}
            </DropdownMenuCheckboxItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
