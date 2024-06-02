"use client"

import {type Tag} from "@prisma/client"

import {Button} from "@ui/button"
import {type CreateProblemFormValues} from "@components/problem/problem-form"
import {useUpdateProblemModal} from "@/store/use-update-problem-modal"
import Icon from "@/components/ui/icon"

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
      <Icon className="h-4 w-4" name="pencil" />
      Editar problema
    </Button>
  )
}
