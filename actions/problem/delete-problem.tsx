"use server"

import {redirect} from "next/navigation"

import {db} from "@/lib/db"

export const deleteProblem = async (problemId: string) => {
  if (!problemId) return {error: "Problem not found"}
  try {
    await db.problem.delete({
      where: {
        id: problemId,
      },
    })

    return {success: "Problem deleted"}
  } catch (error) {
    return {error: "Something went wrong"}
  } finally {
    redirect("/")
  }
}
