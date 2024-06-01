import {type ControllerRenderProps} from "react-hook-form"

import {Button} from "../ui/button"

interface CreateEmptyTagProps {
  field: ControllerRenderProps
  currentValue?: string
  setOpen: (open: boolean) => void
  setSelectedStatus: (tag?: string) => void
}

export const CreateEmptyTag: React.FC<CreateEmptyTagProps> = ({
  field,
  currentValue,
  setOpen,
  setSelectedStatus,
}) => {
  return (
    <Button
      size="sm"
      type="button"
      variant="outline"
      onClick={() => {
        field.onChange(currentValue)
        setSelectedStatus(currentValue)
        setOpen(false)
      }}
    >
      Crear {currentValue}
    </Button>
  )
}
