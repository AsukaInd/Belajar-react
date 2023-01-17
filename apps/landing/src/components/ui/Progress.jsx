import * as ProgressPrimitive from '@radix-ui/react-progress';
import clsx from "clsx";

export function Progress({ children, className, ...props }) {
   return (
      <ProgressPrimitive.Root
         className={clsx(
            "relative overflow-hidden bg-blue-custom/20 rounded-full w-full h-[14px]",
            className
         )}
         {...props}
      >
         {children}
      </ProgressPrimitive.Root>
   );
}

export function ProgressIndicator({ children, className, value, style, ...props }) {
   return (
      <ProgressPrimitive.Indicator
         className={clsx(
            "h-full w-full bg-blue-custom",
            className
         )}
         style={{
            transform: `translateX(-${100 - value}%)`,
            ...style
         }}
         {...props}
      >
         {children}
      </ProgressPrimitive.Indicator>
   );
}
