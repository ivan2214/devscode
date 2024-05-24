import {create} from "zustand"

import {type CreateProblemFormValues} from "@/components/problem/problem-form"

interface CreateProblemModalStore {
  isOpen: boolean
  open: () => void
  close: () => void
  openEditModal: (problemId: string, data: CreateProblemFormValues) => void
  clearData: () => void
  data?: {
    problemId: string
    values: CreateProblemFormValues
  }
}

export const useCreateProblemModal = create<CreateProblemModalStore>((set) => ({
  isOpen: false,

  open: () => set({isOpen: true}),
  close: () => set({isOpen: false}),
  openEditModal: (problemId, data) => set({isOpen: true, data: {problemId, values: data}}),
  clearData: () =>
    set({
      data: {
        problemId: "",
        values: {
          title: "",
          description: "",
          tagNames: [],
        },
      },
    }),
}))
