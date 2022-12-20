import SubscriptionCard from "@/Components/SubscriptionCard";
import Authenticated from "@/Layouts/Authenticated/Index";
import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/inertia-react";

export default function SubscriptionPlan({ auth, subscriptionPlans }) {
    const subscribePlan = (id) => {
        Inertia.post(route("subscription_plan.subscribe", id));
    };

    return (
        <>
            <Head title="Subscription Plan" />
            <Authenticated>
                <div className="py-20 flex flex-col items-center">
                    <div className="text-black font-semibold text-[26px] mb-3">
                        Pricing for Everyone
                    </div>
                    <p className="text-base text-gray-1 leading-7 max-w-[302px] text-center">
                        Invest your little money to get a whole new experiences
                        from movies.
                    </p>

                    <div className="flex justify-center gap-10 mt-[70px]">
                        {subscriptionPlans.map((subscriptionPlan) => (
                            <SubscriptionCard
                                key={"subplan-" + subscriptionPlan.id}
                                id={subscriptionPlan.id}
                                name={subscriptionPlan.name}
                                price={subscriptionPlan.price}
                                durationInMonth={
                                    subscriptionPlan.active_period_in_month
                                }
                                features={subscriptionPlan.features}
                                isPremium={subscriptionPlan.name === "Premium"}
                                onSelectSubscription={() =>
                                    subscribePlan(subscriptionPlan.id)
                                }
                            />
                        ))}
                        {/* <SubscriptionCard
                            id="1"
                            name="Basic"
                            price={299000}
                            durationInMonth={3}
                            features={["Feat 1", "Feat 2", "Feat 3"]}
                            onSelectSubscription={() => {
                                console.log("Pick Basic");
                            }}
                        />
                        <SubscriptionCard
                            id="2"
                            name="Premium"
                            price={499000}
                            durationInMonth={6}
                            features={[
                                "Feat 1",
                                "Feat 2",
                                "Feat 3",
                                "Feat 4",
                                "Feat 5",
                                "Feat 6",
                            ]}
                            isPremium={true}
                            onSelectSubscription={() => {
                                console.log("Pick Premium");
                            }}
                        /> */}
                    </div>
                </div>
            </Authenticated>
        </>
    );
}
