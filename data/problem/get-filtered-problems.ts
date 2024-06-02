import {type Prisma} from "@prisma/client"

import {db} from "@/lib/db"
import {type QueryProps, type ProblemExtends, type SortByOptions} from "@/types"

export const getFilteredProblems = async (
  query?: QueryProps,
): Promise<{problems: ProblemExtends[] | []}> => {
  try {
    const {tags, keyword, sortBy, sortByType, status, take, skip} = query ?? {}

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

    const orderBy = getOrderBy(sortBy, sortByType) // Función para obtener el orden según el criterio y la dirección

    const problems = await db.problem.findMany({
      where: {
        AND: [
          where,
          {
            OR: [
              {title: {contains: keyword ?? ""}},
              {description: {contains: keyword ?? ""}},
              {
                tags: {some: {tag: {name: {contains: keyword ?? ""}}}},
              },
            ],
          },
        ],
      },
      include: {
        user: {
          include: {
            _count: {
              select: {
                problemsResolved: true,
              },
            },
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
        comments: {
          include: {
            author: {
              include: {
                _count: {
                  select: {
                    problemsResolved: true,
                  },
                },
              },
            },
            reply: {
              include: {
                userReply: {
                  include: {
                    _count: {
                      select: {
                        problemsResolved: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      orderBy,
      take: take ? Number(take) : undefined,
      skip: skip ? Number(skip) : undefined,
    })

    return {problems}
  } catch (error) {
    return {problems: []}
  }
}

const getOrderBy = (
  sortBy?: SortByOptions,
  sortByType?: QueryProps["sortByType"],
): Prisma.ProblemOrderByWithRelationInput => {
  switch (sortBy) {
    case "date":
      return {
        createdAt: sortByType,
      }
    case "likes":
      return {
        likes: sortByType,
      }
    case "dislikes":
      return {
        dislikes: sortByType,
      }
    case "title":
      return {
        title: sortByType,
      }
    case "views":
      return {
        views: sortByType,
      }
    case "comments":
      return {
        comments: {
          _count: sortByType,
        },
      }
    case "ProblemsResolved":
      return {
        ProblemsResolved: {
          _count: sortByType,
        },
      }
    default:
      return {
        createdAt: "desc",
      }
  }
}
