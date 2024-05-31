"use server"
import {revalidatePath} from "next/cache"

import {db} from "@/lib/db"
import {UpdateProblemSchema} from "@/schemas"
import {type UpdateProblemFormValues} from "@components/problem/problem-form"

export const updateProblem = async (values: UpdateProblemFormValues, problemId: string) => {
  // Validar los campos de entrada
  const validatedFields = UpdateProblemSchema.safeParse(values)

  // Verificar si la validación es exitosa
  if (!validatedFields.success) {
    return {error: "Algo salio mal!"}
  }

  // Verificar si se proporcionó el ID de la problema
  if (!problemId) return {error: "Algo salio mal!"}

  // Extraer los campos validados
  const {description, title, tagNames} = validatedFields.data

  if (!title || !description) return {error: "Los campos title y description son requeridos!"}

  try {
    //verificar la localizacion ya existe sino crearla

    const tag = await db.tag.findMany({
      where: {
        name: {
          in: tagNames?.map((tag) => tag.name),
        },
      },
    })

    // Actualizar la problema en la base de datos
    await db.problem.update({
      where: {
        id: problemId,
      },
      data: {
        description,
        title,
        tags: {
          createMany: {
            data: tag.map((tag) => {
              return {
                tagId: tag.id,
              }
            }),
            skipDuplicates: true,
          },
        },
      },
    })

    // Devolver un mensaje de éxito
    return {success: "problema actualizada correctamente!"}
  } catch (error) {
    return {error: "Se produjo un error al actualizar la problema"}
  } finally {
    revalidatePath(`/problem/${problemId}`)
  }
}
