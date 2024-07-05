import { Plan } from '@/db/schemas';
import { SUBSCRIPTIONS } from '@/lib/subscriptions';

type GetSubscriptionByPlanProps = {
    plan: Plan;
};

export async function getSubscriptionByPlan(props: GetSubscriptionByPlanProps) {
    return SUBSCRIPTIONS[props.plan];
}
