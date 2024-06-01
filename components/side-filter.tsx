import {getTags} from "@/data/tag/get-tags"
import {type QueryProps} from "@/data/problem/get-filtered-problems"

import {Card, CardContent, CardHeader, CardTitle} from "./ui/card"
import {SideFilterItems} from "./side-filter-items"

export const SideFilter = async ({searchParams}: {searchParams?: QueryProps}) => {
  const {tags} = await getTags()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Etiquetas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tags?.length ? <SideFilterItems searchParams={searchParams} tags={tags} /> : null}
        </div>
      </CardContent>
    </Card>
  )
}
