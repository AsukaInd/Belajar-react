import * as PopoverPrimitive from "@radix-ui/react-popover";
import clsx from "clsx";

export function PopoverContent({ children, contentProps, className }) {
   return (
      <PopoverPrimitive.Portal>
         <PopoverPrimitive.Content
            className={clsx(
               'bg-white shadow-header rounded-md border border-gray-200',
               className
            )}
            {...contentProps}
         >
            {children}
         </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
   );
}

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverClose = PopoverPrimitive.Close;
