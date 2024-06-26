import {Suspense} from "react"

import {SearchBar} from "@/components/search-bar"
import SearchBarFallback from "@/components/fallbacks/search-bar-fallback"
import Filters from "@/app/(routes)/problems/components/filters"
import {getAllTags} from "@/data/tag/get-all-tags"

interface ProblemsLayoutProps {
  children: React.ReactNode
}

const ProblemsLayout: React.FC<ProblemsLayoutProps> = async ({children}) => {
  const {tags} = await getAllTags()

  return (
    <div className="container mx-auto px-4 py-8">
      <Filters tags={tags || []} />

      <Suspense fallback={<SearchBarFallback />}>
        <SearchBar />
      </Suspense>

      {children}
    </div>
  )
}

export default ProblemsLayout
