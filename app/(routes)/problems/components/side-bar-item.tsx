"use client"

import {type Tag} from "@prisma/client"
import Link from "next/link"
import {usePathname, useSearchParams} from "next/navigation"

import {cn, createUrl} from "@/lib/utils"

interface SideBarItemProps {
  tag: Tag
}

export const SideBarItem: React.FC<SideBarItemProps> = ({tag}) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const active = searchParams.get("tags")?.split(",").includes(tag.name)
  const activeParams =
    searchParams.get("tags") === null ||
    searchParams.get("tags") === "" ||
    searchParams.get("tags") === undefined
      ? false
      : true
  const selectedTags = searchParams.get("tags")?.split(",") ?? []

  const newParams = new URLSearchParams(searchParams.toString())

  if (!activeParams) {
    newParams.delete("tags")
  }

  if (!active) {
    const newTags = [...selectedTags, tag.name]

    newParams.set("tags", newTags.join(","))
  } else {
    const cleanedTags = selectedTags.filter((c) => c !== tag.name)

    if (cleanedTags.length === 0) {
      newParams.delete("tags")
    }

    if (cleanedTags.length > 0) {
      newParams.set("tags", cleanedTags.join(","))
    }
  }

  return (
    <Link
      className={cn(
        "block px-4 font-extralight capitalize transition-colors duration-300 hover:underline",
        selectedTags.includes(tag.name) && "underline decoration-primary underline-offset-4",
      )}
      href={createUrl(pathname, newParams)}
      prefetch={!active ? false : undefined}
    >
      {tag.name}
    </Link>
  )
}
