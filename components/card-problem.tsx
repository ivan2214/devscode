import Link from "next/link"

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@ui/card"
import {Separator} from "@ui/separator"
import {Badge} from "@ui/badge"
import {Button} from "@ui/button"
import Icon from "@ui/icon"
import {Avatar, AvatarFallback, AvatarImage} from "@ui/avatar"
import {type ProblemExtends} from "@/data/problem/get-filtered-problems"
import {cn} from "@/lib/utils"

import {TagIcon, TagIcons} from "./ui/tag-icon"

interface CardProblemProps {
  problem: ProblemExtends
}

export const CardProblem: React.FC<CardProblemProps> = ({problem}) => {
  return (
    <Card className="overflow-hidden transition hover:shadow-2xl">
      <Link href={`/problem/${problem.id}`}>
        <CardHeader className="flex w-full flex-col items-start gap-y-5">
          <div className="flex w-full items-center space-x-2">
            <Icon className="h-4 w-4" name="code" />
            <CardTitle>{problem.title}</CardTitle>
          </div>
          <section className="flex w-full flex-wrap items-center gap-2">
            {problem.tags.map((tags) => {
              const tag = tags.tag
              const isValidTagIcon = tag.name in TagIcons

              return (
                <Badge
                  key={tag.name}
                  className="flex items-center gap-x-2 uppercase"
                  variant="outline"
                >
                  {isValidTagIcon ? (
                    <TagIcon className="h-5 w-5" name={tag.name} />
                  ) : (
                    <Icon className="h-5 w-5" name="tag" />
                  )}
                  {tag.name}
                </Badge>
              )
            })}
          </section>
          <section className="flex w-full flex-wrap items-center gap-2">
            <Badge>Vistas: {problem.views}</Badge>
            <Badge>Likes: {problem.likes}</Badge>
            <Badge>Comentarios: {problem.comments.length}</Badge>
            <Badge
              className={cn(
                problem.status === "solved"
                  ? "bg-green-500"
                  : problem.status === "open"
                    ? "bg-yellow-500"
                    : "bg-red-500",
              )}
            >
              {problem.status}
            </Badge>
          </section>
        </CardHeader>
        <CardContent>
          <CardDescription className="truncate">{problem.description}</CardDescription>
        </CardContent>
        <CardFooter className="flex w-full flex-col items-start gap-y-3">
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <Avatar>
              <AvatarImage
                alt={problem.user?.name}
                src={problem.user?.image ?? "https://github.com/shadcn.png"}
              />
              <AvatarFallback>{problem.user?.name[0]}</AvatarFallback>
            </Avatar>
            <span>{problem.user?.name}</span>
          </div>
          <Separator orientation="horizontal" />
          <div className="flex w-full items-center justify-between">
            <span className="text-sm font-extralight">
              creado el {problem.createdAt.toLocaleDateString()}A las {problem.createdAt.getHours()}
              :{problem.createdAt.getMinutes()}{" "}
            </span>
            <Button size="sm">Responder</Button>
          </div>
        </CardFooter>
      </Link>
    </Card>
  )
}
