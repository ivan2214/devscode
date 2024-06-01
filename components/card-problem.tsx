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
    <Card className="relative overflow-hidden transition hover:shadow-2xl">
      <Link href={`/problem/${problem.id}`}>
        <CardHeader className="mt-3">
          <CardTitle>{problem.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-5">
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
          <CardDescription className="max-w-[90%] truncate">{problem.description}</CardDescription>
        </CardContent>
        <CardFooter className="flex w-full flex-col items-start justify-between gap-y-3">
          <section className="flex w-full flex-wrap items-center gap-2">
            <Badge variant="outline">Vistas: {problem.views}</Badge>
            <Badge variant="outline">Likes: {problem.likes}</Badge>
            <Badge variant="outline">Comentarios: {problem.comments.length}</Badge>
          </section>
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
            <Button size="sm" variant="outline">
              Responder
            </Button>
          </div>
        </CardFooter>
      </Link>
      <Icon className="absolute left-2 top-2 h-4 w-4" name="code" />
      <Badge
        className={cn(
          "absolute right-2 top-2",
          problem.status === "solved"
            ? "bg-green-500"
            : problem.status === "open"
              ? "bg-yellow-500"
              : "bg-red-500",
        )}
      >
        {problem.status}
      </Badge>
    </Card>
  )
}
