"use client"

import {toast} from "sonner"
import {useRouter} from "next/navigation"
import {useEffect, useState, useTransition} from "react"
import {zodResolver} from "@hookform/resolvers/zod"
import {type z} from "zod"
import {useFieldArray, useForm} from "react-hook-form"
import {Loader} from "lucide-react"

import {Button} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {CreateProblemSchema, type UpdateProblemSchema} from "@/schemas"
import {cn} from "@/lib/utils"
import {useCreateProblemModal} from "@/store/use-create-problem-modal"
import {createProblem} from "@/actions/problem/create-problem"
import {updateProblem} from "@/actions/problem/update-problem"
import {DialogFooter} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"

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
    fields: categoryFields,
    append: appendCategory,
    remove: removeCategory,
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

  const formValues = form.getValues()

  console.log({
    ...formValues,
  })

  return (
    <Form {...form}>
      <form className="flex h-full w-full flex-col gap-y-5" onSubmit={form.handleSubmit(onSubmit)}>
        <section className="grid w-full grid-cols-1 gap-6">
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
                  <Textarea placeholder="Descripción" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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

        {/* Categorías */}
        <section>
          {categoryFields.map((field, index) => (
            <FormField
              key={field.id}
              control={form.control}
              name={`tagNames.${index}.name`}
              render={({field}) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>Categorias</FormLabel>
                  <FormDescription className={cn(index !== 0 && "sr-only")}>
                    Añada una o mas categorias
                  </FormDescription>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <section className="flex items-center gap-2">
            <Button
              className="mt-2"
              size="sm"
              type="button"
              variant="outline"
              onClick={() => appendCategory({name: ""})}
            >
              Añadir categoria
            </Button>

            {tags.length > 0 && (
              <Button
                className="mt-2"
                size="sm"
                type="button"
                variant="outline"
                onClick={() => removeCategory(tags.length - 1)}
              >
                Eliminar categoria
              </Button>
            )}
          </section>
        </section>

        <DialogFooter>
          <Button
            disabled={isPending}
            type="button"
            variant="outline"
            onClick={() => {
              close()
            }}
          >
            Cancelar
          </Button>
          <Button disabled={isPending} type="submit" variant="outline">
            {isPending ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : null}
            {isPending ? buttonLoadingTitle : buttonTitle}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
