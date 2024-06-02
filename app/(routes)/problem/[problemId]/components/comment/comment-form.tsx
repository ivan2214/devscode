"use client"

import type * as z from "zod"

import {useState, useTransition} from "react"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {toast} from "sonner"
import {Icon} from "lucide-react"

import {Button} from "@ui/button"
import {Form, FormControl, FormField, FormItem, FormMessage} from "@ui/form"
import {Input} from "@ui/input"
import {CreateCommentSchema} from "@/schemas"
import {createComment} from "@/actions/comment/create-comment"

interface CommentFormProps {
  problemId: string
}

export type CreateCommentFormValues = z.infer<typeof CreateCommentSchema>

export const CommentForm: React.FC<CommentFormProps> = ({problemId}) => {
  const [addComment, setAddComment] = useState(false)
  const [isPending, startTransition] = useTransition()

  const defaultValues: CreateCommentFormValues = {
    content: "",
    problemId,
  }

  const form = useForm<CreateCommentFormValues>({
    resolver: zodResolver(CreateCommentSchema),
    defaultValues,
  })

  const onSubmit = (values: CreateCommentFormValues) => {
    startTransition(() => {
      createComment(values)
        .then((res) => {
          if (res.error) {
            toast("Error", {
              description: res.error,
            })
          }

          if (res.succes) {
            toast("Comentario creado", {
              description: res.succes,
            })
          }
        })
        .finally(() => {
          setAddComment(false)
          form.reset()
        })
    })
  }

  return (
    <div className="flex flex-col items-center gap-y-5">
      <div className="flex w-full items-center justify-between">
        <h2 className="text-xl font-bold">Comentarios</h2>
        <Button
          size="sm"
          variant="outline"
          onClick={() => startTransition(() => setAddComment(!addComment))}
        >
          <Icon className="h-4 w-4" name="plus" />
          Añadir comentario
        </Button>
      </div>
      {addComment ? (
        <Form {...form}>
          <form
            className="flex w-full justify-between gap-x-5"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="content"
              render={({field}) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      className="w-full"
                      placeholder="Escribe tu comentario"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isPending} type="submit">
              <Icon className="h-4 w-4" name="plus" />
              Enviar
            </Button>
          </form>
        </Form>
      ) : null}
    </div>
  )
}
