import {
  type Comment,
  type User,
  type Prisma,
  type Tag,
  type Status,
  type Problem,
  type TagsOnProblem,
  type Reply,
} from "@prisma/client"

import {db} from "@/lib/db"

export type SortByOptions =
  | "date"
  | "likes"
  | "dislikes"
  | "title"
  | "views"
  | "comments"
  | "ProblemsResolved"

export interface QueryProps {
  tags?: string
  keyword?: string
  sortBy?: SortByOptions
  sortByType?: "desc" | "asc"
  status?: Status
  take?: string
  skip?: string
}

export interface UserExtends extends User {
  _count: {
    problemsResolved: number
  }
}

export interface CommentExtends extends Comment {
  author?: UserExtends | null
  reply?: ReplyExtends[] | null
}

export interface ReplyExtends extends Reply {
  userReply?: UserExtends | null
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
        user: true,
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
