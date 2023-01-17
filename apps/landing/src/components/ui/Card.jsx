import clsx from "clsx";

export function Card({ children, className }) {
    return (
        <div
            className={clsx(
                "bg-white rounded-[10px] border border-[#dddddd] shadow-[4px_10px_40px_rgba(0,0,0,0.06)]",
                className
            )}
        >
            {children}
        </div>
    )
}