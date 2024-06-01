"use client"

import {usePathname, useRouter, useSearchParams} from "next/navigation"
import {useState} from "react"

import {createUrl} from "@/lib/utils"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@ui/select"

interface FilterSelectItemsPerPageProps {
  itemsPerPageTotal?: number
}

export const FilterSelectItemsPerPage: React.FC<FilterSelectItemsPerPageProps> = ({
  itemsPerPageTotal,
}) => {
  const [takeParam] = useSearchParams().getAll("take")
  const [take, setTake] = useState(takeParam || "All")
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const itemsPerPage = Array.from(
    {length: Math.ceil((itemsPerPageTotal || 0) / 10)},
    (_, i) => (i + 1) * 10,
  )

  const handleTakeSelection = (take: string) => {
    const newParams = new URLSearchParams(searchParams.toString())

    if (take === "All") {
      newParams.delete("take")
      setTake("All")
    }

    if (take !== "All") {
      newParams.set("take", take)
      setTake(take)
    }

    router.push(createUrl(pathname, newParams))
  }

  return (
    <Select defaultValue={take} value={take} onValueChange={handleTakeSelection}>
      <SelectTrigger className="w-24">
        <SelectValue placeholder="10" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All">All</SelectItem>
        {itemsPerPage.map((item) => (
          <SelectItem key={item} value={String(item)}>
            {item}
          </SelectItem>
        ))}

        <SelectItem value={String(itemsPerPageTotal)}>
          {itemsPerPageTotal} {itemsPerPageTotal === 1 ? "item" : "items"}
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
