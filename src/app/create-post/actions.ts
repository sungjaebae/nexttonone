"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { action } from "./safe-action"
import { db } from "@/db"
import { posts as postsTable } from "@/db/schema/posts"

const schema = z.string().min(3)

export const createPost = action(schema, async (content) => {
  console.log(content)

  if (!content || content.length < 3) {
    return { error: "not enough content" }
  }
  await db.insert(postsTable).values({
    content,
    userId: "3",
  })

  revalidatePath("/")
})
