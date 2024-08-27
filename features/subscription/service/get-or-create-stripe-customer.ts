import db from '@/db';
import { userSubscriptions } from '@/db/schemas';
import { stripe } from '@/lib/stripe';
import { eq } from 'drizzle-orm';

export type GetOrCreateStripeCustomerParams = {
    userId: string;
    email?: string;
};

export async function getOrCreateStripeCustomer(params: GetOrCreateStripeCustomerParams) {
    const userPlan = await db.query.userSubscriptions.findFirst({
        where: eq(userSubscriptions.userId, params.userId),
    });

    if (userPlan) {
        return userPlan.stripeCustomerId;
    }

    const customer = await stripe.customers.create({
        email: params.email,
    });

    return customer.id;
}
