import clsx from "clsx";
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

export const RadioGroup = RadioGroupPrimitive.Root;

export function RadioGroupRadio({ children, className, ...props }) {
   return (
      <RadioGroupPrimitive.Item
         className={clsx(
            "bg-white flex items-center justify-center border hover:border-blue-custom",
            "rounded-full h-[20px] w-[20px] relative",
            className
         )}
         {...props}
      >
         {children}
      </RadioGroupPrimitive.Item>
   );
}

export function RadioGroupIndicator({ children, className, ...props }) {
   return (
      <RadioGroupPrimitive.Indicator
         className={clsx(
            "rounded-full h-[10px] w-[10px] bg-blue-custom absolute left-1/2 top-1/2",
            "transform -translate-x-1/2 -translate-y-1/2",
            className
         )}
         {...props}
      >
         {children}
      </RadioGroupPrimitive.Indicator>
   );
}
