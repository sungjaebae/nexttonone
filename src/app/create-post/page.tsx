"use client"

import { useState } from "react"
import { twMerge } from "tailwind-merge"
import { createPost } from "./actions"
import { useRouter } from "next/navigation"

export default function CreatePost() {
  const router = useRouter()
  const [content, setContent] = useState("")

  const buttonDisabled = content.length < 3

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await createPost(content)
    console.log(res)
    setContent("")
    router.push("/")
  }

  return (
    <main className="text-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="border border-neutral-500 rounded-lg px-6 py-4 flex flex-col gap-4"
      >
        <label className="w-full">
          <textarea
            className="bg-transparent flex-1 border-none outline-none w-full"
            name="content"
            placeholder="Post a thing..."
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>

        <div className="text-neutral-500">Characters: {content.length}</div>

        <button
          type="submit"
          className={twMerge(
            "border rounded-xl px-4 py-2 disabled",
            buttonDisabled && "opacity-50"
          )}
          disabled={buttonDisabled}
          aria-disabled={buttonDisabled}
        >
          Post
        </button>
      </form>
    </main>
  )
}
