import { Button } from '@/components/ui/button';
import { getCurrentUser } from '@/lib/session';
import { createSupabaseActionInstance } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import Link from 'next/link';

const signOut = async () => {
    'use server';
    const supabase = createSupabaseActionInstance(cookies());
    await supabase.auth.signOut();
    revalidatePath('/');
};

export default async function Home() {
    const user = await getCurrentUser();

    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            {user ? (
                <div className="flex flex-col gap-2 text-center">
                    <h1>Welcome back, {user.email}</h1>
                    <p>You are now signed in!</p>
                    <form action={signOut}>
                        <Button type="submit">Logout</Button>
                    </form>
                    <Button asChild>
                        <Link href="/todos">Todos</Link>
                    </Button>
                </div>
            ) : (
                <div className="text-center">
                    <h1>Welcome to the app</h1>
                    <p>You are not signed in yet.</p>
                    <Button asChild>
                        <Link href="/login">Login</Link>
                    </Button>
                </div>
            )}
        </main>
    );
}
