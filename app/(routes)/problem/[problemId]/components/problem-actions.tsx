import React from "react"
import {type Status} from "@prisma/client"

import {ButtonOpenModalEdit} from "@/app/(routes)/problem/[problemId]/components/button-open-modal-edit"
import {Button} from "@ui/button"
import Icon from "@/components/ui/icon"
import {type CreateProblemFormValues} from "@components/problem/problem-form"
import {ButtonChangeStatus} from "@/app/(routes)/problem/[problemId]/components/button-change-status"
import {ButtonDeleteProblem} from "@/app/(routes)/problem/[problemId]/components/button-delete-problem"

interface ProblemActionsProps {
  isAuthorProblem: boolean
  problemId: string
  values: CreateProblemFormValues
  problemStatus: Status
}

const ProblemActions: React.FC<ProblemActionsProps> = ({
  isAuthorProblem,
  problemId,
  values,
  problemStatus,
}) => {
  return (
    <div className="flex justify-between gap-2">
      {isAuthorProblem ? (
        <div className="flex gap-2">
          <ButtonOpenModalEdit problemId={problemId} values={values} />
          <ButtonChangeStatus
            problemId={problemId}
            values={{
              problemId: problemId,
              status: problemStatus,
            }}
          />
          <ButtonDeleteProblem problemId={problemId} />
        </div>
      ) : null}
      <div className="flex gap-2">
        <Button className="flex items-center gap-x-2" size="sm" variant="outline">
          <Icon className="h-4 w-4" name="share" />
          Share
        </Button>
        <Button className="flex items-center gap-x-2" size="sm" variant="outline">
          <Icon className="h-4 w-4" name="mail" />
          Email
        </Button>
      </div>
    </div>
  )
}

export default ProblemActions
