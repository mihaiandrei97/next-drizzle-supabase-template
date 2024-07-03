import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/session";
import Link from "next/link";

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      {user ? (
        <div className="text-center">
          <h1>Welcome back, {user.email}</h1>
          <p>You are now signed in!</p>
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
