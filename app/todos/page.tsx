import { getCurrentUser } from '@/lib/session';
import { TodoItem } from './_components/Todo';
import { getTodosByUserId } from '@/features/todo/service/get-todos-by-user-id';
import { CreateTodoButton } from './_components/CreateTodo';

export default async function TodosPage() {
    const user = await getCurrentUser();

    if (!user) {
        return (
            <div>
                <h1>Unauthorized</h1>
            </div>
        );
    }

    const todos = await getTodosByUserId({ userId: user.id });

    const hasTodos = todos.length > 0;

    return (
        <div className="mx-auto min-h-screen w-full max-w-2xl py-12">
            <div className="mb-8 flex items-center justify-between">
                <h1 className="text-4xl">Your Todos</h1>
                <CreateTodoButton />
            </div>

            <hr className="my-4 border-b" />

            {hasTodos && (
                <div className="flex flex-col gap-4">
                    {todos.map((todo) => (
                        <TodoItem todo={todo} key={todo.id} />
                    ))}
                </div>
            )}

            {!hasTodos && (
                <div className="mt-24 flex items-center justify-center text-2xl">
                    <p>You have no todos</p>
                </div>
            )}
        </div>
    );
}
