import {ScrollArea} from "@ui/scroll-area"
import {type CommentExtends} from "@/types"

import {CommentItem} from "./comment-item"

interface CommentProps {
  comment: CommentExtends
  isAuthorComment?: boolean
  isAuthorProblem?: boolean
}

export const Comment: React.FC<CommentProps> = ({comment, isAuthorComment, isAuthorProblem}) => {
  const isAnonymousComment = comment?.anonymous

  return (
    <section className="flex flex-col gap-y-4">
      <CommentItem
        comment={comment}
        isAnonymous={isAnonymousComment}
        isAuthorComment={isAuthorComment}
        isAuthorProblem={isAuthorProblem}
        isReply={false}
      />

      {comment.reply?.length ? (
        <ScrollArea className="ml-10 h-40 max-h-fit rounded-md border border-gray-200 p-4">
          {comment.reply.map((reply) => {
            const isAnonymousReply = reply?.anonymous

            return (
              <CommentItem
                key={reply.id}
                isReply
                isAnonymous={isAnonymousReply}
                isAuthorComment={isAuthorComment}
                isAuthorProblem={isAuthorProblem}
                reply={reply}
              />
            )
          })}
        </ScrollArea>
      ) : null}
    </section>
  )
}
