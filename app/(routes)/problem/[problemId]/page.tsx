import Link from "next/link"
import {ClockIcon, FlagIcon, MailIcon, ShareIcon, TagIcon, UserIcon} from "lucide-react"
import {PrismLight as SyntaxHighlighter} from "react-syntax-highlighter"
import {vscDarkPlus} from "react-syntax-highlighter/dist/esm/styles/prism"
import hljs from "highlight.js"

import {auth} from "auth"
import {Button} from "@/components/ui/button"
import {db} from "@/lib/db"
import {type CreateProblemFormValues} from "@/components/problem/problem-form"
import {type ProblemExtends} from "@/data/problem/get-filtered-problems"

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
          author: true,
          reply: {
            include: {
              userReply: true,
            },
          },
        },
        orderBy: {
          likes: "desc",
        },
      },
      tags: {
        include: {
          tag: true,
        },
      },
      user: true,
    },
  })

  if (!problem) {
    return <div>Problem not found</div>
  }

  const isAuthorProblem = userId === problem.user?.id

  const values: CreateProblemFormValues = {
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
                <TagIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="text-sm font-medium">Categorías:</span>
                {problem.tags.map((tags) => (
                  <span key={tags.tag.id} className="text-sm text-gray-500 dark:text-gray-400">
                    {tags.tag.name}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <UserIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="text-sm font-medium">Creado por:</span>
                <Link className="text-sm text-blue-600 hover:underline dark:text-blue-400" href="#">
                  {creatorName(problem.user)}
                </Link>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <ClockIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="text-sm font-medium">Creado:</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(problem.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="text-sm font-medium">Ultima actualización:</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(problem.updatedAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FlagIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
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
                <ShareIcon className="h-4 w-4" />
                Share
              </Button>
              <Button className="flex items-center gap-x-2" size="sm" variant="outline">
                <MailIcon className="h-4 w-4" />
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
