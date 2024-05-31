"use client"

import {toast} from "sonner"
import {useRouter} from "next/navigation"
import {useEffect, useState, useTransition} from "react"
import {zodResolver} from "@hookform/resolvers/zod"
import {type z} from "zod"
import {useFieldArray, useForm} from "react-hook-form"
import {Loader, PlusIcon} from "lucide-react"
import {TrashIcon} from "@radix-ui/react-icons"

import {Button} from "@ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/form"
import {CreateProblemSchema, type UpdateProblemSchema} from "@/schemas"
import {useCreateProblemModal} from "@/store/use-create-problem-modal"
import {createProblem} from "@/actions/problem/create-problem"
import {updateProblem} from "@/actions/problem/update-problem"
import {Input} from "@ui/input"

import {Textarea} from "../ui/textarea"

import ProblemDetails from "./problem-details"

export type CreateProblemFormValues = z.infer<typeof CreateProblemSchema>

export type UpdateProblemFormValues = z.infer<typeof UpdateProblemSchema>

export const ProblemForm: React.FC = () => {
  const {close, data} = useCreateProblemModal()
  const [isPending, startTransition] = useTransition()
  const defaultValues: CreateProblemFormValues = {
    title: data?.values?.title ?? "",
    description: data?.values?.description ?? "",
    tagNames: data?.values?.tagNames ?? [],
    code: data?.values?.code ?? "",
  }

  const form = useForm<CreateProblemFormValues>({
    resolver: zodResolver(CreateProblemSchema),
    defaultValues,
    mode: "onChange",
  })
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)

  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({
    name: "tagNames",
    control: form.control,
  })

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (data?.values) {
      form.reset(data?.values)
    }
  }, [data?.values, form])

  if (!isClient) {
    return null
  }

  const onSubmit = (values: CreateProblemFormValues) => {
    startTransition(() => {
      if (!data?.problemId) {
        createProblem(values).then((res) => {
          if (res.error) {
            toast("Error", {
              description: "Error al crear el problema",
              action: {
                label: "Reintentar",
                onClick: () => {
                  onSubmit(values)
                },
              },
            })
          }

          if (res.success) {
            toast("Success", {
              description: "Problema creado correctamente",
            })
            close()
            router.refresh()
          }
        })
      } else if (data?.problemId && data.values) {
        updateProblem(values, data.problemId).then((res) => {
          if (res.error) {
            toast("Error", {
              description: res.error,
            })
          }
          if (res.success) {
            toast("Success", {
              description: "Problema actualizado correctamente",
              closeButton: true,
              position: "top-center",
            })
          }
        })
      }
    })
  }

  const tags = form.watch("tagNames") as {name: string}[]

  const buttonTitle = data?.problemId ? "Actualizar problema" : "Crear problema"
  const buttonLoadingTitle = data?.problemId ? "Actualizando problema" : "Creando problema"

  return (
    <Form {...form}>
      <form className="flex h-full w-full flex-col gap-y-5" onSubmit={form.handleSubmit(onSubmit)}>
        <section className="grid w-full grid-cols-1 gap-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="title"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Titulo</FormLabel>
                  <FormControl>
                    <Input placeholder="Titulo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none"
                      cols={1}
                      placeholder="Descripción"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Tags */}
          <section className="grid grid-cols-1 gap-6">
            <div className="flex flex-col items-start gap-5">
              <FormLabel>Tags</FormLabel>
              <FormDescription>
                Agrega etiquetas para que los usuarios puedan encontrar tu problema
              </FormDescription>
            </div>
            {tagFields.length ? (
              <div className="flex flex-wrap items-center gap-5">
                {tagFields.map((field, index) => (
                  <FormField
                    key={field.id}
                    control={form.control}
                    name={`tagNames.${index}.name`}
                    render={({field}) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex max-w-fit items-center gap-2">
                            <Input {...field} />
                            <Button
                              disabled={isPending}
                              size="icon"
                              type="button"
                              variant="destructive"
                              onClick={() => removeTag(index)}
                            >
                              <TrashIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            ) : null}
          </section>
          <div>
            <Button
              className="mt-2"
              disabled={isPending || tags.map((tag) => tag.name).includes("")}
              type="button"
              variant="outline"
              onClick={() => appendTag({name: ""})}
            >
              <PlusIcon className="mr-2 h-4 w-4" /> Añadir tag
            </Button>
          </div>
          {/* fin Tags */}
        </section>
        {/* Code */}
        <section>
          <FormField
            control={form.control}
            name="code"
            render={({field}) => (
              <FormItem>
                <FormLabel>Tu código</FormLabel>
                <FormControl>
                  <ProblemDetails field={{...field}} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>
        {/* fin Code */}
        <div className="flex justify-end gap-4">
          <Button
            disabled={isPending}
            type="button"
            variant="destructive"
            onClick={() => {
              close()
            }}
          >
            Cancelar
          </Button>
          <Button disabled={isPending} type="submit">
            {isPending ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : null}
            {isPending ? buttonLoadingTitle : buttonTitle}
          </Button>
        </div>
      </form>
    </Form>
  )
}
