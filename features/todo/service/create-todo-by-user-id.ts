import db from '@/db';
import { todos } from '@/db/schemas';

export type CreateTodoByUserId = {
    userId: string;
    content: string;
};

export async function createTodoByUserId({ userId, content }: CreateTodoByUserId) {
    return db.insert(todos).values({
        completed: false,
        userId,
        content,
    });
}
