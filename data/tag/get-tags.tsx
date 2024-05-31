import {type Tag} from "@prisma/client"

import {db} from "@/lib/db"

interface TagWithIdAndName {
  id: Tag["id"]
  name: Tag["name"]
}

export const getTags = async (): Promise<{tags: TagWithIdAndName[] | null}> => {
  try {
    const tags = await db.tag.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: "asc",
      },
    })

    return {tags}
  } catch (error) {
    return {tags: null}
  }
}
