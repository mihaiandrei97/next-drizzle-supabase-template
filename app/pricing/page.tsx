import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from '@/components/ui/card';
import { getSubscriptions } from '@/features/subscription/service/get-subscriptions';
import BuySubscriptionButton from '@/features/subscription/components/buy-subscription-button';

export default async function Component() {
    const subscriptions = await getSubscriptions();

    return (
        <div className="container mx-auto max-w-3xl px-4 py-12">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Card className="rounded-lg bg-background p-6 shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">
                            {subscriptions.BASIC.name}
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">
                            {subscriptions.BASIC.description}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="text-4xl font-bold">
                            ${subscriptions.BASIC.price / 100}/mo
                        </div>
                        <ul className="space-y-2 text-muted-foreground">
                            <li>
                                <CheckIcon className="mr-2 inline-block h-4 w-4 text-primary" />
                                Feature 1
                            </li>
                            <li>
                                <CheckIcon className="mr-2 inline-block h-4 w-4 text-primary" />{' '}
                                Feature 2
                            </li>
                            <li>
                                <CheckIcon className="mr-2 inline-block h-4 w-4 text-primary" />{' '}
                                Feature 3
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <BuySubscriptionButton plan="BASIC" />
                    </CardFooter>
                </Card>
                <Card className="rounded-lg bg-background p-6 shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">
                            {subscriptions.PREMIUM.name}
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">
                            {subscriptions.PREMIUM.description}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="text-4xl font-bold">
                            {subscriptions.PREMIUM.price / 100}/mo
                        </div>
                        <ul className="space-y-2 text-muted-foreground">
                            <li>
                                <CheckIcon className="mr-2 inline-block h-4 w-4 text-primary" />
                                Feature 1
                            </li>
                            <li>
                                <CheckIcon className="mr-2 inline-block h-4 w-4 text-primary" />
                                Feature 2
                            </li>
                            <li>
                                <CheckIcon className="mr-2 inline-block h-4 w-4 text-primary" />
                                Feature 3 + extra
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <BuySubscriptionButton plan="PREMIUM" />
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}

function CheckIcon(props: { className?: string }) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M20 6 9 17l-5-5" />
        </svg>
    );
}
