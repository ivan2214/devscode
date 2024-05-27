"use server"

import {revalidatePath} from "next/cache"

import {db} from "@/lib/db"
import {ChangeStatusSchema} from "@/schemas"
import {type ChangeStatusFormValues} from "@/app/(routes)/problem/[problemId]/components/button-change-status"

export const changeStatus = async (data: ChangeStatusFormValues) => {
  const {status, problemId} = data

  const validatedFields = ChangeStatusSchema.safeParse(data)

  if (!validatedFields.success) {
    return {error: "Algo salio mal!"}
  }

  if (!problemId) return {error: "Algo salio mal!"}

  try {
    await db.problem.update({
      where: {
        id: problemId,
      },
      data: {
        status,
      },
    })

    return {success: "Estado cambiado correctamente"}
  } catch (error) {
    return {error: "Algo salio mal!"}
  } finally {
    revalidatePath(`/problem/${problemId}`)
  }
}
