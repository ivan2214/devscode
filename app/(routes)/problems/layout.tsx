import {Suspense} from "react"

import {SearchBar} from "@/components/search-bar"
import SearchBarFallback from "@/components/fallbacks/search-bar-fallback"
import {db} from "@/lib/db"

import {FilterDropDownTag} from "./components/filter-drop-down-tag"
import {FilterSelectItemsPerPage} from "./components/filter-select-items-per-page"
import {FilterDropDownOrder} from "./components/filter-drop-down-order"

interface ProblemsLayoutProps {
  children: React.ReactNode
}

const ProblemsLayout: React.FC<ProblemsLayoutProps> = async ({children}) => {
  const tags = await db.tag.findMany()

  return (
    <div className="container mx-auto px-4 py-8">
      {/* <Sidebar className="hidden lg:block" tags={tags} /> */}
      <div className="mb-6 flex flex-col items-start justify-between md:flex-row md:items-center">
        <h1 className="text-2xl font-bold">Technology Questions</h1>
        <div className="flex items-center gap-4">
          <FilterDropDownTag tags={tags} />
          <FilterDropDownOrder />
          <FilterSelectItemsPerPage itemsPerPageTotal={tags.length} />
        </div>
      </div>

      <Suspense fallback={<SearchBarFallback />}>
        <SearchBar />
      </Suspense>

      {children}
    </div>
  )
}

export default ProblemsLayout
