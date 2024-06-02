import {type Tag, type Status} from "@prisma/client"

import {Drawer, DrawerContent, DrawerTrigger} from "@/components/ui/drawer"
import {Button} from "@/components/ui/button"
import {ListCommand} from "@/components/list-command"
import {type QueryProps, type SortByOptions} from "@/types"
import {FilterButtons} from "@components/side-filter/filter-items-buttons"

interface ListCommandWrapperProps {
  isDesktop: boolean
  open: boolean
  setOpen: (open: boolean) => void
  selectedTag: string | null
  setSelectedTag: (tag: string | null) => void
  tags: Omit<Tag, "createdAt" | "updatedAt">[]
  handleTagSelection: (tagName: string) => void
  handleSortSelection: (sortBy: SortByOptions, type?: "asc" | "desc") => void
  handleStatusSelection: (status: Status) => void
  setSelectedSort: (sort: string | null) => void
  setSelectedStatus: (status: string | null) => void
  removeParam: (param: keyof QueryProps) => void
  currentParamsKeyword: string | null
  selectedSort: string | null
  selectedStatus: string | null
}

export const ListCommandWrapper: React.FC<ListCommandWrapperProps> = ({
  isDesktop,
  open,
  setOpen,
  selectedTag,
  setSelectedTag,
  tags,
  handleTagSelection,
  handleSortSelection,
  handleStatusSelection,
  setSelectedSort,
  setSelectedStatus,
  removeParam,
  currentParamsKeyword,
  selectedSort,
  selectedStatus,
}) => {
  if (isDesktop) {
    return (
      <>
        <FilterButtons
          currentParamsKeyword={currentParamsKeyword}
          removeParam={removeParam}
          selectedSort={selectedSort}
          selectedStatus={selectedStatus}
          selectedTag={selectedTag}
          setOpen={setOpen}
          tagsLength={tags.length}
        />
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
