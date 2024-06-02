import React from "react"
import {type Tag} from "@prisma/client"

import {FilterDropDownTag} from "@/app/(routes)/problems/components/filter-drop-down-tag"
import {FilterSelectItemsPerPage} from "@/app/(routes)/problems/components/filter-select-items-per-page"
import {FilterDropDownOrder} from "@/app/(routes)/problems/components/filter-drop-down-order"

interface FiltersProps {
  tags: Tag[] | []
}

export default function Filters({tags}: FiltersProps) {
  return (
    <div className="flex flex-col items-start justify-between gap-y-3 md:flex-row md:items-center">
      <h1 className="text-2xl font-bold">Technology Questions</h1>
      <div className="flex flex-col items-center gap-4 lg:flex-row">
        <div className="flex items-center gap-2">
          <FilterDropDownTag tags={tags} />
          <FilterSelectItemsPerPage itemsPerPageTotal={tags.length} />
        </div>
        <FilterDropDownOrder />
      </div>
    </div>
  )
}
