import {create} from "zustand"

import {type UpdateProblemFormValues} from "@components/problem/problem-form"

interface UpdateProblemModalStore {
  isOpen: boolean
  open: () => void
  close: () => void
  openEditModal: (problemId: string, data: UpdateProblemFormValues) => void
  clearData: () => void
  data?: {
    problemId: string
    values: UpdateProblemFormValues
  }
}

export const useUpdateProblemModal = create<UpdateProblemModalStore>((set) => ({
  isOpen: false,

  open: () => set({isOpen: true}),
  close: () => set({isOpen: false}),
  openEditModal: (problemId, data) => set({isOpen: true, data: {problemId, values: data}}),
  clearData: () =>
    set({
      data: {
        problemId: "",
        values: {
          userId: "",
          title: "",
          description: "",
          tagNames: [],
        },
      },
    }),
}))
