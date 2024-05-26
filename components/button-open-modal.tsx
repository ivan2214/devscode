"use client"
import {useCreateProblemModal} from "@/store/use-create-problem-modal"

import {Button} from "./ui/button"

export const ButtonOpenModal = () => {
  const {open, clearData} = useCreateProblemModal()

  return (
    <Button
      onClick={() => {
        clearData()
        open()
      }}
    >
      Publicar problema
    </Button>
  )
}
