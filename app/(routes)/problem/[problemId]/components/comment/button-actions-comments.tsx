"use client"

import type * as z from "zod"

import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {useTransition} from "react"
import {toast} from "sonner"

import Icon from "@components/ui/icon"
import {Button} from "@ui/button"
import {CommentActionSchema} from "@/schemas"
import {actionsComment} from "@/actions/comment/actions-comment"
import {type ReplyExtends, type CommentExtends} from "@/types"

interface ButtonActionsCommentsProps {
  comment?: CommentExtends
  isReply?: boolean
  reply?: ReplyExtends
}

export type CommentActionFormValues = z.infer<typeof CommentActionSchema>

interface GetLikesProps {
  comment?: CommentExtends
  reply?: ReplyExtends
  isReply?: boolean
}

export const getLikes = ({comment, isReply, reply}: GetLikesProps) => {
  if (isReply) {
    return reply?.likes
  }

  return comment?.likes
}

export const getDislikes = ({comment, isReply, reply}: GetLikesProps) => {
  if (isReply) {
    return reply?.dislikes
  }

  return comment?.dislikes
}

export const ButtonActionsComments: React.FC<ButtonActionsCommentsProps> = ({
  comment,
  isReply,
  reply,
}) => {
  const [isPending, startTransition] = useTransition()
  const form = useForm<CommentActionFormValues>({
    resolver: zodResolver(CommentActionSchema),
    defaultValues: {
      commentId: comment?.id,
      replyId: reply?.id,
      isReply: Boolean(isReply),
      problemId: comment?.problemId || undefined,
    },
  })

  const onSubmit = (values: CommentActionFormValues) => {
    startTransition(() => {
      actionsComment(values).then((res) => {
        if (res?.error) {
          toast("Error", {
            description: res?.error,
          })
        }
      })
    })
  }

  return (
    <section className="flex gap-2">
      <Button
        className="flex gap-x-2 transition duration-300 hover:bg-secondary-foreground/50 hover:text-primary-foreground"
        disabled={isPending}
        size="icon"
        type="button"
        variant="ghost"
        onClick={() => {
          form.setValue("action", "like")

          onSubmit(form.getValues())
        }}
      >
        <Icon className="h-4 w-4" name="thumbs-up" />
        <span className="sr-only">Like</span>
        {getLikes({comment, isReply, reply})}
      </Button>

      <Button
        className="flex gap-x-2 transition duration-300 hover:bg-secondary-foreground/50 hover:text-primary-foreground"
        disabled={isPending}
        size="icon"
        type="button"
        variant="ghost"
        onClick={() => {
          form.setValue("action", "unlike")

          onSubmit(form.getValues())
        }}
      >
        <Icon className="h-4 w-4" name="thumbs-down" />
        <span className="sr-only">Dislike</span>
        {getDislikes({comment, isReply, reply})}
      </Button>
    </section>
  )
}
