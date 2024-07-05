import { Plan } from '@/db/schemas';

export const SUBSCRIPTIONS: Record<
    Plan,
    {
        name: string;
        price: number;
        description: string;
    }
> = {
    BASIC: {
        name: 'Basic Plan',
        price: 1000,
        description: 'Get started with our basic features',
    },
    PREMIUM: {
        name: 'Premium Plan',
        price: 5000,
        description: 'Get the most out of our platform',
    },
};
