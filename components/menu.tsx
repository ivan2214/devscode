"use client"
import Link from "next/link"
import {usePathname, useRouter, useSearchParams} from "next/navigation"
import {Suspense} from "react"
import {type Tag} from "@prisma/client"

import MenuUser, {type ExtendsUser} from "@components/menu-user"
import ModeToggle from "@components/mode-toggle"
import SearchBarFallback from "@components/fallbacks/search-bar-fallback"
import {SearchBar} from "@components/search-bar"
import {cn, createUrl} from "@/lib/utils"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"
import AuthButtons from "@/components/auth-options"
import {Button} from "@ui/button"

const filterOptions = [
  {
    name: "Nuevos",
    value: "new",
  },
  {
    name: "Gratis",
    value: "free",
  },

  {
    name: "Todos",
    value: "all",
  },
  {
    name: "Recomendados",
    value: "recommended",
  },
  {
    name: "Destacados",
    value: "featured",
  },
  {
    name: "Mas vendidos",
    value: "most_sold",
  },
]

const sortOptions = [
  {
    name: "Mas recientes",
    value: "most_recent",
  },
  {
    name: "Mas antiguos",
    value: "most_ancient",
  },
  {
    name: "De mas popular a menos",
    value: "most_popular",
  },
]

export function Menu({tags, user}: {tags?: Tag[]; user?: ExtendsUser | null}) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const selectedTags = searchParams.get("tags")?.split(",") ?? []
  const selectedSortValues = searchParams.get("sort")?.split(",")
  const selectedFilterValues = searchParams.get("filter")
  const router = useRouter()

  const handleCategoryClick = (tagValue: string) => {
    const newParams = new URLSearchParams(searchParams?.toString())
    const updatedTags = [...selectedTags]
    const tagIndex = updatedTags.indexOf(tagValue)

    if (tagIndex === -1) {
      updatedTags.push(tagValue)
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

  const handleSortClick = (sortValue: string) => {
    const newParams = new URLSearchParams(searchParams?.toString())

    newParams.set("sort", sortValue)
    const includesOfferPage = pathname?.includes("problems")
    const pathNameDefined = !includesOfferPage ? `/problems${pathname}` : pathname

    router.push(createUrl(pathNameDefined, newParams))
    router.refresh()
  }

  const handleFilterClick = (filterValue: string) => {
    const newParams = new URLSearchParams(searchParams?.toString())

    newParams.set("filter", filterValue)
    const includesOfferPage = pathname?.includes("problems")
    const pathNameDefined = !includesOfferPage ? `/problems${pathname}` : pathname

    router.push(createUrl(pathNameDefined, newParams))
    router.refresh()
  }

  return (
    <Menubar className="container flex w-full items-center justify-between rounded-none border-b border-none px-2 py-8 lg:px-4">
      <div className="flex items-center gap-2">
        <Link className="font-bold" href="/">
          Inicio
        </Link>
        <MenubarMenu>
          <MenubarTrigger className="font-bold">problemas</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <Link href="/problems">problemas</Link>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Filters</MenubarSubTrigger>
              <MenubarSubContent className="w-[230px]">
                {filterOptions.map((filter) => (
                  <MenubarItem
                    key={filter.value}
                    className={cn(
                      "text-sm transition-colors duration-300 hover:underline",
                      selectedFilterValues?.includes(filter.value) &&
                        "underline decoration-primary underline-offset-4",
                    )}
                    onClick={() => {
                      handleFilterClick(filter.value)
                    }}
                  >
                    {filter.name}
                  </MenubarItem>
                ))}
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Sort</MenubarSubTrigger>
              <MenubarSubContent className="w-[230px]">
                {sortOptions.map((sort) => (
                  <MenubarItem
                    key={sort.value}
                    className={cn(
                      "text-sm transition-colors duration-300 hover:underline",
                      selectedSortValues?.includes(sort.value) &&
                        "underline decoration-primary underline-offset-4",
                    )}
                    onClick={() => {
                      handleSortClick(sort.value)
                    }}
                  >
                    {sort.name}
                  </MenubarItem>
                ))}
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Tags</MenubarSubTrigger>
              <MenubarSubContent className="w-[230px]">
                {tags?.map((tag) => (
                  <MenubarItem
                    key={tag.id}
                    className={cn(
                      "text-sm transition-colors duration-300 hover:underline",
                      selectedTags.includes(tag.name) &&
                        "underline decoration-primary underline-offset-4",
                    )}
                    onClick={() => {
                      handleCategoryClick(tag.name)
                    }}
                  >
                    {tag.name}
                  </MenubarItem>
                ))}
              </MenubarSubContent>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>
      </div>
      <section className="hidden items-center gap-2 md:flex">
        <Suspense fallback={<SearchBarFallback />}>
          <SearchBar />
        </Suspense>
        {!user && <AuthButtons />}
        {user ? <MenuUser user={user} /> : null}
        <Button role="link" type="button" variant="link">
          <Link href="/ask">Publicar problem</Link>
        </Button>
        <ModeToggle />
      </section>
    </Menubar>
  )
}
