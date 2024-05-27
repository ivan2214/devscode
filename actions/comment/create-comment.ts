"use server"
import {revalidatePath} from "next/cache"

import {db} from "@/lib/db"
import {CreateCommentSchema} from "@/schemas"
import {auth} from "auth"
import {type CreateCommentFormValues} from "@/app/(routes)/problem/[problemId]/components/comment/comment-form"

export const createComment = async (values: CreateCommentFormValues) => {
  const session = await auth()
  const authorId = session?.user?.id
  const validatedFields = CreateCommentSchema.safeParse(values)

  if (!validatedFields.success) {
    return {error: "Algo salio mal!"}
  }

  const {content, problemId} = validatedFields.data

  if (!problemId) return {error: "Algo salio mal!"}

  try {
    if (!authorId || authorId === undefined || authorId === null) {
      await db.comment.create({
        data: {
          content,
          problemId,
          anonymous: true,
        },
      })
    }

    if (authorId && authorId !== undefined && authorId !== null) {
      await db.comment.create({
        data: {
          content,
          problemId,
          authorId,
          anonymous: false,
        },
      })
    }

    return {succes: "Comentario creado correctamente"}
  } catch (error) {
    return {error: "Algo salio mal!"}
  } finally {
    revalidatePath(`/problem/${problemId}`)
  }
}
