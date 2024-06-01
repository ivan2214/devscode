"use server"
import {db} from "@/lib/db"

export const createTag = async (tag?: string) => {
  const tagExists = await db.tag.findFirst({
    where: {
      name: tag,
    },
  })

  if (tagExists) {
    return {
      error: "Tag already exists",
    }
  }

  if (!tag) {
    return {
      error: "Tag is required",
    }
  }

  console.log(tag)

  const newTag = "hola"

  /*  const newTag = await db.tag.create({
    data: {
      name: tag,
    },
  }) */

  return {
    tag: newTag,
  }
}
