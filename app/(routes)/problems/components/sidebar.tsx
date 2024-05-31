import {type Tag} from "@prisma/client"
import {Suspense} from "react"

import {ScrollArea} from "@ui/scroll-area"
import {cn} from "@/lib/utils"

import {SideBarItem} from "./side-bar-item"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  tags?: Tag[]
}

export function Sidebar({className, tags}: SidebarProps) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="sticky top-0 space-y-4 py-4">
        <div className="py-2">
          <h2 className="relative px-4 text-lg font-semibold tracking-tight">tags</h2>
          <ScrollArea className="h-[600px] px-1">
            <div className="space-y-3 p-2">
              {tags?.map((tag) => (
                <Suspense key={tag.name}>
                  <SideBarItem tag={tag} />
                </Suspense>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
