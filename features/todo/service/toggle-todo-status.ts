import db from '@/db';
import { todos } from '@/db/schemas';
import { and, eq } from 'drizzle-orm';

export type ToggleTodoStatus = {
    completed: boolean;
    userId: string;
    todoId: number;
};

export async function toggleTodoStatus({ completed, userId, todoId }: ToggleTodoStatus) {
    return db
        .update(todos)
        .set({ completed, updatedAt: new Date().toISOString() })
        .where(and(eq(todos.userId, userId), eq(todos.id, todoId)));
}
