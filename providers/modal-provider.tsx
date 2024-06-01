"use client"

import {useEffect, useState} from "react"

import {ManageAccountUserModal} from "@components/modals/manage-account-user-modal"
import {UpdateProblemModal} from "@components/modals/update-problem-modal"

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <ManageAccountUserModal />
      <UpdateProblemModal />
    </>
  )
}
