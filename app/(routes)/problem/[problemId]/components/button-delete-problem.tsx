"use client"

import {LoaderIcon, TrashIcon} from "lucide-react"
import {useTransition} from "react"
import {toast} from "sonner"

import {Button} from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {deleteProblem} from "@/actions/problem/delete-problem"

interface ButtonDeleteProblemProps {
  problemId: string
}

export const ButtonDeleteProblem: React.FC<ButtonDeleteProblemProps> = ({problemId}) => {
  const [isPending, startTransition] = useTransition()
  const onClick = () => {
    startTransition(() => {
      deleteProblem(problemId).then((res) => {
        if (res?.error) {
          toast("Error", {
            description: res?.error,
          })
        }
        if (res?.success) {
          toast("Problem deleted", {
            description: res?.success,
          })
        }
      })
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="flex items-center gap-x-2" variant="outline">
          <TrashIcon className="h-4 w-4" />
          Borrar problema
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Estas seguro de eliminar esta problema?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Esto eliminará permanentemente la problema y eliminará
            sus datos de nuestros servidores.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction className="bg-destructive text-white" onClick={onClick}>
            {isPending ? <LoaderIcon className="h-4 w-4 animate-spin" /> : null}
            {isPending ? "Eliminando..." : "Eliminar problema"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
/* <Button
      className="flex items-center gap-x-2"
      disabled={isPending}
      size="sm"
      variant="outline"
      onClick={onClick}
    >

    </Button> */
