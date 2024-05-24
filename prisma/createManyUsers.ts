import {type User} from "@prisma/client"
import {faker} from "@faker-js/faker"
import bcrypt from "bcryptjs"

import {db} from "../lib/db"

export const createManyUsers = async (): Promise<User[]> => {
  const randomUsers = faker.number.int({min: 5, max: 10})

  for (let i = 0; i < randomUsers; i++) {
    await db.user.create({
      data: {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        image: faker.image.avatar(),
        name: faker.person.fullName(),
      },
    })
    console.log(`👤 Generando usuarios ${i.toString()}/${randomUsers.toString()}`)
    console.log("*-------------------------------------------*")
  }

  const users = await db.user.findMany()

  return users
}
