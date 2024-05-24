import {PrismaClient} from "@prisma/client"

import {createManyUsers} from "./createManyUsers"
import {createManyTags} from "./createManyTags"
import {createManyProblems} from "./createManyProblems"
import {createManyComments} from "./createManyComments"

const prisma = new PrismaClient()

async function main() {
  const usersAlreadyCreated = await prisma.user.findMany()
  const problemsAlreadyCreated = await prisma.problem.findMany()
  const commentsAlreadyCreated = await prisma.comment.findMany()

  if (
    usersAlreadyCreated.length > 0 &&
    problemsAlreadyCreated.length > 0 &&
    commentsAlreadyCreated.length > 0
  ) {
    return
  }

  // limpia la base de datos
  await prisma.$transaction([
    prisma.user.deleteMany({}),
    prisma.comment.deleteMany({}),
    prisma.problem.deleteMany({}),
  ])
  const users = await createManyUsers()
  const tags = await createManyTags()
  const problemsIds = await createManyProblems(tags, users)

  for (const problemId of problemsIds) {
    await createManyComments(users, problemId)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async () => {
    await prisma.$disconnect()
    process.exit(1)
  })
