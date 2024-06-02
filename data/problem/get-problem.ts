import {db} from "@/lib/db"
import {type ProblemExtends} from "@/types"

export const getProblem = async (problemId: string): Promise<{problem: ProblemExtends | null}> => {
  if (!problemId) return {problem: null}

  try {
    const problem = await db.problem.findUnique({
      where: {
        id: problemId,
      },
      include: {
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
        tags: {
          include: {
            tag: true,
          },
        },
        user: {
          include: {
            _count: {
              select: {
                problemsResolved: true,
              },
            },
          },
        },
        ProblemsResolved: {
          include: {
            resolver: {
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
    })

    return {
      problem: problem,
    }
  } catch (error) {
    return {
      problem: null,
    }
  }
}
