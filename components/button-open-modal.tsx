"use client"
import {useUpdateProblemModal} from "@/store/use-update-problem-modal"

import {Button} from "./ui/button"

export const ButtonOpenModal = () => {
  const {open, clearData} = useUpdateProblemModal()

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
