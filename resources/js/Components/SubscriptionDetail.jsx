export default function SubscriptionDetail({ plan }) {
    const remainingDaysPercentage = () =>
        Math.round(plan.remaining_days / plan.active_days) * 100;

    return (
        <>
            {plan.is_premium && (
                <div className="mt-auto pr-[30px]">
                    <div className="p-5 bg-black rounded-[25px]">
                        <img src="/icons/ic_star-rounded.svg" alt="" />
                        <div className="text-white text-lg font-semibold mt-4 mb-8">
                            {plan.name}
                        </div>
                        <div className="text-white text-sm mb-2">
                            {plan.remaining_days} of {plan.active_days} hari
                        </div>
                        <div className="rounded-full w-full h-[6px] bg-[#333333]">
                            <div
                                className={`rounded-full h-full bg-alerange w-[${remainingDaysPercentage()}%]`}
                            ></div>
                        </div>
                    </div>
                </div>
            )}

            {!plan.is_premium && (
                <div className="mt-auto pr-[30px]">
                    <div className="p-5 bg-white rounded-[25px] outline outline-1 outline-[#f1f1f1]">
                        <div className="text-black text-lg font-semibold mb-8">
                            {plan.name}
                        </div>
                        <div className="text-black text-sm mb-2">
                            {plan.remaining_days} of {plan.active_days} hari
                        </div>
                        <div className="rounded-full w-full h-[6px] bg-[#f1f1f1]">
                            <div
                                className={`rounded-full h-full bg-alerange w-[${remainingDaysPercentage()}%]`}
                            ></div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
