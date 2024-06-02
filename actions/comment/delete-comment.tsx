"use server"

import {revalidatePath} from "next/cache"

import {db} from "@/lib/db"

export const deleteComment = async (id?: string, problemId?: string) => {
  if (!id) return {error: "Algo salio mal!"}
  try {
    await db.comment.delete({
      where: {
        id: id,
      },
    })

    return {success: "Comentario eliminado"}
  } catch (error) {
    return {error: "Algo salio mal!"}
  } finally {
    revalidatePath(`/problem/${problemId}`)
  }
}
