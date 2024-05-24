import {faker} from "@faker-js/faker"
import {type Tag} from "@prisma/client"

import {db} from "../lib/db"

export const createManyTags = async (): Promise<Tag[]> => {
  const tagsNames: string[] = [
    "front end",
    "back end",
    "full stack",
    "mobile",
    "web3",
    "blockchain",
    "react",
    "vue",
    "angular",
    "flutter",
    "nextjs",
    "nuxt",
    "svelte",
    "python",
    "java",
    "c#",
    "php",
    "javascript",
    "typescript",
    "docker",
    "kubernetes",
    "aws",
    "azure",
    "gcp",
    "git",
    "github",
    "gitlab",
    "graphql",
    "apollo",
    "nodejs",
    "mongodb",
    "mysql",
    "postgresql",
    "sqlite",
    "sqlite3",
    "sqlserver",
    "oracle",
    "mariadb",
  ]

  const tags = db.tag.createManyAndReturn({
    data: tagsNames.map((tag) => ({name: tag})),
    skipDuplicates: true,
  })

  return tags
}
