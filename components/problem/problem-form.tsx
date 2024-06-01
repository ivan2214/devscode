"use client"

import {toast} from "sonner"
import {useRouter} from "next/navigation"
import {useTransition} from "react"
import {zodResolver} from "@hookform/resolvers/zod"
import {type z} from "zod"
import {useFieldArray, useForm} from "react-hook-form"
import {type User} from "@prisma/client"

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@ui/form"
import {CreateProblemSchema, type UpdateProblemSchema} from "@/schemas"
import {createProblem} from "@/actions/problem/create-problem"
import {updateProblem} from "@/actions/problem/update-problem"
import {Input} from "@ui/input"
import {useUpdateProblemModal} from "@/store/use-update-problem-modal"
import {Textarea} from "@ui/textarea"
import {TagsSection} from "@components/problem/tag-section"
import {CodeSection} from "@components/problem/code-section"
import {FormActions} from "@components/problem/form-actions-section"
import {useClientOnly} from "@/hooks/use-client-only"
import {useResetForm} from "@components/problem/hook/use-reset-form-problem"
import {useDefaultValues} from "@components/problem/hook/use-default-values"

export type CreateProblemFormValues = z.infer<typeof CreateProblemSchema>

export type UpdateProblemFormValues = z.infer<typeof UpdateProblemSchema>

interface ProblemFormProps {
  user?: User | null
}

const ProblemForm: React.FC<ProblemFormProps> = ({user}) => {
  const {close, data} = useUpdateProblemModal()
  const [isPending, startTransition] = useTransition()
  const defaultValues = useDefaultValues(user, data)
  const form = useForm<CreateProblemFormValues>({
    resolver: zodResolver(CreateProblemSchema),
    defaultValues,
    mode: "onChange",
  })
  const router = useRouter()
  const isClient = useClientOnly()

  useResetForm(form, data)

  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({
    name: "tagNames",
    control: form.control,
  })

  if (!isClient) return null

  const handleFormSubmit = async (values: CreateProblemFormValues) => {
    const action = (values: CreateProblemFormValues, id?: string) =>
      id ? updateProblem(values, id) : createProblem(values)
    const res = await action(values, data?.problemId)

    if (res.error) {
      toast("Error", {
        description: res.error,
        action: {
          label: "Reintentar",
          onClick: () => handleFormSubmit(values),
        },
      })
    }

    if (res.success) {
      toast("Success", {
        description: `Problema ${data?.problemId ? "actualizado" : "creado"} correctamente`,
      })
      close()
      router.refresh()
    }
  }

  const onSubmit = (values: CreateProblemFormValues) => {
    startTransition(() => handleFormSubmit(values))
  }

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
          <TagsSection
            appendTag={appendTag}
            form={form}
            isPending={isPending}
            removeTag={removeTag}
            tagFields={tagFields}
          />
        </section>
        <CodeSection form={form} />
        <FormActions
          buttonLoadingTitle={buttonLoadingTitle}
          buttonTitle={buttonTitle}
          close={close}
          isPending={isPending}
        />
      </form>
    </Form>
  )
}

export default ProblemForm
