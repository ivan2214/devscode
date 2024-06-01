"use client"
import React from "react"
import Link from "next/link"

import {useUpdateProblemModal} from "@/store/use-update-problem-modal"
import {Button} from "@ui/button"

export const ButtonCreateProblem = () => {
  const {clearData} = useUpdateProblemModal()

  return (
    <Button role="link" type="button" onClick={clearData}>
      <Link href="/ask/create">Publicar problem</Link>
    </Button>
  )
}
