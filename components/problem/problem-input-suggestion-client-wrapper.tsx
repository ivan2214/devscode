import React from "react"

import {db} from "@/lib/db"

interface ProblemInputSuggestionClientWrapperProps {
  children: React.ReactNode
}

export const ProblemInputSuggestionClientWrapper: React.FC<
  ProblemInputSuggestionClientWrapperProps
> = async ({children}) => {
  const tagsFromDb = await db.tag.findMany({})

  return <>{children}</>
}
