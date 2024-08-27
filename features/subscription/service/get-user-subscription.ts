import db from '@/db';
import { userSubscriptions } from '@/db/schemas';
import { eq } from 'drizzle-orm';

export type GetUserSubscriptionParams = {
    userId: string;
};

const DAY_IN_MS = 86_400_000;

export async function getUserSubscription(params: GetUserSubscriptionParams) {
    const subscriptions = await db.query.userSubscriptions.findMany({
        where: eq(userSubscriptions.userId, params.userId),
    });

    const validSubscriptions = subscriptions.filter((subscription) => {
        const isValid = subscription.stripeCurrentPeriodEnd.getTime()! + DAY_IN_MS > Date.now();
        return isValid;
    });

    return validSubscriptions[validSubscriptions.length - 1];
}
