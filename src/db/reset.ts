import { neon, neonConfig } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import * as dotenv from "dotenv"
import { sql } from "drizzle-orm"
import * as schema from "./schema"
dotenv.config({ path: "./.env.local" })
const connection = neon(process.env.MIGRATION_DATABASE_URL!)
export const db = drizzle(connection, { logger: true, schema: schema })

if (!("DATABASE_URL" in process.env)) throw new Error("DATABASE_URL not found on .env.local")

//reset.ts
async function reset() {
  const tableSchema = db._.schema
  if (!tableSchema) {
    throw new Error("No table schema found")
  }

  console.log("🗑️  Emptying the entire database")
  const queries = Object.values(tableSchema).map((table) => {
    console.log(`🧨 Preparing delete query for table: ${table.dbName}`)
    return sql.raw(`TRUNCATE TABLE ${table.dbName} CASCADE;`)
  })

  console.log("📨 Sending delete queries...")

  await Promise.all(
    queries.map(async (query) => {
      if (query) await db.execute(query)
    })
  )

  console.log("✅ Database emptied")
}

reset().catch((e) => {
  console.error(e)
})
