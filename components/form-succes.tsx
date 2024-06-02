import Icon from "@ui/icon"

interface FormSuccesProps {
  message?: string
}

export const FormSucces: React.FC<FormSuccesProps> = ({message}) => {
  if (!message) {
    return null
  }

  return (
    <div className="flex items-center gap-x-2 rounded-md bg-emerald-500/15 p-3 text-sm text-emerald-500">
      <Icon className="h-4 w-4" name="triangle-alert" />
      <p>{message}</p>
    </div>
  )
}
