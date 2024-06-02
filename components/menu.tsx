"use client"
import Link from "next/link"
import {usePathname, useRouter, useSearchParams} from "next/navigation"
import {type Tag} from "@prisma/client"

import MenuUser, {type ExtendsUser} from "@components/menu-user"
import ModeToggle from "@components/mode-toggle"
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
} from "@ui/menubar"
import AuthButtons from "@components/auth-options"

import {ButtonCreateProblem} from "./button-create-problem"
import {sortOptions} from "./list-command"
import {Button} from "./ui/button"

export function Menu({tags, user}: {tags?: Tag[]; user?: ExtendsUser | null}) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const selectedTags = searchParams.get("tags")?.split(",") ?? []
  const selectedSortValues = searchParams.get("sort")?.split(",")

  const router = useRouter()

  const handleTagClick = (tagValue: string) => {
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

  return (
    <Menubar className="container flex w-full items-center justify-between rounded-none border-b border-none px-2 py-8 lg:px-4">
      <div className="flex items-center gap-2">
        <Button role="link" variant="link">
          <Link href="/">Inicio</Link>
        </Button>
        <Button role="link" variant="link">
          <Link href="/problems">Problemas</Link>
        </Button>
        <MenubarMenu>
          <MenubarTrigger className="cursor-pointer font-bold hover:underline">
            Filtros
          </MenubarTrigger>
          <MenubarContent>
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
                    {sort.label}
                  </MenubarItem>
                ))}
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Tags</MenubarSubTrigger>
              <MenubarSubContent className="h-32 w-[230px] overflow-y-auto">
                {tags?.map((tag) => (
                  <MenubarItem
                    key={tag.id}
                    className={cn(
                      "text-sm transition-colors duration-300 hover:underline",
                      selectedTags.includes(tag.name) &&
                        "underline decoration-primary underline-offset-4",
                    )}
                    onClick={() => {
                      handleTagClick(tag.name)
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
        {!user && <AuthButtons />}
        {user ? <MenuUser user={user} /> : null}
        <ButtonCreateProblem />
        <ModeToggle />
      </section>
    </Menubar>
  )
}
