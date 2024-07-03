import { serial, text, pgTable, boolean } from "drizzle-orm/pg-core";

export const todos = pgTable('todo', {
  id: serial('id').primaryKey(),
  content: text('content').notNull(),
  completed: boolean('completed').notNull(),
});

