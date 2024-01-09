import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"
import * as dotenv from "dotenv"
import {
  users as usersTable,
  NewUser,
  media as mediaTable,
  NewMedia,
  posts as postTable,
  NewPost,
} from "./schema"
dotenv.config({ path: "./.env.local" })

if (!("DATABASE_URL" in process.env)) throw new Error("DATABASE_URL not found on .env.local")

const main = async () => {
  const client = new Pool({
    connectionString: process.env.DATABASE_URL,
  })
  const db = drizzle(client)
  const users: NewUser[] = [
    {
      id: "1",
      username: "john_doe",
      avatar: "https://www.gravatar.com/avatar/?d=mp",
      firstName: "John",
      lastName: "Doe",
    },
    {
      id: "2",
      username: "jane_doe",
      avatar: "https://www.gravatar.com/avatar/?d=mp",
      firstName: "Jane",
      lastName: "Doe",
    },
    {
      id: "3",
      username: "sam",
      avatar: "https://images.clerk.dev/uploaded/img_2UwOmQYFLO3AhjoORmTygZ7OM8Y.png",
      firstName: "saM",
      lastName: "saM",
    },
  ]

  const media: NewMedia[] = [
    {
      id: 1,
      type: "image",
      url: "https://picsum.photos/seed/picsum/200/300",
      width: 200,
      height: 300,
    },
    {
      id: 2,
      type: "image",
      url: "https://picsum.photos/seed/picsum/300/300",
      width: 200,
      height: 300,
    },
  ]

  const posts: NewPost[] = [
    {
      id: 1,
      userId: "1",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nullam vel eros sit amet arcu vestibulum accumsan in in leo.",
    },
    {
      id: 2,
      userId: "1",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nullam vel eros sit amet arcu vestibulum accumsan in in leo.",
    },
    {
      id: 3,
      userId: "2",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nullam vel eros sit amet arcu vestibulum accumsan in in leo.",
    },
    {
      id: 4,
      userId: "1",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nullam vel eros sit amet arcu vestibulum accumsan in in leo.",
    },
    {
      id: 5,
      userId: "3",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nullam vel eros sit amet arcu vestibulum accumsan in in leo.",
    },
    {
      id: 6,
      userId: "3",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nullam vel eros sit amet arcu vestibulum accumsan in in leo.",
    },
    {
      id: 7,
      userId: "1",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nullam vel eros sit amet arcu vestibulum accumsan in in leo.",
    },
  ]

  console.log("Seed start")
  await db.insert(usersTable).values(users)
  await db.insert(mediaTable).values(media)
  await db.insert(postTable).values(posts)
  console.log("Seed done")
}

main()
