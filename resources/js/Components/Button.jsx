import React from "react";
import PropType from "prop-types";

export default function Button({
    type = "submit",
    variant = "primary",
    className,
    processing,
    children,
    onClick,
}) {
    return (
        <button
            type={type}
            className={`rounded-2xl py-[13px] text-center w-full ${
                processing && "opacity-30"
            } btn-${variant} ${className ?? ""}`}
            disabled={processing}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

Button.propTypes = {
    type: PropType.oneOf(["button", "submit"]),
    className: PropType.string,
    processing: PropType.bool,
    children: PropType.node,
    variant: PropType.oneOf([
        "primary",
        "warning",
        "danger",
        "light-outline",
        "white-outline",
    ]),
    onClick: PropType.func,
};
