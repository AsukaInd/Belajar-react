import clsx from "clsx";

export function Container({ children, className }) {
   return <div className={clsx("container px-4 lg:px-[100px] mx-auto", className)}>{children}</div>;
}
