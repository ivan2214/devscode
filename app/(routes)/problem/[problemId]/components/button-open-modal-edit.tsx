"use client"

import {PencilIcon} from "lucide-react"
import {type Tag} from "@prisma/client"

import {Button} from "@ui/button"
import {type CreateProblemFormValues} from "@components/problem/problem-form"
import {useUpdateProblemModal} from "@/store/use-update-problem-modal"

interface ButtonOpenModalEditProps {
  problemId: string
  values: CreateProblemFormValues
  tagsFromDb?: Tag[]
}

export const ButtonOpenModalEdit: React.FC<ButtonOpenModalEditProps> = ({problemId, values}) => {
  const {openEditModal} = useUpdateProblemModal()

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
