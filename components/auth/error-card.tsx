import Icon from "@ui/icon"
import CardWrapper from "@components/auth/card-wrapper"

export const ErrorCard = () => {
  return (
    <CardWrapper
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
      hederLabel="Oops, something went wrong"
    >
      <div className="flex w-full items-center justify-center">
        <Icon className="text-destructive" name="triangle-alert" />
      </div>
    </CardWrapper>
  )
}
