import {type Reply, type Comment, type Problem, type Tag, type User} from "@prisma/client"

import {db} from "@/lib/db"

export interface ProblemExtended extends Problem {
  tags: Tag[]
  user: User | null
  comments: CommentExtend[]
}

export interface CommentExtend extends Comment {
  author: User | null
  reply: Reply[]
}

export async function getProblems(): Promise<{problems: ProblemExtended[]}> {
  try {
    const problems = await db.problem.findMany({
      include: {
        tags: true,
        user: true,
        comments: {
          include: {
            author: true,
            reply: true,
          },
        },
      },
    })

    return {
      problems,
    }
  } catch (error) {
    return {
      problems: [],
    }
  }
}
