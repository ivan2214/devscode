import {
  type Comment,
  type User,
  type Prisma,
  type Tag,
  type Status,
  type Problem,
  type TagsOnProblem,
} from "@prisma/client"

import {db} from "@/lib/db"

export interface QueryProps {
  tags?: string
  keyword?: string
  sortBy?: "date" | "priority" | "votes"
  sortOrder?: "asc" | "desc"
  status?: Status
}

export interface CommentExtends extends Comment {
  author?: User | null
}

export interface TagsOnProblemExtends extends TagsOnProblem {
  tag: Tag
  problem?: Problem | null
}

export interface ProblemExtends extends Problem {
  user?: User | null
  comments: CommentExtends[]

  tags: TagsOnProblemExtends[]
}

export const getFilteredProblems = async (
  query?: QueryProps,
): Promise<{problems: ProblemExtends[] | []}> => {
  try {
    const {tags, keyword, sortBy, sortOrder, status} = query ?? {}

    const where: Prisma.ProblemFindManyArgs["where"] = {}

    // Función para normalizar una cadena de texto (convertir a minúsculas y eliminar acentos)
    const normalizeString = (str: string): string => {
      return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
    }

    // Parsea las categorías normalizando cada una
    const parseTags = (tags?: string): string[] => {
      if (!tags) {
        return []
      }

      return tags
        .split(",")
        .map((category) => normalizeString(category.trim()))
        .filter((category) => !!category)
    }

    if (tags) {
      const normalizedTags = parseTags(tags)

      where.tags = {
        some: {
          tag: {
            name: {
              mode: "insensitive",
              in: normalizedTags,
            },
          },
        },
      }
    }

    if (status) {
      where.status = {
        equals: status,
      }
    }

    const orderBy = getOrderBy(sortBy, sortOrder) // Función para obtener el orden según el criterio y la dirección

    const problems = await db.problem.findMany({
      where: {
        AND: [
          where,
          {
            OR: [{title: {contains: keyword ?? ""}}, {description: {contains: keyword ?? ""}}],
          },
        ],
      },
      include: {
        user: true,
        tags: {
          include: {
            tag: true,
          },
        },
        comments: {
          include: {
            author: true,
          },
        },
      },
      orderBy,
    })

    return {problems}
  } catch (error) {
    return {problems: []}
  }
}

const getOrderBy = (sortBy?: "date" | "priority" | "votes", sortOrder?: "asc" | "desc") => {
  const order = sortOrder ?? "desc" // Si no se especifica sortOrder, el valor por defecto es "desc"

  switch (sortBy) {
    case "date":
      return {createdAt: order} // Ordenar por fecha de creación en la dirección especificada
    case "priority":
      return {priority: order} // Ordenar por prioridad en la dirección especificada, y luego por fecha de creación
    case "votes":
      return {votes: {_count: order}} // Ordenar por cantidad de votos en la dirección especificada, y luego por fecha de creación
    default:
      return {createdAt: order} // Si no se especifica un criterio de ordenamiento, ordenar por fecha de creación en la dirección especificada
  }
}
