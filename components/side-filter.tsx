import {getTags} from "@/data/tag/get-tags"

import {Card, CardContent, CardHeader, CardTitle} from "./ui/card"
import {SideFilterItems} from "./side-filter-items"

export const SideFilter = async () => {
  const {tags} = await getTags()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Etiquetas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">{tags?.length ? <SideFilterItems tags={tags} /> : null}</div>
      </CardContent>
    </Card>
  )
}
