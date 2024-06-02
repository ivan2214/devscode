import {type Tag} from "@prisma/client"

import {db} from "@/lib/db"

export const getAllTags = async (): Promise<{tags: Tag[] | null}> => {
  try {
    const tags = await db.tag.findMany()

    return {tags}
  } catch (error) {
    return {tags: null}
  }
}
