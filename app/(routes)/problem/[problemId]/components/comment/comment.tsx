import {type CommentExtends} from "@/data/problem/get-filtered-problems"
import {ScrollArea} from "@/components/ui/scroll-area"

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

      <ScrollArea className="ml-10 h-72 rounded-md border border-gray-200 p-4">
        {comment.reply?.length
          ? comment.reply.map((reply) => {
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
            })
          : null}
      </ScrollArea>
    </section>
  )
}
