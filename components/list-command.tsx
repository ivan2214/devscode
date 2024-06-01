import {type Tag} from "@prisma/client"

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {TagIcon, TagIcons} from "@ui/tag-icon"
import {Badge} from "@ui/badge"
import Icon from "@ui/icon"
import {type SortByOptions} from "@/data/problem/get-filtered-problems"

interface SortOption {
  value: SortByOptions
  label: string
  type?: "asc" | "desc"
}

const sortOptions: SortOption[] = [
  {
    value: "date",
    label: "Fecha desc",
    type: "desc",
  },
  {
    value: "date",
    label: "Fecha asc",
    type: "asc",
  },
  {
    value: "likes",
    label: "Likes desc",
    type: "desc",
  },
  {
    value: "likes",
    label: "Likes asc",
    type: "asc",
  },
  {
    value: "dislikes",
    label: "Dislikes desc",
    type: "desc",
  },
  {
    value: "dislikes",
    label: "Dislikes asc",
    type: "asc",
  },
  {
    value: "title",
    label: "Título desc",
    type: "desc",
  },
  {
    value: "title",
    label: "Título asc",
    type: "asc",
  },
  {
    value: "views",
    label: "Vistas desc",
    type: "desc",
  },
  {
    value: "views",
    label: "Vistas asc",
    type: "asc",
  },
  {
    value: "comments",
    label: "Comentarios desc",
    type: "desc",
  },
  {
    value: "comments",
    label: "Comentarios asc",
    type: "asc",
  },
  {
    value: "ProblemsResolved",
    label: "Problemas resueltos desc",
    type: "desc",
  },
  {
    value: "ProblemsResolved",
    label: "Problemas resueltos asc",
    type: "asc",
  },
]

export function ListCommand({
  setOpen,
  setSelectedTag,
  tags,
  handleTagSelection,
  isDesktop,
  handleSortSelection,
  open,
  setSelectedSort,
}: {
  setOpen: (open: boolean) => void
  setSelectedTag: (tag: string | null) => void
  tags: Omit<Tag, "createdAt" | "updatedAt">[]
  handleTagSelection: (tagName: string) => void
  handleSortSelection: (sortBy: SortByOptions, type?: "asc" | "desc") => void
  setSelectedSort: (sort: string | null) => void
  isDesktop?: boolean
  open?: boolean
}) {
  if (isDesktop) {
    return (
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Tags">
            <CommandItem
              value="all"
              onSelect={() => {
                setSelectedTag("all")
                handleTagSelection("all")
                setOpen(false)
              }}
            >
              <Badge className="flex w-full items-center gap-x-2" variant="outline">
                <Icon className="h-5 w-5" name="tag" />
                All
              </Badge>
            </CommandItem>
            {tags.map((tag, index) => {
              const isLast = index === tags.length - 1
              const isValidTagIcon = tag.name in TagIcons

              return (
                <CommandItem
                  key={tag.id}
                  className="p-4"
                  value={tag.name}
                  onSelect={() => {
                    setSelectedTag(tag.name)
                    handleTagSelection(tag.name)
                    setOpen(false)
                  }}
                >
                  <Badge className="flex w-full items-center gap-x-2" variant="outline">
                    {isValidTagIcon ? (
                      <TagIcon className="h-5 w-5" name={tag.name} />
                    ) : (
                      <Icon className="h-5 w-5" name="tag" />
                    )}
                    {tag.name}
                  </Badge>

                  {!isLast && <CommandSeparator />}
                </CommandItem>
              )
            })}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Sort">
            {sortOptions.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={() => {
                  setSelectedSort(option.value)
                  handleSortSelection(option.value, option.type)
                  setOpen(false)
                }}
              >
                <Badge className="flex w-full items-center gap-x-2" variant="outline">
                  <Icon className="h-5 w-5" name="arrow-down-up" />
                  {option.label}
                </Badge>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    )
  }

  return (
    <Command>
      <CommandInput placeholder="Filter tag..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Tags">
          <CommandItem
            value="all"
            onSelect={() => {
              setSelectedTag(null)
              handleTagSelection("all")
              setOpen(false)
            }}
          >
            Todos
          </CommandItem>
          {tags.map((tag, index) => {
            const isLast = index === tags.length - 1
            const isValidTagIcon = tag.name in TagIcons

            return (
              <CommandItem
                key={tag.id}
                className="p-4"
                value={tag.name}
                onSelect={() => {
                  setSelectedTag(tag.name)
                  handleTagSelection(tag.name)
                  setOpen(false)
                }}
              >
                <Badge className="flex w-full items-center gap-x-2" variant="outline">
                  {isValidTagIcon ? (
                    <TagIcon className="h-5 w-5" name={tag.name} />
                  ) : (
                    <Icon className="h-5 w-5" name="tag" />
                  )}
                  {tag.name}
                </Badge>

                {!isLast && <CommandSeparator />}
              </CommandItem>
            )
          })}
        </CommandGroup>

        <CommandSeparator />
        <CommandGroup heading="Sort">
          {sortOptions.map((option) => (
            <CommandItem
              key={option.value}
              value={option.value}
              onSelect={() => {
                setSelectedSort(option.value)
                handleSortSelection(option.value, option.type)
                setOpen(false)
              }}
            >
              <Badge className="flex w-full items-center gap-x-2" variant="outline">
                <Icon className="h-5 w-5" name="arrow-down-up" />
                {option.label}
              </Badge>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
