import clsx from "clsx";
import Link from "next/link";

const btnStyle = {
   default: "flex items-center font-[600] py-3 px-6 flex items-center justify-between",
   outlined: "border border-[#DDDDDD] rounded-full hover:bg-blue-custom/10",
   contained: "bg-blue-custom text-white border border-transparent shadow-btn-shadow rounded-full hover:opacity-[80%]"
}

function ButtonLayout({ children, iconLeft, iconRight }) {
   return (
      <>
         {iconLeft ? <div className="mr-[10px]">{iconLeft}</div> : null}
         <span className="mx-auto">{children}</span>
         {iconRight ? <div className="ml-[10px]">{iconRight}</div> : null}
      </>
   );
}

export function Button({
   iconLeft,
   iconRight,
   children,
   className,
   outlined,
   contained,
   asDiv,
   ...props
}) {

   const defaultClassName = clsx(
      btnStyle.default,
      { [btnStyle.outlined]: outlined },
      { [btnStyle.contained]: contained },
      className
   )

   const layout = (
      <ButtonLayout iconRight={iconRight} iconLeft={iconLeft}>
         {children}
      </ButtonLayout>
   )

   if (asDiv) {
      return (
         <div
            className={defaultClassName}
            {...props}
         >
            {layout}
         </div>
      )
   }

   return (
      <button
         className={defaultClassName}
         {...props}
      >
         {layout}
      </button>
   );
}

export function ButtonLink({ iconLeft, iconRight, children, className, href, contained, outlined }) {
   return (
      <Link href={href}>
         <a
            className={clsx(
               btnStyle.default,
               { [btnStyle.outlined]: outlined },
               { [btnStyle.contained]: contained },
               className
            )}
         >
            <ButtonLayout iconRight={iconRight} iconLeft={iconLeft}>
               {children}
            </ButtonLayout>
         </a>
      </Link>
   );
}
