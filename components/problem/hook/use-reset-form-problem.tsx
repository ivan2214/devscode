import {type UseFormReturn} from "react-hook-form"
import {useEffect} from "react"

import {
  type CreateProblemFormValues,
  type UpdateProblemFormValues,
} from "@components/problem/problem-form"

export const useResetForm = (
  form: UseFormReturn<CreateProblemFormValues>,
  data?: {
    problemId: string
    values: UpdateProblemFormValues
  },
) => {
  useEffect(() => {
    if (data?.values) {
      form.reset(data?.values)
    }
  }, [data?.values, form])
}
