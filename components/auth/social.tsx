"use client"

import {signIn} from "next-auth/react"

import Icon from "@ui/icon"
import {Button} from "@ui/button"

export const Social = () => {
  const onCLick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: "/",
    })
  }

  return (
    <div className="flex w-full items-center justify-center gap-x-2">
      <Button className="w-full" size="lg" variant="outline" onClick={() => onCLick("google")}>
        <Icon className="h-5 w-5" name="chrome" />
      </Button>
      <Button className="w-full" size="lg" variant="outline" onClick={() => onCLick("github")}>
        <Icon className="h-5 w-5" name="github" />
      </Button>
    </div>
  )
}
