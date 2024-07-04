import db from '@/db';
import { todos } from '@/db/schemas';
import { eq } from 'drizzle-orm';

export type GetTodosByUserIdParams = {
    userId: string;
};

export async function getTodosByUserId({ userId }: GetTodosByUserIdParams) {
    return db.select().from(todos).where(eq(todos.userId, userId));
}
