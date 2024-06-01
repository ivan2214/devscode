import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {useUpdateProblemModal} from "@/store/use-update-problem-modal"
import {ProblemForm} from "@components/problem/problem-form"

export const UpdateProblemModal = () => {
  const {isOpen, close} = useUpdateProblemModal()

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="h-[calc(100%-5rem)] w-full overflow-y-auto">
        <DialogHeader className="space-y-0">
          <div className="flex flex-col space-y-1.5">
            <DialogTitle>Crear queja</DialogTitle>
            <DialogDescription>Por favor ingresa los datos de la queja</DialogDescription>
          </div>
        </DialogHeader>
        <ProblemForm />
      </DialogContent>
    </Dialog>
  )
}
