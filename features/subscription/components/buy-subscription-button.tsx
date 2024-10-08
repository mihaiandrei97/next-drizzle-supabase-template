'use client';

import { LoaderButton } from '@/components/LoaderButton';
import { useToast } from '@/components/ui/use-toast';
import { Plan } from '@/db/schemas';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { buyPlan } from '../actions';

export default function BuySubscriptionButton({ plan }: { plan: Plan }) {
    const [pending, startTransition] = useTransition();
    const { toast } = useToast();
    const router = useRouter();

    function handleClick() {
        startTransition(() => {
            buyPlan({ plan })
                .then((data) => {
                    router.push(data);
                })
                .catch((e) => {
                    toast({
                        title: 'Something went wrong',
                        description: e.message,
                        variant: 'destructive',
                    });
                });
        });
    }

    return (
        <LoaderButton isLoading={pending} onClick={handleClick} className="w-full">
            Buy
        </LoaderButton>
    );
}
