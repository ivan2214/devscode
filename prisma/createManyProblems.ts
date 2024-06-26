import {faker} from "@faker-js/faker"
import {type Tag, type User, type Status} from "@prisma/client"

import {db} from "../lib/db"

const code = ` if (!problemId) {
  return <div>Problem not found</div>
}

const problem = await db.problem.findUnique({
  where: {
    id: problemId,
  },
  include: {
    comments: {
      include: {
        author: true,
        reply: true,
      },
      orderBy: {
        likes: "desc",
      },
    },
    tags: {
      include: {
        tag: true,
      },
    },
    user: true,
  },
})

if (!problem) {
  return <div>Problem not found</div>
}`

export const createManyProblems = async (tags: Tag[], users: User[]): Promise<string[]> => {
  const problemsIds: string[] = []
  const randomProblems = faker.number.int({min: 20, max: 50})

  for (let i = 0; i < randomProblems; i++) {
    const userId = users[Math.floor(Math.random() * users.length)].id
    const status: Status = faker.helpers.arrayElement(["open", "closed", "solved", "unsolved"])

    const userProblemResolvedIds = faker.helpers
      .shuffle(users)
      .slice(0, faker.number.int({min: 1, max: 5}))
    const isResolved: boolean = faker.helpers.arrayElement([true, false])
    const randomTags = faker.helpers.shuffle(tags).slice(0, faker.number.int({min: 1, max: 3}))

    const problem = await db.problem.create({
      data: {
        createdAt: faker.date.past(),
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraphs(3),
        status,
        userId,
        tags: {
          createMany: {
            data: randomTags.map((tag) => {
              return {
                tagId: tag.id,
              }
            }),
          },
        },
        code: code,
        likes: faker.number.int({min: 0, max: 100}),
        dislikes: faker.number.int({min: 0, max: 100}),
        views: faker.number.int({min: 0, max: 100}),
      },
    })

    if (userProblemResolvedIds.length > 0 && isResolved) {
      await db.problemsResolved.createMany({
        data: userProblemResolvedIds.map((user) => {
          return {
            problemId: problem.id,
            resolverId: user.id,
          }
        }),
      })
    }

    problemsIds.push(problem.id)
  }

  return problemsIds
}
