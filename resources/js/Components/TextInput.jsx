import { forwardRef, useEffect, useRef } from "react";
import PropTypes from "prop-types";

const TextInput = forwardRef(
    (
        {
            type = "text",
            name,
            id,
            defaultValue,
            value,
            className,
            variant = "primary",
            autoComplete,
            required,
            isFocused,
            handleChange,
            placeholder,
            isError = false,
        },
        ref
    ) => {
        const input = ref ? ref : useRef();

        useEffect(() => {
            if (isFocused) {
                input.current.focus();
            }
        }, []);

        return (
            <div className="flex flex-col items-start">
                <input
                    type={type}
                    name={name}
                    id={id}
                    value={value}
                    defaultValue={defaultValue}
                    className={`rounded-2xl bg-form-bg py-[13px] px-7 w-full input-${variant} ${
                        isError && "input-error"
                    } ${className ?? ""}`}
                    ref={input}
                    autoComplete={autoComplete}
                    required={required}
                    placeholder={placeholder}
                    onChange={(e) => handleChange(e)}
                />
            </div>
        );
    }
);

TextInput.propTypes = {
    type: PropTypes.oneOf(["text", "email", "password", "number", "file"]),
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    className: PropTypes.string,
    variant: PropTypes.oneOf(["primary", "error", "primary-outline"]),
    autoComplete: PropTypes.string,
    required: PropTypes.bool,
    isFocused: PropTypes.bool,
    handleChange: PropTypes.func,
    placeholder: PropTypes.string,
    isError: PropTypes.bool,
};

export default TextInput;
