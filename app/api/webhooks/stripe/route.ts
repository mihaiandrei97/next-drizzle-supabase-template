import Stripe from 'stripe';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

import { stripe } from '@/lib/stripe';
import { Plan } from '@/db/schemas';
import { insertSubscription } from '@/features/subscription/service/insert-subscription';
import { updateSubscription } from '@/features/subscription/service/update-subscription';

export async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get('Stripe-Signature') as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_SIGNING_SECRET!);
    } catch (error: any) {
        return new NextResponse(`Webhook error: ${error.message}`, {
            status: 400,
        });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if (event.type === 'checkout.session.completed') {
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

        if (!session?.metadata?.userId) {
            return new NextResponse('User ID is required', { status: 400 });
        }

        if (!session?.metadata?.plan) {
            return new NextResponse('Plan is required', { status: 400 });
        }

        await insertSubscription({
            userId: session.metadata.userId,
            stripeSubscriptionId: subscription.id,
            customerId: subscription.customer as string,
            plan: session.metadata.plan as Plan,
            stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
        });
    }

    if (event.type === 'invoice.payment_succeeded') {
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

        await updateSubscription({
            stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
            subscriptionId: subscription.id,
        });
    }

    return new NextResponse(null, { status: 200 });
}