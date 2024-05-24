import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {type CommentExtend} from "@/data/problem/get-problems"

import {ButtonActionsComments} from "./button-actions-comments"
import {ButtonCommentDelete} from "./button-comment-delete"

interface CommentProps {
  comment: CommentExtend
  isAuthorComment?: boolean
  isAuthorProblem?: boolean
}

export const Comment: React.FC<CommentProps> = ({comment, isAuthorComment, isAuthorProblem}) => {
  const isAnonymous = comment?.anonymous

  const avatarImage = isAnonymous
    ? "https://github.com/shadcn.png"
    : comment?.author?.image ?? "https://github.com/shadcn.png"

  const avatarName = isAnonymous
    ? "Anónimo"
    : comment?.author?.username || comment?.author?.name || "Anónimo"

  const permitedDelete = Boolean(isAuthorComment) || Boolean(isAuthorProblem)

  return (
    <div className="flex gap-4">
      <Avatar className="h-10 w-10 border">
        <AvatarImage alt="@shadcn" src={avatarImage} />
        <AvatarFallback>{avatarName[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-2">
        <div className="flex items-center justify-between">
          <div className="font-medium">{avatarName} </div>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{comment.content}</p>
      </div>
      {permitedDelete ? <ButtonCommentDelete commentId={comment.id} /> : null}
      <ButtonActionsComments comment={comment} />
    </div>
  )
}
