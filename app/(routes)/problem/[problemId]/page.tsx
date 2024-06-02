import {PrismLight as SyntaxHighlighter} from "react-syntax-highlighter"
import {vscDarkPlus} from "react-syntax-highlighter/dist/esm/styles/prism"
import hljs from "highlight.js"

import {generateMetadata as generateMetadataFunction} from "@/utils/problem/metadata"
import {generateStaticParams as generateStaticParamsFunction} from "@/utils/problem/params"
import {auth} from "auth"
import {type CreateProblemFormValues} from "@components/problem/problem-form"
import {getProblem} from "@/data/problem/get-problem"
import {type ProblemExtends} from "@/types"
import ProblemDetails from "@/app/(routes)/problem/[problemId]/components/problem-details"
import ProblemComments from "@/app/(routes)/problem/[problemId]/components/problem-comments"
import ProblemActions from "@/app/(routes)/problem/[problemId]/components/problem-actions"

interface ProblemPageProps {
  params: {problemId: string}
}

export async function generateStaticParams({params: {problemId}}: {params: {problemId: string}}) {
  return generateStaticParamsFunction({params: {problemId}})
}

export const generateMetadata = generateMetadataFunction

const ProblemPage: React.FC<ProblemPageProps> = async ({params}) => {
  const session = await auth()
  const userId = session?.user?.id
  const {problemId} = params

  if (!problemId) {
    return <div>Problem not found</div>
  }

  const {problem} = await getProblem(problemId)

  if (!problem) {
    return <div>Problem not found</div>
  }

  const isAuthorProblem = userId === problem.user?.id

  const values: CreateProblemFormValues = {
    userId: problem.user?.id || "",
    code: problem.code || "",
    description: problem.description,
    title: problem.title,
    tagNames: problem.tags?.map((tags) => ({
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
              Reportado por {creatorName(problem.user)} el{" "}
              {new Date(problem.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="prose prose-gray dark:prose-invert">
            <p className="space-y-4 text-gray-500 dark:text-gray-400">{problem.description}</p>
          </div>

          <ProblemDetails creatorName={creatorName} problem={problem} />

          {/* Codigo */}
          {problem.code ? (
            <div className="prose relative h-fit max-h-64 w-full flex-grow resize-none overflow-y-auto rounded">
              <div className="absolute right-0 top-0 rounded rounded-t-sm bg-gray-800 px-2 py-1 text-xs text-gray-500">
                Detected Language: {detectLanguage(problem.code)}
              </div>
              <SyntaxHighlighter
                customStyle={{borderRadius: "0.25rem"}}
                language={detectLanguage(problem.code)}
                style={vscDarkPlus}
              >
                {problem.code}
              </SyntaxHighlighter>
            </div>
          ) : null}

          <ProblemComments isAuthorProblem={isAuthorProblem} problem={problem} />

          <ProblemActions
            isAuthorProblem={isAuthorProblem}
            problemId={problem.id}
            problemStatus={problem.status}
            values={values}
          />
        </div>
      </div>
    </main>
  )
}

export default ProblemPage
