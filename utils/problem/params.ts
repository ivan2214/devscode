import {db} from "@/lib/db"

interface GenerateParamsProps {
  params: {
    problemId: string
  }
}

interface GenerateParamsPropsReturn {
  problem: string
}

export const generateStaticParams = async ({
  params: {problemId},
}: GenerateParamsProps): Promise<GenerateParamsPropsReturn[]> => {
  const problems = await db.problem.findMany({
    where: {
      id: problemId,
    },
  })

  return problems.map((problem) => ({
    problem: problem.id,
  }))
}
