import {PrismLight as SyntaxHighlighter} from "react-syntax-highlighter"
import {vscDarkPlus} from "react-syntax-highlighter/dist/esm/styles/prism"
import hljs from "highlight.js"

import {Button} from "@ui/button"
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@ui/tooltip"
import {Avatar, AvatarFallback, AvatarImage} from "@ui/avatar"
import {auth} from "auth"
import {db} from "@/lib/db"
import {type CreateProblemFormValues} from "@components/problem/problem-form"
import {type ProblemExtends} from "@/data/problem/get-filtered-problems"
import {Badge} from "@/components/ui/badge"
import Icon from "@/components/ui/icon"

import {ButtonOpenModalEdit} from "./components/button-open-modal-edit"
import {ButtonChangeStatus} from "./components/button-change-status"
import {ButtonDeleteProblem} from "./components/button-delete-problem"
import {Comments} from "./components/comment/comments"

interface ProblemPageProps {
  params: {problemId: string}
}

/* export const dynamicParams = false */

export async function generateStaticParams({params: {prblemId}}: {params: {prblemId: string}}) {
  const problems = await db.problem.findMany({
    where: {
      id: prblemId,
    },
  })

  return problems.map((problem) => ({
    problem: problem.id,
  }))
}

const ProblemPage: React.FC<ProblemPageProps> = async ({params}) => {
  const session = await auth()
  const userId = session?.user?.id
  const {problemId} = params

  if (!problemId) {
    return <div>Problem not found</div>
  }

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

  if (!problem) {
    return <div>Problem not found</div>
  }

  const isAuthorProblem = userId === problem.user?.id

  const values: CreateProblemFormValues = {
    userId: problem.user?.id || "",
    code: problem.code || "",
    description: problem.description,
    title: problem.title,
    tagNames: problem.tags.map((tags) => ({
      name: tags.tag.name,
    })),
  }

  const creatorName = (user?: ProblemExtends["user"] | null) => {
    if (user) {
      return user.name || user.username || "Anónimo"
    }

    return "Anónimo"
  }

  const detectLanguage = (content: string): string => {
    const language = hljs.highlightAuto(content).language

    return language || "bash"
  }

  return (
    <main className="p-12">
      <div className="mx-auto max-w-4xl">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{problem.title}</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Repordado por {creatorName(problem.user)} el{" "}
              {new Date(problem.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="prose prose-gray dark:prose-invert">
            <p className="space-y-4 text-gray-500 dark:text-gray-400">{problem.description}</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Icon className="h-5 w-5 text-gray-500 dark:text-gray-400" name="tag" />
                <span className="text-sm font-medium">Categorías:</span>
                {problem.tags.map((tags) => (
                  <Badge key={tags.tag.id}>{tags.tag.name}</Badge>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <Icon className="h-5 w-5 text-gray-500 dark:text-gray-400" name="user" />
                <span className="text-sm font-medium">Creado por:</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <span className="text-sm text-blue-500 hover:underline">
                        {creatorName(problem.user)}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent className="border shadow-xl">
                      <article className="flex items-start gap-2">
                        <Avatar>
                          <AvatarImage src={problem.user?.image || ""} />
                          <AvatarFallback>{creatorName(problem.user)}</AvatarFallback>
                        </Avatar>
                        <section className="flex flex-col items-start gap-y-2">
                          <div className="flex items-center gap-x-2">
                            <span className="text-sm font-bold">Username:</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {problem.user?.username}
                            </span>
                          </div>
                          <div className="flex items-center gap-x-2">
                            <span className="text-sm font-bold">Email:</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {problem.user?.email}
                            </span>
                          </div>
                          <div className="flex items-center gap-x-2">
                            <span className="text-sm font-bold">Problemas resueltos:</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {problem.user?._count.problemsResolved.toString()}
                            </span>
                          </div>
                        </section>
                      </article>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              {problem.ProblemsResolved.length ? (
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5 text-gray-500 dark:text-gray-400" name="check" />
                  <span className="text-sm font-medium">Resuelto por:</span>
                  {problem.ProblemsResolved.map((problemResolved) => (
                    <TooltipProvider key={problemResolved.id}>
                      <Tooltip>
                        <TooltipTrigger>
                          <span className="text-sm text-blue-500 hover:underline">
                            {creatorName(problemResolved.resolver)}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent className="border shadow-xl">
                          <article className="flex items-start gap-2">
                            <Avatar>
                              <AvatarImage src={problemResolved.resolver?.image || ""} />
                              <AvatarFallback>
                                {creatorName(problemResolved.resolver)}
                              </AvatarFallback>
                            </Avatar>
                            <section className="flex flex-col items-start gap-y-2">
                              <div className="flex items-center gap-x-2">
                                <span className="text-sm font-bold">Username:</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                  {problemResolved.resolver?.username}
                                </span>
                              </div>
                              <div className="flex items-center gap-x-2">
                                <span className="text-sm font-bold">Email:</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                  {problemResolved.resolver?.email}
                                </span>
                              </div>
                              <div className="flex items-center gap-x-2">
                                <span className="text-sm font-bold">Problemas resueltos:</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                  {problemResolved.resolver?._count?.problemsResolved?.toString()}
                                </span>
                              </div>
                            </section>
                          </article>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              ) : null}
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Icon className="h-5 w-5 text-gray-500 dark:text-gray-400" name="calendar" />
                <span className="text-sm font-medium">Creado:</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(problem.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Icon className="h-5 w-5 text-gray-500 dark:text-gray-400" name="clock" />
                <span className="text-sm font-medium">Ultima actualización:</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(problem.updatedAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Icon className="h-5 w-5 text-gray-500 dark:text-gray-400" name="flag" />
                <span className="text-sm font-medium">Estado:</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{problem.status}</span>
              </div>
            </div>
          </div>

          {/* Codigo */}
          {problem.code ? (
            <div className="prose relative h-fit max-h-64 w-full flex-grow resize-none overflow-y-auto rounded">
              <div className="absolute right-0 top-0 rounded rounded-t-sm bg-gray-800 px-2 py-1 text-xs text-gray-500">
                Detected Language: {detectLanguage(problem.code)}
              </div>
              <SyntaxHighlighter
                customStyle={{
                  borderRadius: "0.25rem",
                }}
                language={detectLanguage(problem.code)}
                style={vscDarkPlus}
              >
                {problem.code}
              </SyntaxHighlighter>
            </div>
          ) : null}

          {/* Comments */}
          <Comments isAuthorProblem={isAuthorProblem} problem={problem} />

          {/* Actions */}
          <div className="flex justify-between gap-2">
            {isAuthorProblem ? (
              <div className="flex gap-2">
                <ButtonOpenModalEdit problemId={problem.id} values={values} />
                <ButtonChangeStatus
                  problemId={problem.id}
                  values={{
                    problemId: problem.id,
                    status: problem.status,
                  }}
                />

                <ButtonDeleteProblem problemId={problem.id} />
              </div>
            ) : null}
            <div className="flex gap-2">
              <Button className="flex items-center gap-x-2" size="sm" variant="outline">
                <Icon className="h-4 w-4" name="share" />
                Share
              </Button>
              <Button className="flex items-center gap-x-2" size="sm" variant="outline">
                <Icon className="h-4 w-4" name="mail" />
                Email
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ProblemPage
