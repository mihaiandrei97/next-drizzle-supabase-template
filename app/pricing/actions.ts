'use server';

import { Plan } from '@/db/schemas';
import { createStripeCheckout } from '@/features/subscription/service/create-stripe-checkout';
import { getSubscriptionByPlan } from '@/features/subscription/service/get-subscription-by-plan';
import { getBaseUrl } from '@/lib/helpers';
import { getCurrentUser } from '@/lib/session';
import Stripe from 'stripe';

export async function buySubscriptionAction({ plan }: { plan: Plan }) {
    const user = await getCurrentUser();
    if (!user) {
        throw new Error('Unauthorized');
    }
    const subscription = await getSubscriptionByPlan({ plan });

    const baseUrl = getBaseUrl();
    const successUrl = baseUrl + '/success';
    const cancelUrl = baseUrl + '/cancel';

    const metadata: Stripe.Metadata = {
        userId: user.id,
        plan,
    };

    const priceData: Stripe.Checkout.SessionCreateParams.LineItem.PriceData = {
        currency: 'USD',
        product_data: {
            name: subscription.name,
            description: subscription.description,
        },
        unit_amount: subscription.price,
        recurring: {
            interval: 'month',
        },
    };
    const checkoutSession = await createStripeCheckout({
        metadata,
        priceData,
        successUrl,
        cancelUrl,
        email: user.email,
    });

    if (!checkoutSession.data) {
        throw new Error('Failed to create checkout session');
    }

    return checkoutSession.data;
}
