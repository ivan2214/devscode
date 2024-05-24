import {faker} from "@faker-js/faker"
import {type User} from "@prisma/client"

import {db} from "../lib/db"

export const createManyComments = async (users: User[], problemId: string): Promise<void> => {
  // Comentarios
  const randomComments = faker.number.int({min: 0, max: 20})

  for (let i = 0; i < randomComments; i++) {
    const userId = users[Math.floor(Math.random() * users.length)].id
    const userRepliedComment = users[Math.floor(Math.random() * users.length)].id

    const comment = await db.comment.create({
      data: {
        content: faker.lorem.sentence(),
        authorId: userId,
        problemId,
      },
    })

    if (
      userRepliedComment !== userId &&
      userRepliedComment !== comment.authorId &&
      userRepliedComment
    ) {
      await db.reply.create({
        data: {
          content: faker.lorem.sentence(),
          commentId: comment.id,
          userIdReply: userRepliedComment,
        },
      })
    }
  }
}
