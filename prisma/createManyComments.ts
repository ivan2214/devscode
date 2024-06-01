import {faker} from "@faker-js/faker"
import {type User} from "@prisma/client"

import {db} from "../lib/db"

export const createManyComments = async (users: User[], problemId: string): Promise<void> => {
  // Generar un número aleatorio de comentarios
  const randomComments = faker.number.int({min: 0, max: 6})

  for (let i = 0; i < randomComments; i++) {
    let comment
    const userId = users[Math.floor(Math.random() * users.length)].id
    const commentAnonymous = Math.random() < 0.3
    const randomReply = faker.number.int({min: 0, max: 6})

    // Crear un comentario
    if (!commentAnonymous) {
      comment = await db.comment.create({
        data: {
          content: faker.lorem.sentence(),
          authorId: userId,
          problemId,
          likes: faker.number.int({min: 0, max: 100}),
          dislikes: faker.number.int({min: 0, max: 100}),
        },
      })
    } else {
      comment = await db.comment.create({
        data: {
          content: faker.lorem.sentence(),
          problemId,
          likes: faker.number.int({min: 0, max: 100}),
          dislikes: faker.number.int({min: 0, max: 100}),
          anonymous: true,
        },
      })
    }

    // Crear respuestas al comentario
    for (let j = 0; j < randomReply; j++) {
      const userIdReply = users[Math.floor(Math.random() * users.length)].id
      const replyAnonymous = Math.random() < 0.3

      if (!replyAnonymous && comment) {
        await db.reply.create({
          data: {
            commentId: comment.id,
            content: faker.lorem.sentence(),
            userIdReply: userIdReply,
            likes: faker.number.int({min: 0, max: 100}),
            dislikes: faker.number.int({min: 0, max: 100}),
            anonymous: false,
          },
        })
      } else if (comment) {
        await db.reply.create({
          data: {
            commentId: comment.id,
            content: faker.lorem.sentence(),
            likes: faker.number.int({min: 0, max: 100}),
            dislikes: faker.number.int({min: 0, max: 100}),
            anonymous: true,
          },
        })
      }
    }
  }
}
