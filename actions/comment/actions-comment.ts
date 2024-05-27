"use server"
import {revalidatePath} from "next/cache"
import {type Reply, type Comment} from "@prisma/client"

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

  const {action, problemId, commentId, replyId, isReply} = validatedFields.data

  try {
    let comment: Comment | null = null
    let reply: Reply | null = null

    if (!isReply && commentId) {
      comment = await db.comment.findUnique({
        where: {
          id: commentId,
        },
      })
    }

    if (isReply && replyId) {
      reply = await db.reply.findUnique({
        where: {
          id: replyId,
        },
      })
    }

    if (!userLikeId) return {error: "Debe iniciar sesion para realizar esta accion!"}

    if (!problemId) return {error: "Algo salio mal!!!"}

    if (reply?.userIdReply === userLikeId)
      return {error: "No puedes dar like a tu propio comentario!"}

    if (comment?.authorId === userLikeId)
      return {error: "No puedes dar like a tu propio comentario!"}

    if (action === "like" && !isReply && comment) {
      await db.comment.update({
        where: {
          id: commentId,
        },
        data: {
          likes: {increment: 1},
        },
      })
    }

    if (action === "unlike" && !isReply && comment) {
      await db.comment.update({
        where: {
          id: commentId,
        },
        data: {
          dislikes: {increment: 1},
        },
      })
    }

    if (action === "like" && isReply && reply) {
      await db.reply.update({
        where: {
          id: replyId,
        },
        data: {
          likes: {increment: 1},
        },
      })
    }

    if (action === "unlike" && isReply && reply) {
      await db.reply.update({
        where: {
          id: replyId,
        },
        data: {
          dislikes: {increment: 1},
        },
      })
    }

    return {success: "Comentario actualizado"}
  } catch (error) {
    return {error: "Algo salio mal!!!!!!"}
  } finally {
    revalidatePath(`/problem/${problemId}`)
  }
}
