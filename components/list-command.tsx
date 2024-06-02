import {type Status, type Tag} from "@prisma/client"

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
import {type SortByOptions} from "@/types"
import {cn} from "@/lib/utils"

interface SortOption {
  value: SortByOptions
  label: string
}

export const sortOptions: SortOption[] = [
  {
    value: "date",
    label: "Fecha",
  },
  {
    value: "likes",
    label: "Likes",
  },

  {
    value: "dislikes",
    label: "Dislikes",
  },
  {
    value: "title",
    label: "Título",
  },
  {
    value: "views",
    label: "Vistas",
  },
  {
    value: "comments",
    label: "Comentarios",
  },
  {
    value: "ProblemsResolved",
    label: "Problemas resueltos",
  },
]

export interface StatusOption {
  value: Status
  label: string
}

export const statusOptions: StatusOption[] = [
  {
    value: "closed",
    label: "Cerrado",
  },
  {
    value: "open",
    label: "Abierto",
  },
  {
    value: "solved",
    label: "Solucionado",
  },
  {
    value: "unsolved",
    label: "Sin solución",
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
  setSelectedStatus,
  handleStatusSelection,
}: {
  tags: Omit<Tag, "createdAt" | "updatedAt">[]
  isDesktop?: boolean
  open?: boolean
  setOpen: (open: boolean) => void
  setSelectedTag: (tag: string | null) => void
  handleTagSelection: (tagName: string) => void
  handleSortSelection: (sortBy: SortByOptions, type?: "asc" | "desc") => void
  setSelectedSort: (sort: string | null) => void
  setSelectedStatus: (status: string | null) => void
  handleStatusSelection: (status: Status) => void
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
                  handleSortSelection(option.value)
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
          <CommandSeparator />
          <CommandGroup heading="Status">
            {statusOptions.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={() => {
                  setSelectedStatus(option.label)
                  handleStatusSelection(option.value)
                  setOpen(false)
                }}
              >
                <Badge
                  className={cn(
                    "text-white",
                    option.value === "solved"
                      ? "bg-green-500"
                      : option.value === "open"
                        ? "bg-yellow-500"
                        : "bg-red-500",
                  )}
                  variant="outline"
                >
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
                handleSortSelection(option.value)
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
        <CommandSeparator />
        <CommandGroup heading="Status">
          {statusOptions.map((option) => (
            <CommandItem
              key={option.value}
              value={option.value}
              onSelect={() => {
                setSelectedStatus(option.label)
                handleStatusSelection(option.value)
                setOpen(false)
              }}
            >
              <Badge
                className={cn(
                  "text-white",
                  option.value === "solved"
                    ? "bg-green-500"
                    : option.value === "open"
                      ? "bg-yellow-500"
                      : "bg-red-500",
                )}
                variant="outline"
              >
                {option.label}
              </Badge>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
