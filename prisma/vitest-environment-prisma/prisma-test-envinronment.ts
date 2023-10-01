import { randomUUID } from "node:crypto"
import { execSync } from "node:child_process"
import { PrismaClient } from "@prisma/client"
import { Environment } from "vitest"

const prisma = new PrismaClient()

function databaseUrlGenerator(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error("Provide a valid DATABASE URL env variable.")
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set("schema", schema)

  return String(url)
}

export default <Environment>{
  name: "prisma",
  transformMode: "web",

  async setup() {
    const schema = randomUUID()
    const databaseUrl = databaseUrlGenerator(schema)

    process.env.DATABASE_URL = databaseUrl

    execSync("npx prisma migrate deploy")

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`
        )
        await prisma.$disconnect()
      },
    }
  },
}
