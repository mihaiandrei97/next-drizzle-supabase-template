import { serial, text, pgTable, boolean, timestamp, index, unique } from 'drizzle-orm/pg-core';

export type Role = 'USER' | 'ADMIN';
export type Plan = 'BASIC' | 'PREMIUM';

const updateAndCreatedAt = {
    createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
};

export const users = pgTable('user', {
    id: text('id').primaryKey(),
    role: text('role').$type<Role>().notNull().default('USER'),
    ...updateAndCreatedAt,
});

export const todos = pgTable(
    'todo',
    {
        id: serial('id').primaryKey(),
        content: text('content').notNull(),
        completed: boolean('completed').notNull(),
        userId: text('userId')
            .notNull()
            .references(() => users.id, { onDelete: 'cascade' }),
        ...updateAndCreatedAt,
    },
    (table) => {
        return {
            todoUserIdIndex: index('todo_user_id_idx').on(table.userId),
        };
    },
);

export const userSubscriptions = pgTable(
    'user_subscription',
    {
        id: serial('id').primaryKey(),
        userId: text('user_id').notNull(),
        stripeCustomerId: text('stripe_customer_id').notNull(),
        stripeSubscriptionId: text('stripe_subscription_id').notNull(),
        plan: text('plan').$type<Plan>().notNull(),
        stripeCurrentPeriodEnd: timestamp('stripe_current_period_end').notNull(),
        ...updateAndCreatedAt,
    },
    (table) => ({
        unq: unique('user_id_stripe_subscription_id_unq').on(
            table.userId,
            table.stripeSubscriptionId,
        ),
    }),
);

export type Todo = typeof todos.$inferSelect;
export type NewTodo = typeof todos.$inferInsert;
