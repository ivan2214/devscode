"use server"
import {db} from "@/lib/db"

export const tagsMatch = async (tag?: string) => {
  const tags = await db.tag.findMany({
    where: {
      name: {
        contains: tag,
        mode: "insensitive",
      },
    },
  })

  return {
    tags: tags,
  }
}
