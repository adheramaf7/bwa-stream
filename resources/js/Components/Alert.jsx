export default function Alert({ className, children, type = "info" }) {
    const color = () => {
        if (type == "info") {
            return "blue";
        }

        if (type == "success") {
            return "green";
        }

        if (type == "error") {
            return "red";
        }
    };

    return (
        <div
            className={`flex bg-${color()}-100 rounded p-4 text-sm text-${color()}-700 ${
                className ?? ""
            }`}
        >
            {children}
        </div>
    );
}
