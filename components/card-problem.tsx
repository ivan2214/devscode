import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {Separator} from "@/components/ui/separator"
import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import {type ProblemExtended} from "@/data/problem/get-problems"

interface CardProblemProps {
  problem: ProblemExtended
}

export const CardProblem: React.FC<CardProblemProps> = ({problem}) => {
  return (
    <Card key={problem.id}>
      <CardHeader className="flex w-full flex-row items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon className="h-6 w-6 text-gray-500 dark:text-gray-400" name="code" />
          <CardTitle>{problem.title}</CardTitle>
        </div>
        <div className="flex items-center gap-x-2">
          {problem.tags.map((tag) => (
            <Badge key={tag.id}>{tag.name}</Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>{problem.description}</CardDescription>
      </CardContent>
      <CardFooter>
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <Icon className="h-4 w-4" name="user" />
          <span>{problem.user?.name}</span>
          <Separator orientation="vertical" />
          <span>
            A las {problem.createdAt.getHours()}:{problem.createdAt.getMinutes()}{" "}
          </span>
        </div>
        <Button size="sm" variant="ghost">
          Responder
        </Button>
      </CardFooter>
    </Card>
  )
}
