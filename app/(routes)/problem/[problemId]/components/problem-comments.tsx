import React from "react"

import {type ProblemExtends} from "@/types"

import {Comments} from "./comment/comments"

interface ProblemCommentsProps {
  isAuthorProblem: boolean
  problem: ProblemExtends
}

const ProblemComments: React.FC<ProblemCommentsProps> = ({isAuthorProblem, problem}) => {
  return <Comments isAuthorProblem={isAuthorProblem} problem={problem} />
}

export default ProblemComments
