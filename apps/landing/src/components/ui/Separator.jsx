import * as SeparatorPrimitive from '@radix-ui/react-separator';
import clsx from "clsx";

export function Separator({ orientation = 'horizontal', className, ...props }) {
   return (
      <SeparatorPrimitive.Root
         className={clsx(
            "bg-[#E9E9E9]",
            [orientation === 'horizontal' ? "w-full h-[1px]" : "h-full w-[1px]"],
            className
         )}
         orientation={orientation}
         {...props}
      />
   );
}
