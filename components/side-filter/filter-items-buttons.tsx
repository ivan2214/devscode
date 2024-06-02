import {Button} from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import {type QueryProps} from "@/types"
import {TagIcon, TagIcons} from "@ui/tag-icon"
import {cn} from "@/lib/utils"

interface FilterButtonsProps {
  selectedTag: string | null
  selectedSort: string | null
  selectedStatus: string | null
  currentParamsKeyword: string | null
  removeParam: (param: keyof QueryProps) => void
  tagsLength: number
  setOpen: (open: boolean) => void
}

export const FilterButtons: React.FC<FilterButtonsProps> = ({
  selectedTag,
  selectedSort,
  selectedStatus,
  currentParamsKeyword,
  removeParam,
  tagsLength,
  setOpen,
}) => {
  const isValidIcon = selectedTag !== "All" && selectedTag && selectedTag in TagIcons

  return (
    <>
      <p className="text-sm text-muted-foreground">
        Presiona{" "}
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">CTRL</span>+<span className="text-xs">J</span>
        </kbd>{" "}
        para abrir el filtro
      </p>
      <Button className="flex items-center gap-x-2" variant="outline" onClick={() => setOpen(true)}>
        <Icon className="h-3 w-3" name="filter" />
        {`Filter (${tagsLength})`}
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
          <Icon className="h-3 w-3 text-destructive" name="trash" />
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
          <Icon className="h-3 w-3 text-destructive" name="trash" />
        </Button>
      ) : null}

      {selectedStatus ? (
        <Button
          className={cn(
            "flex items-center gap-x-2 text-white",
            selectedStatus === "Solucionado"
              ? "bg-green-500"
              : selectedStatus === "Abierto"
                ? "bg-yellow-500"
                : "bg-red-500",
          )}
          type="button"
          variant="outline"
          onClick={() => removeParam("status")}
        >
          {selectedStatus}
          <Icon className="h-3 w-3" name="trash" />
        </Button>
      ) : null}

      {currentParamsKeyword ? (
        <Button
          className="flex items-center gap-x-2"
          type="button"
          variant="outline"
          onClick={() => removeParam("keyword")}
        >
          <Icon className="h-5 w-5" name="search" />
          {currentParamsKeyword}
          <Icon className="h-3 w-3 text-destructive" name="trash" />
        </Button>
      ) : null}

      <p className="text-sm text-muted-foreground">
        Presiona{" "}
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">CTRL</span>+<span className="text-xs">X</span>
        </kbd>{" "}
        para eliminar
      </p>
    </>
  )
}
