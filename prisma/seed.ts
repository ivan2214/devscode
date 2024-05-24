import {PrismaClient} from "@prisma/client"
import {type User} from "@prisma/client"

import {createManyUsers} from "./createManyUsers"
import {createManyTags} from "./createManyTags"
import {createManyProblems} from "./createManyProblems"
import {createManyComments} from "./createManyComments"

const prisma = new PrismaClient()

type SafeUser = Omit<
  User,
  "id " | "createdAt " | "updatedAt " | "problems " | "comments " | "problemsResolvedF"
>

async function main() {
  const usersAlreadyCreated = await prisma.user.findMany()
  const problemsAlreadyCreated = await prisma.problem.findMany()
  const commentsAlreadyCreated = await prisma.comment.findMany()

  if (
    usersAlreadyCreated.length > 0 &&
    problemsAlreadyCreated.length > 0 &&
    commentsAlreadyCreated.length > 0
  ) {
    console.log("❗La base de datos ya ha sido inicializada. No se creará nada.❗")

    return
  }

  console.log(
    "❗La base de datos no ha sido inicializada. Se creará la base de datos. Espere... ❗",
  )

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

  console.log("Se creó la base de datos con éxito. ¡Listo! 🎉")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e: unknown) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
