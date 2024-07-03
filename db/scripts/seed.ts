import { Table, getTableName, sql } from "drizzle-orm";
import env from "@/env";
import { db, connection } from "@/db";
import * as schema from "@/db/schemas";

if (!env.DB_SEEDING) {
  throw new Error('You must set DB_SEEDING to "true" when running seeds');
}

async function resetTable(db: db, table: Table) {
  return db.execute(
    sql.raw(`TRUNCATE TABLE ${getTableName(table)} RESTART IDENTITY CASCADE`)
  );
}

async function seedUsers(db: db) {
  return db.insert(schema.todos).values([
    { content: "Buy milk", completed: false },
    { content: "Buy eggs", completed: true },
    { content: "Buy bread", completed: false },
  ]);
}

async function main() {
  for (const table of [schema.todos]) {
    // await db.delete(table); // clear tables without truncating / resetting ids
    await resetTable(db, table);
  }

  await seedUsers(db);

  await connection.end();
}

main();
