import Icon from "@ui/icon"
import {Button} from "@ui/button"

interface FormActionsProps {
  isPending: boolean
  buttonLoadingTitle: string
  buttonTitle: string
  close: () => void
}

export const FormActions: React.FC<FormActionsProps> = ({
  isPending,
  buttonLoadingTitle,
  buttonTitle,
  close,
}) => (
  <div className="flex justify-end gap-4">
    <Button disabled={isPending} type="button" variant="destructive" onClick={close}>
      Cancelar
    </Button>
    <Button disabled={isPending} type="submit">
      {isPending ? <Icon className="mr-2 h-4 w-4 animate-spin" name="loader" /> : null}
      {isPending ? buttonLoadingTitle : buttonTitle}
    </Button>
  </div>
)
