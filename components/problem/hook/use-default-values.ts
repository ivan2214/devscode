import {type User} from "@prisma/client"

import {
  type CreateProblemFormValues,
  type UpdateProblemFormValues,
} from "@components/problem/problem-form"

export const useDefaultValues = (
  user: User | null | undefined,
  data?: {
    problemId: string
    values: UpdateProblemFormValues
  },
): CreateProblemFormValues => ({
  title: data?.values?.title ?? "",
  description: data?.values?.description ?? "",
  tagNames: data?.values?.tagNames ?? [],
  code: data?.values?.code ?? "",
  userId: data?.values?.userId ?? user?.id ?? "",
})
