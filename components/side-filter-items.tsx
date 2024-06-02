"use client"

import {usePathname, useRouter, useSearchParams} from "next/navigation"
import {type Status, type Tag} from "@prisma/client"
import {useEffect, useState} from "react"

import {createUrl} from "@/lib/utils"
import {useMediaQuery} from "@/hooks/use-media-query"
import {Button} from "@/components/ui/button"
import {Drawer, DrawerContent, DrawerTrigger} from "@/components/ui/drawer"
import {TagIcon, TagIcons} from "@ui/tag-icon"
import {type QueryProps, type SortByOptions} from "@/data/problem/get-filtered-problems"

import Icon from "./ui/icon"
import {ListCommand} from "./list-command"

interface SideFilterItemsProps {
  tags: Omit<Tag, "createdAt" | "updatedAt">[]
  searchParams?: QueryProps
}

export const SideFilterItems: React.FC<SideFilterItemsProps> = ({
  tags,
  searchParams: propsSearchParams,
}) => {
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
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const {keyword} = propsSearchParams || {}

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

    newParams.delete(param)

    router.push(createUrl(pathname, newParams))
  }

  const isValidIcon = selectedTag !== "All" && selectedTag && selectedTag in TagIcons

  if (isDesktop) {
    return (
      <>
        <p className="text-sm text-muted-foreground">
          Presiona{" "}
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">CTRL</span>+<span className="text-xs">J</span>
          </kbd>{" "}
          para abrir el filtro
        </p>
        <Button className="flex items-center gap-x-2" onClick={() => setOpen(true)}>
          <Icon className="h-3 w-3" name="filter" />
          {`Filter (${tags.length})`}
        </Button>
        {selectedTag && selectedTag !== "all" ? (
          <Button
            className="flex items-center gap-x-2"
            type="button"
            variant="outline"
            onClick={() => removeParam("tags")}
          >
            {selectedTag !== "all" && isValidIcon ? (
              <TagIcon className="h-5 w-5" name={selectedTag} />
            ) : (
              <Icon className="h-5 w-5" name="tag" />
            )}
            {selectedTag}

            <Icon className="h-3 w-3 text-destructive " name="trash" />
          </Button>
        ) : null}

        {selectedSort ? (
          <Button
            className="flex items-center gap-x-2"
            type="button"
            variant="outline"
            onClick={() => removeParam("sortBy")}
          >
            <Icon className="h-5 w-5" name="arrow-up-down" />
            {selectedSort}
            <Icon className="h-3 w-3 text-destructive " name="trash" />
          </Button>
        ) : null}

        {selectedStatus ? (
          <Button
            className="flex items-center gap-x-2"
            type="button"
            variant="outline"
            onClick={() => removeParam("status")}
          >
            {selectedStatus}
            <Icon className="h-3 w-3 text-destructive " name="trash" />
          </Button>
        ) : null}

        {keyword ? (
          <Button
            className="flex items-center gap-x-2"
            type="button"
            variant="outline"
            onClick={() => removeParam("keyword")}
          >
            <Icon className="h-5 w-5" name="search" />
            {keyword}
            <Icon className="h-3 w-3 text-destructive " name="trash" />
          </Button>
        ) : null}

        <p className="text-sm text-muted-foreground">
          Presiona{" "}
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">CTRL</span>+<span className="text-xs">X</span>
          </kbd>{" "}
          para eliminar
        </p>
        <ListCommand
          handleSortSelection={handleSortSelection}
          handleStatusSelection={handleStatusSelection}
          handleTagSelection={handleTagSelection}
          isDesktop={isDesktop}
          open={open}
          setOpen={setOpen}
          setSelectedSort={setSelectedSort}
          setSelectedStatus={setSelectedStatus}
          setSelectedTag={setSelectedTag}
          tags={tags}
        />
      </>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="w-[150px] justify-start" variant="outline">
          {selectedTag ? <>{selectedTag}</> : <>Filtros</>}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <ListCommand
            handleSortSelection={handleSortSelection}
            handleStatusSelection={handleStatusSelection}
            handleTagSelection={handleTagSelection}
            isDesktop={isDesktop}
            setOpen={setOpen}
            setSelectedSort={setSelectedSort}
            setSelectedStatus={setSelectedStatus}
            setSelectedTag={setSelectedTag}
            tags={tags}
          />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
