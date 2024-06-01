import {useEffect, useState} from "react"

export const useClientOnly = (): boolean => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient
}
