import 'server-only';
import { createSupabaseServerInstance } from './supabase';
import { cookies } from 'next/headers';
import { cache } from 'react';
import { getUserById } from '@/features/user/service/get-user-by-id';

export const getCurrentUser = cache(async () => {
    const supabase = createSupabaseServerInstance(cookies());
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return null;
    }

    const userData = await getUserById({ userId: user.id });

    return {
        id: user.id,
        email: user.email,
        role: userData.role,
    };
});
