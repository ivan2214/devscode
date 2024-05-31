interface AskPageProps {
  params: {problemId?: string | undefined}
}

export const AskPage: React.FC<AskPageProps> = ({params}) => {
  const {problemId} = params

  return (
    <div>
      <p>{problemId}</p>
    </div>
  )
}
