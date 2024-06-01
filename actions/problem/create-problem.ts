"use server"

import {type Tag} from "@prisma/client"

import {CreateProblemSchema} from "@/schemas"
import {type CreateProblemFormValues} from "@components/problem/problem-form"
import {db} from "@/lib/db"

export const createProblem = async (values: CreateProblemFormValues) => {
  const validatedFields = CreateProblemSchema.safeParse(values)

  if (!validatedFields.success) {
    return {error: "Invalid fields!"}
  }

  const {description, title, tagNames, code, userId} = validatedFields.data

  if (!userId) {
    return {error: "Please sign in!"}
  }

  if (!description || !title || !userId) {
    return {error: "Invalid fields!"}
  }

  const newProblem = await db.problem.create({
    data: {
      description,
      title,
      userId,
      code,
    },
  })

  if (tagNames) {
    const tagsAlreadyExist = await db.tag.findMany({
      where: {
        name: {
          in: tagNames.map((tag) => tag.name),
        },
      },
    })

    const tagsNotExist = tagNames.filter(
      (tag) => !tagsAlreadyExist.some((t) => t.name === tag.name),
    )

    let allTags: Tag[] = [...tagsAlreadyExist]

    if (tagsNotExist.length > 0) {
      const newTags = await db.tag.createManyAndReturn({
        data: tagsNotExist.map((tag) => ({
          name: tag.name,
        })),
      })

      allTags = [...allTags, ...newTags]
    }

    if (allTags && allTags.length > 0) {
      await db.tagsOnProblem.createMany({
        data: allTags.map((tag) => ({
          tagId: tag.id,
          problemId: newProblem.id,
        })),
      })
    }
  }

  return {success: "Problemt created successfully!"}
}
