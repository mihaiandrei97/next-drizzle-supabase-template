'use server';

import { Plan } from '@/db/schemas';
import { createStripeCheckout } from '@/features/subscription/service/create-stripe-checkout';
import { getSubscriptionByPlan } from '@/features/subscription/service/get-subscription-by-plan';
import { getBaseUrl } from '@/lib/helpers';
import { getCurrentUser } from '@/lib/session';
import Stripe from 'stripe';
import { getOrCreateStripeCustomer } from './service/get-or-create-stripe-customer';

export async function buyPlan({ plan }: { plan: Plan }) {
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
        // recurring: {
        //     interval: 'month', // add recurring for subscription mode
        // },
    };

    if (subscription.type !== 'one-time') {
        priceData.recurring = {
            interval: subscription.type,
        };
    }

    const customer = await getOrCreateStripeCustomer({
        userId: user.id,
        email: user.email,
    });

    const checkoutSession = await createStripeCheckout({
        metadata,
        priceData,
        successUrl,
        cancelUrl,
        email: user.email,
        customer,
        subscriptionMode: subscription.type === 'one-time' ? 'payment' : 'subscription',
    });

    if (!checkoutSession.data) {
        throw new Error('Failed to create checkout session');
    }

    return checkoutSession.data;
}
