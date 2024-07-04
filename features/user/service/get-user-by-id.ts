import db from '@/db';
import { users } from '@/db/schemas';
import { eq } from 'drizzle-orm';

export type GetUserByIdParams = {
    userId: string;
};

export async function getUserById(params: GetUserByIdParams) {
    let user = await db.query.users.findFirst({
        where: eq(users.id, params.userId),
    });

    if (!user) {
        const insertedUser = await db
            .insert(users)
            .values({
                id: params.userId,
            })
            .returning();

        user = insertedUser[0];
    }

    return user;
}
