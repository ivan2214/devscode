"use client"

import type * as z from "zod"

import {ThumbsDownIcon, ThumbsUpIcon} from "lucide-react"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {useTransition} from "react"
import {toast} from "sonner"

import {Button} from "@/components/ui/button"
import {CommentActionSchema} from "@/schemas"
import {actionsComment} from "@/actions/comment/actions-comment"
import {type CommentExtends} from "@/data/problem/get-filtered-problems"

interface ButtonActionsCommentsProps {
  comment?: CommentExtends
}

export type CommentActionFormValues = z.infer<typeof CommentActionSchema>

export const ButtonActionsComments: React.FC<ButtonActionsCommentsProps> = ({comment}) => {
  const [isPending, startTransition] = useTransition()
  const form = useForm<CommentActionFormValues>({
    resolver: zodResolver(CommentActionSchema),
    defaultValues: {
      commentId: comment?.id,
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
        <ThumbsUpIcon className="h-4 w-4" />
        <span className="sr-only">Like</span>
        {comment && comment?.likes >= 0 ? comment?.likes : null}
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
        <ThumbsDownIcon className="h-4 w-4" />
        <span className="sr-only">Dislike</span>
        {comment && comment?.dislikes >= 0 ? comment?.dislikes : null}
      </Button>
    </section>
  )
}
