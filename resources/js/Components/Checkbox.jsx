export default function Checkbox({
    name,
    value,
    handleChange,
    className,
    checked,
}) {
    return (
        <input
            type="checkbox"
            name={name}
            value={value}
            checked={checked}
            className={`rounded border-gray-300 text-alerange shadow-sm focus:ring-alerange ${
                className ?? ""
            }`}
            onChange={(e) => handleChange(e)}
        />
    );
}
