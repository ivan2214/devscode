import {auth} from "auth"
import {type ProblemExtends} from "@/types"

import {Comment} from "./comment"
import {CommentForm} from "./comment-form"

interface CommentsProps {
  problem: ProblemExtends
  isAuthorProblem?: boolean
}

export const Comments: React.FC<CommentsProps> = async ({problem, isAuthorProblem}) => {
  const session = await auth()
  const userId = session?.user?.id

  return (
    <div className="space-y-4">
      <CommentForm problemId={problem?.id} />
      {/* List of comments */}
      {problem?.comments && problem?.comments?.length > 0 ? (
        <div className="space-y-4">
          {problem?.comments?.map((comment) => (
            <Comment
              key={comment?.id}
              comment={comment}
              isAuthorComment={comment?.authorId === userId}
              isAuthorProblem={isAuthorProblem}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}
