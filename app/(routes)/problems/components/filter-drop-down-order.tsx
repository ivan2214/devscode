"use client"

import {usePathname, useRouter, useSearchParams} from "next/navigation"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@ui/dropdown-menu"
import {Button} from "@ui/button"
import {type SortByOptions} from "@/types"
import {createUrl} from "@/lib/utils"
import {sortOptions} from "@/components/list-command"
import Icon from "@/components/ui/icon"

export const FilterDropDownOrder = ({}) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const selectedSort = searchParams.get("sortBy")
  const selectedSortType = searchParams.get("sortByType")

  const handleSortSelection = (sortBy: SortByOptions, type: "asc" | "desc" = "desc") => {
    const newParams = new URLSearchParams(searchParams.toString())

    newParams.set("sortBy", sortBy)

    if (type) {
      newParams.set("sortByType", type)
    }

    router.push(createUrl(pathname, newParams))
  }

  const handleSortSelectionType = (type: "asc" | "desc") => {
    const newParams = new URLSearchParams(searchParams.toString())

    newParams.set("sortByType", type)

    router.push(createUrl(pathname, newParams))
  }

  return (
    <section className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Icon className="mr-2 h-4 w-4" name="list-ordered" />
            {selectedSort ? selectedSort : "Sort by"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {sortOptions.length
            ? sortOptions.map((option) => {
                const isChecked = selectedSort === option.value

                return (
                  <DropdownMenuCheckboxItem
                    key={option.value}
                    checked={isChecked}
                    onCheckedChange={() => handleSortSelection(option.value)}
                  >
                    {option.label}
                  </DropdownMenuCheckboxItem>
                )
              })
            : null}
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Icon className="mr-2 h-4 w-4" name="list-ordered" />
            {selectedSortType ? selectedSortType : "Sort by type"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="h-fit">
          <DropdownMenuCheckboxItem
            checked={selectedSortType === "asc"}
            onCheckedChange={() => handleSortSelectionType("asc")}
          >
            Asc
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={selectedSortType === "desc"}
            onCheckedChange={() => handleSortSelectionType("desc")}
          >
            Desc
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  )
}
