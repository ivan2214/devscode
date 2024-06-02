import {Avatar, AvatarFallback, AvatarImage} from "@ui/avatar"
import {type ReplyExtends, type CommentExtends} from "@/types"
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip"

import {ButtonCommentDelete} from "./button-comment-delete"
import {ButtonActionsComments} from "./button-actions-comments"

interface GetAvatarImageProp {
  isAnonymous?: boolean
  isReply?: boolean
  comment?: CommentExtends
  reply?: ReplyExtends
}
interface GetAvatarNameProp {
  isAnonymous?: boolean
  isReply?: boolean
  comment?: CommentExtends
  reply?: ReplyExtends
}

export const getAvatarImage = ({
  isAnonymous,
  isReply,
  comment,
  reply,
}: GetAvatarImageProp): string => {
  if (isAnonymous) {
    return "https://github.com/shadcn.png"
  }

  if (isReply && reply?.userReply?.image) {
    return reply?.userReply?.image
  }

  if (!isReply && comment?.author?.image) {
    return comment?.author?.image
  }

  return "https://github.com/shadcn.png"
}

export const getAvatarName = ({
  isAnonymous,
  isReply,
  comment,
  reply,
}: GetAvatarNameProp): string => {
  if (isAnonymous) {
    return "Anónimo"
  }

  if (isReply && reply?.userReply?.name) {
    return reply?.userReply?.name
  }

  if (!isReply && comment?.author?.name) {
    return comment?.author?.name
  }

  return "Anónimo"
}

export const getContent = ({
  isReply,
  comment,
  reply,
}: {
  isReply?: boolean
  comment?: CommentExtends
  reply?: ReplyExtends
}) => {
  if (isReply) {
    return reply?.content
  }

  return comment?.content
}

interface CommentItemProps {
  isReply?: boolean
  comment?: CommentExtends
  reply?: ReplyExtends
  isAuthorComment?: boolean
  isAuthorProblem?: boolean
  isAnonymous?: boolean
}

export const CommentItem: React.FC<CommentItemProps> = ({
  isReply,
  comment,
  reply,
  isAnonymous,
  isAuthorComment,
  isAuthorProblem,
}) => {
  const permitedDelete = Boolean(isAuthorComment) || Boolean(isAuthorProblem)

  const avatarName = getAvatarName({isAnonymous, isReply, comment, reply})

  const avatarImage = getAvatarImage({
    isAnonymous,
    isReply,
    comment,
    reply,
  })

  const content = getContent({isReply, comment, reply})

  return (
    <div className="flex gap-4">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Avatar>
              <AvatarImage src={avatarImage} />
              <AvatarFallback>{avatarName[0]}</AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent className="border shadow-xl">
            <article className="flex items-start gap-2">
              <Avatar>
                <AvatarImage src={avatarImage} />
                <AvatarFallback>{avatarName[0]}</AvatarFallback>
              </Avatar>
              <section className="flex flex-col items-start gap-y-2">
                <div className="flex items-center gap-x-2">
                  <span className="text-sm font-bold">Username:</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{avatarName}</span>
                </div>
                <div className="flex items-center gap-x-2">
                  <span className="text-sm font-bold">Email:</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {comment?.author?.email || reply?.userReply?.email || "Anónimo"}
                  </span>
                </div>
                <div className="flex items-center gap-x-2">
                  <span className="text-sm font-bold">Problemas resueltos:</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {comment?.author?._count?.problemsResolved ||
                      reply?.userReply?._count?.problemsResolved ||
                      0}
                  </span>
                </div>
              </section>
            </article>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {/*   <Avatar className="h-10 w-10 border">
        <AvatarImage alt="@shadcn" src={avatarImage} />
        <AvatarFallback>{avatarName[0]}</AvatarFallback>
      </Avatar> */}
      <div className="flex-1 space-y-2">
        <div className="flex items-center justify-between">
          <div className="font-medium">{avatarName} </div>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{content}</p>
      </div>
      {permitedDelete ? (
        <ButtonCommentDelete commentId={comment?.id} problemId={comment?.problemId} />
      ) : null}
      <ButtonActionsComments comment={comment} isReply={isReply} reply={reply} />
    </div>
  )
}
