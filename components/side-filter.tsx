import {getTags} from "@/data/tag/get-tags"

import {Card, CardContent, CardHeader, CardTitle} from "./ui/card"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "./ui/select"

export const SideFilter = async () => {
  const {tags} = await getTags()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Etiquetas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tags?.length ? (
            <div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un lenguaje" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  {tags.map((tag) => (
                    <SelectItem key={tag.id} value={tag.id}>
                      {tag.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}
