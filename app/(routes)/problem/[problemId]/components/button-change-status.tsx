"use client"

import type * as z from "zod"

import {useTransition} from "react"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {Status} from "@prisma/client"
import {toast} from "sonner"

import {ChangeStatusSchema} from "@/schemas"
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {changeStatus} from "@/actions/problem/change-status"

export type ChangeStatusFormValues = z.infer<typeof ChangeStatusSchema>

const statuses: Status[] = [Status.closed, Status.open, Status.solved, Status.unsolved]

interface ButtonChangeStatusProps {
  problemId: string
  values: ChangeStatusFormValues
}

export const ButtonChangeStatus: React.FC<ButtonChangeStatusProps> = ({problemId, values}) => {
  const [isPending, startTransition] = useTransition()

  const defaultValues: ChangeStatusFormValues = {
    problemId: problemId,
    status: values.status || "PENDING",
  }

  const form = useForm<ChangeStatusFormValues>({
    resolver: zodResolver(ChangeStatusSchema),
    defaultValues,
  })

  function onSubmit(data: ChangeStatusFormValues) {
    startTransition(() => {
      changeStatus(data).then((res) => {
        if (res?.error) {
          toast("Error", {
            description: res?.error,
          })
        }

        if (res?.success) {
          toast("Status cambiado", {
            description: res?.success,
          })
        }
      })
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="status"
          render={({field}) => (
            <FormItem>
              <Select
                defaultValue={field.value}
                onValueChange={(value: Status) => {
                  field.onChange(value)

                  form.handleSubmit(onSubmit)()
                }}
              >
                <FormControl>
                  <SelectTrigger className="h-9 rounded-md px-3">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {statuses.map((status) => {
                    return (
                      <SelectItem key={status} disabled={isPending} value={status}>
                        {status}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
