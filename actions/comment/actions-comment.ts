"use server"
import {revalidatePath} from "next/cache"

import {db} from "@/lib/db"
import {CommentActionSchema} from "@/schemas"
import {auth} from "auth"
import {type CommentActionFormValues} from "@/app/(routes)/problem/[problemId]/components/comment/button-actions-comments"

export const actionsComment = async (values: CommentActionFormValues) => {
  const session = await auth()
  const userLikeId = session?.user?.id
  const validatedFields = CommentActionSchema.safeParse(values)

  if (!validatedFields.success) {
    return {error: "Algo salio mal!"}
  }

  const {commentId, action, problemId} = validatedFields.data

  try {
    const comment = await db.comment.findUnique({
      where: {
        id: commentId,
      },
    })

    console.log(userLikeId)

    if (!comment) {
      return {error: "Comentario no encontrado"}
    }

    if (!problemId) return {error: "Algo sasdasalio mal!!!"}

    //verificar que no puedo darme me gusta a mi mismo

    if (comment.authorId === userLikeId) return {error: "No puedes dar like a tu propio comentario"}

    if (!userLikeId || userLikeId === undefined || userLikeId === null) {
      return {error: "Debe iniciar sesion para realizar esta accion!"}
    }

    if (action === "like") {
      await db.comment.update({
        where: {
          id: commentId,
        },
        data: {
          likes: {increment: 1},
        },
      })
    }

    if (action === "unlike") {
      await db.comment.update({
        where: {
          id: commentId,
        },
        data: {
          dislikes: {increment: 1},
        },
      })
    }

    return {success: "Comentario actualizado"}
  } catch (error) {
    console.log(error)

    return {error: "Algo salio mal!"}
  } finally {
    revalidatePath(`/problem/${problemId}`)
  }
}
