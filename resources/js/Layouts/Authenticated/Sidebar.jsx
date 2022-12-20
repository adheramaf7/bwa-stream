import SubscriptionDetail from "@/Components/SubscriptionDetail";
import { Link } from "@inertiajs/inertia-react";
import { OtherMenus, UserMenus } from "./menus";
import MenuItem from "@/Components/MenuItem";

export default function Sidebar({ activePlan }) {
    return (
        <aside className="fixed z-50 w-[300px] h-full">
            <div className="flex flex-col p-[30px] pr-0 border-r border-gray-[#F1F1F1] overflow-y-auto h-full">
                <Link href="/dashboard">
                    <img src="/images/moonton.svg" alt="" />
                </Link>
                <div className="links flex flex-col mt-[60px] h-full gap-[50px]">
                    <div>
                        <div className="text-gray-1 text-sm mb-4">Menu</div>
                        {UserMenus.map((item, index) => (
                            <MenuItem
                                key={"main-menu-" + index}
                                link={item.link ? route(item.link) : null}
                                text={item.text}
                                icon={item.icon}
                                method={item.method}
                                isActive={
                                    item.link && route().current(item.link)
                                }
                            />
                        ))}
                    </div>

                    <div>
                        <div className="text-gray-1 side-link mb-4">Others</div>
                        {OtherMenus.map((item, index) => (
                            <MenuItem
                                key={"other-menu-" + index}
                                link={item.link ? route(item.link) : null}
                                text={item.text}
                                icon={item.icon}
                                method={item.method}
                                isActive={
                                    item.link && route().current(item.link)
                                }
                            />
                        ))}
                    </div>

                    {activePlan && <SubscriptionDetail plan={activePlan} />}
                </div>
            </div>
        </aside>
    );
}
