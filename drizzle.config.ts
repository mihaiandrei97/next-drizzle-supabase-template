import { defineConfig } from "drizzle-kit";
import env from '@/env';

export default defineConfig({
  schema: "./db/schemas/index.ts",
  out: "./db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
});