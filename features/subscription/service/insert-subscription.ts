import db from '@/db';
import { Plan, userSubscriptions } from '@/db/schemas';

type InsertSubscriptionProps = {
    userId: string;
    customerId: string;
    stripeSubscriptionId: string;
    plan: Plan;
    stripeCurrentPeriodEnd: Date;
};

export async function insertSubscription(props: InsertSubscriptionProps) {
    return db.insert(userSubscriptions).values({
        userId: props.userId,
        stripeSubscriptionId: props.stripeSubscriptionId,
        stripeCustomerId: props.customerId,
        stripeCurrentPeriodEnd: props.stripeCurrentPeriodEnd,
        plan: props.plan,
    });
}
