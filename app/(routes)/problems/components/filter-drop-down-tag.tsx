"use client"
import {type Tag} from "@prisma/client"
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
import Icon from "@/components/ui/icon"

interface FilterDropDownTagProps {
  tags: Tag[]
}

export const FilterDropDownTag: React.FC<FilterDropDownTagProps> = ({tags}) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const selectedTags = searchParams.get("tags")?.split(",") ?? []

  const handleTagSelection = (tagName: string) => {
    const newParams = new URLSearchParams(searchParams?.toString())
    const updatedTags = [...selectedTags]
    const tagIndex = updatedTags.indexOf(tagName)

    if (tagIndex === -1) {
      updatedTags.push(tagName)
    } else {
      updatedTags.splice(tagIndex, 1)
    }

    if (updatedTags.length > 0) {
      newParams.set("tags", updatedTags.map((tag) => tag).join(","))
    } else {
      newParams.delete("tags")
    }

    const includesOfferPage = pathname?.includes("problems")
    const pathNameDefined = !includesOfferPage ? `/problems${pathname}` : pathname

    router.push(createUrl(pathNameDefined, newParams))
    router.refresh()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Icon className="mr-2 h-4 w-4" name="filter" />
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
