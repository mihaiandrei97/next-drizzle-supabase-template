import db from '@/db';
import { todos } from '@/db/schemas';
import { and, eq } from 'drizzle-orm';

export type DeleteTodoByUserId = {
    userId: string;
    todoId: number;
};

export async function deleteTodoByUserId({ userId, todoId }: DeleteTodoByUserId) {
    return db.delete(todos).where(and(eq(todos.userId, userId), eq(todos.id, todoId)));
}
