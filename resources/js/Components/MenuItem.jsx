import { Link } from "@inertiajs/inertia-react";

export default function MenuItem({
    link,
    icon,
    text,
    isActive,
    method = "get",
}) {
    return (
        <Link
            href={link}
            method={method}
            className={`side-link ${isActive && "active"}`}
            as="button"
        >
            {icon}
            {text}
        </Link>
    );
}
