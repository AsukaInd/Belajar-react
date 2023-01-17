import { classNames } from "primereact/utils";

export function RoundedIconWithBg({ textColor, bgColor, icon }) {
    return (
        <div
            className={classNames(
                "rounded-full h-[36px] w-[36px] flex items-center justify-center",
                textColor,
                bgColor
            )}
        >
            {icon}
        </div>
    );
}
