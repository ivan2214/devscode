"use client"

import {toast} from "sonner"
import {useTransition} from "react"

import {Button} from "@ui/button"
import {deleteComment} from "@/actions/comment/delete-comment"
import Icon from "@/components/ui/icon"

interface ButtonCommentDeleteProps {
  commentId?: string
  problemId?: string
}

export const ButtonCommentDelete: React.FC<ButtonCommentDeleteProps> = ({commentId, problemId}) => {
  const [isPending, startTransition] = useTransition()
  const onClick = () => {
    startTransition(() => {
      if (problemId) {
        deleteComment(commentId, problemId).then((res) => {
          if (res?.error) {
            toast("Error", {
              description: res?.error,
            })
          }

          if (res?.success) {
            toast("Comentario eliminado", {
              description: res?.success,
            })
          }
        })
      }
    })
  }

  return (
    <Button disabled={isPending} size="icon" type="button" variant="ghost" onClick={onClick}>
      <Icon className="h-4 w-4 text-destructive" name="trash" />
    </Button>
  )
}
