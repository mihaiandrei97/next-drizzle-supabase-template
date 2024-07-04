import { createSupabaseActionInstance } from '@/lib/supabase';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
    // The `/auth/callback` route is required for the server-side auth flow implemented
    // by the Auth Helpers package. It exchanges an auth code for the user's session.
    // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-sign-in-with-code-exchange
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');

    if (code) {
        const cookieStore = cookies();
        const supabase = createSupabaseActionInstance(cookieStore);
        await supabase.auth.exchangeCodeForSession(code);
    }

    // URL to redirect to after sign in process completes
    return new Response(null, {
        status: 302,
        headers: {
            Location: '/',
        },
    });
}
