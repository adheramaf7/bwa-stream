import SubscriptionCard from "@/Components/SubscriptionCard";
import Authenticated from "@/Layouts/Authenticated/Index";
import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/inertia-react";
import axios from "axios";

export default function SubscriptionPlan({
    subscriptionPlans,
    midtransClientKey,
}) {
    const subscribePlan = (id) => {
        const url = route("subscription_plan.subscribe", id);

        axios
            .post(url, {})
            .then(({ data }) => {
                const { snap_token: snapToken } = data;
                snapPay(snapToken);
            })
            .catch((error) => {
                console.log(error);
                alert("Something went wrong!");
            });
    };

    const snapPay = (snapToken) => {
        snap.pay(snapToken, {
            onSuccess: function (result) {
                console.log(result);
                Inertia.visit(route("dashboard"));
            },
            onPending: function (result) {
                console.log(result);
            },
            onError: function (result) {
                console.log(result);
            },
        });
    };

    return (
        <>
            <Head title="Subscription Plan">
                <script
                    src="https://app.sandbox.midtrans.com/snap/snap.js"
                    data-client-key={midtransClientKey}
                ></script>
            </Head>
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
