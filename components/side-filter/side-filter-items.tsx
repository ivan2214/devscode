"use client"

import {usePathname, useRouter, useSearchParams} from "next/navigation"
import {type Status, type Tag} from "@prisma/client"
import {useEffect, useState} from "react"

import {ListCommandWrapper} from "@components/list-command-wrapper"
import {createUrl} from "@/lib/utils"
import {useMediaQuery} from "@/hooks/use-media-query"
import {type SortByOptions, type QueryProps} from "@/types"

interface SideFilterItemsProps {
  tags: Omit<Tag, "createdAt" | "updatedAt">[]
}

export const SideFilterItems: React.FC<SideFilterItemsProps> = ({tags}) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentParamsTags = new URLSearchParams(searchParams.toString()).get("tags")
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [selectedTag, setSelectedTag] = useState<string | null>(
    currentParamsTags && currentParamsTags,
  )
  const currentParamsSortBy = new URLSearchParams(searchParams.toString()).get("sortBy")
  const [selectedSort, setSelectedSort] = useState<string | null>(
    currentParamsSortBy && currentParamsSortBy,
  )
  const currentParamStatus: Status | null = new URLSearchParams(searchParams.toString()).get(
    "status",
  ) as Status | null
  const parsedStatus: Record<Status, string> = {
    open: "Abierto",
    closed: "Cerrado",
    solved: "Solucionado",
    unsolved: "Sin Solucionar",
  }
  const statusParsed = currentParamStatus && parsedStatus[currentParamStatus]
  const [selectedStatus, setSelectedStatus] = useState<string | null>(statusParsed)

  const currentParamsKeyword = new URLSearchParams(searchParams.toString()).get("keyword")

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)

    return () => document.removeEventListener("keydown", down)
  }, [])

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams.toString())
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "x" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()

        setOpen(false)
        newParams.delete("tags")
        newParams.delete("sortBy")
        newParams.delete("sortByType")
        newParams.delete("status")
        newParams.delete("keyword")

        setSelectedTag("all")
        setSelectedSort(null)
        setSelectedStatus(null)

        router.push(createUrl(pathname, newParams))
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [pathname, router, searchParams])

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

  const handleSortSelection = (sortBy: SortByOptions, type: "asc" | "desc" = "desc") => {
    const newParams = new URLSearchParams(searchParams.toString())

    newParams.set("sortBy", sortBy)

    if (type) {
      newParams.set("sortByType", type)
    }

    router.push(createUrl(pathname, newParams))
  }

  const handleStatusSelection = (status: Status) => {
    const newParams = new URLSearchParams(searchParams.toString())

    newParams.set("status", status)

    router.push(createUrl(pathname, newParams))
  }

  const removeParam = (param: keyof QueryProps) => {
    const newParams = new URLSearchParams(searchParams.toString())

    if (param === "tags") {
      setSelectedTag("all")
      newParams.delete("tags")
    }

    if (param === "sortBy") {
      newParams.delete("sortBy")
      newParams.delete("sortByType")

      setSelectedSort(null)
    }

    if (param === "status") {
      setSelectedStatus(null)
      newParams.delete("status")
    }

    if (param === "keyword") {
      newParams.delete("keyword")
    }

    if (param === "sortByType") {
      newParams.delete("sortByType")
    }

    router.push(createUrl(pathname, newParams))
  }

  return (
    <ListCommandWrapper
      currentParamsKeyword={currentParamsKeyword}
      handleSortSelection={handleSortSelection}
      handleStatusSelection={handleStatusSelection}
      handleTagSelection={handleTagSelection}
      isDesktop={isDesktop}
      open={open}
      removeParam={removeParam}
      selectedSort={selectedSort}
      selectedStatus={selectedStatus}
      selectedTag={selectedTag}
      setOpen={setOpen}
      setSelectedSort={setSelectedSort}
      setSelectedStatus={setSelectedStatus}
      setSelectedTag={setSelectedTag}
      tags={tags}
    />
  )
}
