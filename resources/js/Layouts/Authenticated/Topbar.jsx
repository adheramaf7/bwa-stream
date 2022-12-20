import { Link } from "@inertiajs/inertia-react";
import React from "react";

export default function Topbar({ user }) {
    const [showDropdown, setShowDropdown] = React.useState(true);
    const dropdownTarget = React.useRef();

    const toggleDropdown = () => {
        if (showDropdown) {
            dropdownTarget.current.classList.remove("hidden");
        } else {
            dropdownTarget.current.classList.add("hidden");
        }
        setShowDropdown(!showDropdown);
    };

    return (
        <div className="flex justify-between items-center">
            <input
                type="text"
                className="top-search"
                placeholder="Search movie, cast, genre"
                style={{ backgroundImage: "url('icons/ic_search.svg')" }}
            />
            <div className="flex items-center gap-4 cursor-pointer">
                <span className="text-black text-sm font-medium">
                    Welcome, {user.name}
                </span>
                <div className="collapsible-dropdown flex flex-col gap-2 relative">
                    <div
                        className="outline outline-2 outline-gray-2 p-[5px] rounded-full w-[60px] dropdown-button"
                        onClick={toggleDropdown}
                    >
                        <img
                            src="/images/avatar.png"
                            className="rounded-full object-cover w-full"
                            alt=""
                        />
                    </div>
                    <div
                        className="bg-white rounded-2xl text-black font-medium flex flex-col gap-1 absolute z-[999] right-0 top-[80px] min-w-[180px] hidden overflow-hidden"
                        ref={dropdownTarget}
                    >
                        <Link
                            href={route("dashboard")}
                            className="transition-all hover:bg-sky-100 p-4"
                        >
                            Dashboard
                        </Link>
                        <Link
                            href={null}
                            className="transition-all hover:bg-sky-100 p-4"
                        >
                            Settings
                        </Link>
                        <Link
                            method="post"
                            as="button"
                            href={route("logout")}
                            className="text-left transition-all hover:bg-sky-100 p-4"
                        >
                            Sign Out
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
