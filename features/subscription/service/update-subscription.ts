import db from '@/db';
import { userSubscriptions } from '@/db/schemas';
import { eq } from 'drizzle-orm';

type UpdateSubscriptionProps = {
    subscriptionId: string;
    stripeCurrentPeriodEnd: Date;
};

export async function updateSubscription(props: UpdateSubscriptionProps) {
    return db
        .update(userSubscriptions)
        .set({
            stripeCurrentPeriodEnd: props.stripeCurrentPeriodEnd,
            updatedAt: new Date().toISOString(),
        })
        .where(eq(userSubscriptions.stripeSubscriptionId, props.subscriptionId));
}
