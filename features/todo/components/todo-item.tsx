'use client';

import { LoaderButton } from '@/components/LoaderButton';
import { Checkbox } from '@/components/ui/checkbox';
import { Todo } from '@/db/schemas';
import { TrashIcon } from 'lucide-react';
import { useTransition } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { deleteTodoAction, toggleTodoAction } from '../actions';

function TodoCheckbox({ todo }: { todo: Todo }) {
    const [_pending, startTransition] = useTransition();

    return (
        <Checkbox
            checked={todo.completed}
            id={todo.id.toString()}
            onCheckedChange={(checked) => {
                startTransition(() => {
                    toggleTodoAction({ completed: checked as boolean, todoId: todo.id });
                });
            }}
        />
    );
}
export function TodoItem({ todo }: { todo: Todo }) {
    const [pending, startTransition] = useTransition();
    const { toast } = useToast();

    return (
        <div
            key={todo.id}
            className="flex w-full items-center gap-4 rounded bg-gray-200 px-4 py-4 dark:bg-gray-800"
        >
            <div className="flex flex-grow items-center gap-4">
                <TodoCheckbox todo={todo} />

                <label
                    htmlFor={todo.id.toString()}
                    className="text-2xl font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    {todo.content}
                </label>
            </div>

            <LoaderButton
                isLoading={pending}
                onClick={() => {
                    startTransition(() => {
                        deleteTodoAction({ todoId: todo.id }).then(() => {
                            toast({
                                title: 'Todo deleted',
                                description: 'Your todo has been deleted',
                            });
                        });
                    });
                }}
                variant="destructive"
                title="Delete Todo"
            >
                <TrashIcon className="h-4 w-4" />
            </LoaderButton>
        </div>
    );
}
