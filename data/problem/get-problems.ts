import {type Problem, type Tag, type User} from "@prisma/client"

import {db} from "@/lib/db"

export interface ProblemExtended extends Problem {
  tags: Tag[]
  user: User | null
}

export async function getProblems(): Promise<{problems: ProblemExtended[]}> {
  try {
    const problems = await db.problem.findMany({
      include: {
        tags: true,
        user: true,
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
