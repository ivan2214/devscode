import React from "react"

import {Badge} from "@/components/ui/badge"
import Icon from "@/components/ui/icon"
import {Avatar, AvatarFallback, AvatarImage} from "@ui/avatar"
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@ui/tooltip"
import {type ProblemExtends} from "@/types"

interface ProblemDetailsProps {
  problem: ProblemExtends
  creatorName: (user?: ProblemExtends["user"] | null) => string
}

const ProblemDetails: React.FC<ProblemDetailsProps> = ({problem, creatorName}) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-gray-500 dark:text-gray-400" name="tag" />
          <span className="text-sm font-medium">Categorías:</span>
          {problem.tags?.map((tags) => <Badge key={tags.tag.id}>{tags.tag.name}</Badge>)}
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
        {problem?.ProblemsResolved?.length ? (
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
                        <AvatarFallback>{creatorName(problemResolved.resolver)}</AvatarFallback>
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
          <span className="text-sm font-medium">Última actualización:</span>
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
  )
}

export default ProblemDetails
