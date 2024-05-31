"use server"

import {auth} from "auth"
import {CreateProblemSchema} from "@/schemas"
import {type CreateProblemFormValues} from "@components/problem/problem-form"
import {db} from "@/lib/db"

export const createProblem = async (values: CreateProblemFormValues) => {
  const session = await auth()
  const userId = session?.user?.id
  const validatedFields = CreateProblemSchema.safeParse(values)

  if (!validatedFields.success) {
    return {error: "Invalid fields!"}
  }

  const {description, title, tagNames, code} = validatedFields.data

  if (!description || !title) {
    return {error: "Invalid fields!"}
  }

  const tags = await db.tag.findMany({
    where: {
      name: {
        in: tagNames?.map((tag) => tag.name),
      },
    },
  })

  const tagsIds: string[] = tags.map((tag) => tag.id)

  if (!tags.length && tagNames?.length) {
    const newTags = await db.tag.createManyAndReturn({
      data: tagNames,
      select: {id: true},
    })

    tagsIds.push(...newTags.map((tag) => tag.id))
  }

  await db.problem.create({
    data: {
      description,
      title,
      userId,
      code,
      tags: {
        createMany: {
          data: tagsIds.map((id) => ({
            tagId: id,
          })),
          skipDuplicates: true,
        },
      },
    },
  })

  return {success: "Problemt created successfully!"}
}
