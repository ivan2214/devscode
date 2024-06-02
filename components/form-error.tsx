import Icon from "@ui/icon"

interface FormErrorProps {
  message?: string
}

export const FormError: React.FC<FormErrorProps> = ({message}) => {
  if (!message) {
    return null
  }

  return (
    <div className="flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
      <Icon className="h-4 w-4" name="triangle-alert" />
      <p>{message}</p>
    </div>
  )
}
