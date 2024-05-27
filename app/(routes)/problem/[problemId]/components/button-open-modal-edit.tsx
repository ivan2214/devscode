"use client"

import {PencilIcon} from "lucide-react"

import {Button} from "@/components/ui/button"
import {type CreateProblemFormValues} from "@/components/problem/problem-form"
import {useCreateProblemModal} from "@/store/use-create-problem-modal"

interface ButtonOpenModalEditProps {
  problemId: string
  values: CreateProblemFormValues
}

export const ButtonOpenModalEdit: React.FC<ButtonOpenModalEditProps> = ({problemId, values}) => {
  const {openEditModal} = useCreateProblemModal()

  return (
    <Button
      className="flex items-center gap-x-2"
      size="sm"
      variant="outline"
      onClick={() => openEditModal(problemId, values)}
    >
      <PencilIcon className="h-4 w-4" />
      Editar problema
    </Button>
  )
}
