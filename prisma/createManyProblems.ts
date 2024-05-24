import {faker} from "@faker-js/faker"
import {type Tag, type User, type Status} from "@prisma/client"

import {db} from "../lib/db"

export const createManyProblems = async (tags: Tag[], users: User[]): Promise<string[]> => {
  const problemsIds: string[] = []
  const randomProblems = faker.number.int({min: 5, max: 25})

  for (let i = 0; i < randomProblems; i++) {
    const userId = users[Math.floor(Math.random() * users.length)].id
    const status: Status = faker.helpers.arrayElement(["open", "closed", "solved", "unsolved"])
    const userProblemResolved = users[Math.floor(Math.random() * users.length)]
    const isResolved: boolean = faker.helpers.arrayElement([true, false])
    const tagsRandoms = faker.helpers.arrayElements(tags, faker.number.int({min: 1, max: 3}))

    const problem = await db.problem.create({
      data: {
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraphs(3),
        status,
        userId,
        tags: {
          connect: tagsRandoms.map((tag) => ({id: tag.id})),
        },
        likes: faker.number.int({min: 0, max: 100}),
        dislikes: faker.number.int({min: 0, max: 100}),
        views: faker.number.int({min: 0, max: 100}),
      },
    })

    if (isResolved) {
      await db.problemsResolved.create({
        data: {
          problemId: problem.id,
          resolverId: userProblemResolved.id,
        },
      })
    }

    problemsIds.push(problem.id)
  }

  return problemsIds
}
