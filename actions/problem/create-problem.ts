"use server"

import {auth} from "auth"
import {CreateProblemSchema} from "@/schemas"
import {type CreateProblemFormValues} from "@/components/problem/problem-form"
import {db} from "@/lib/db"

export const createProblem = async (values: CreateProblemFormValues) => {
  const session = await auth()
  const userId = session?.user?.id
  const validatedFields = CreateProblemSchema.safeParse(values)

  if (!validatedFields.success) {
    return {error: "Invalid fields!"}
  }

  const {description, title, tagNames} = validatedFields.data

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

  await db.problem.create({
    data: {
      description,
      title,
      userId,
      tags: {
        createMany: {
          data: tags.map((tag) => ({
            tagId: tag.id,
          })),
          skipDuplicates: true,
        },
      },
    },
  })

  return {success: "Problemt created successfully!"}
}
