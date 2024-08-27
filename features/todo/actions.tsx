'use server';

import { createTodoByUserId } from '@/features/todo/service/create-todo-by-user-id';
import { deleteTodoByUserId } from '@/features/todo/service/delete-todo-by-user-id';
import { toggleTodoStatus } from '@/features/todo/service/toggle-todo-status';
import { getCurrentUser } from '@/lib/session';
import { revalidatePath } from 'next/cache';

export async function toggleTodoAction({
    completed,
    todoId,
}: {
    completed: boolean;
    todoId: number;
}) {
    const user = await getCurrentUser();
    if (!user) {
        throw new Error('Unauthorized');
    }
    await toggleTodoStatus({ completed, userId: user.id, todoId });
    revalidatePath('/todos');
}

export async function deleteTodoAction({ todoId }: { todoId: number }) {
    const user = await getCurrentUser();
    if (!user) {
        throw new Error('Unauthorized');
    }
    await deleteTodoByUserId({ userId: user.id, todoId });
    revalidatePath('/todos');
}

export async function createTodoAction({ text }: { text: string }) {
    const user = await getCurrentUser();
    if (!user) {
        throw new Error('Unauthorized');
    }

    await createTodoByUserId({ userId: user.id, content: text });
    revalidatePath('/todos');
}
