import { forwardRef } from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import clsx from "clsx";
import { FaPlus } from 'react-icons/fa';


export function Accordion({ className, children, ...props }) {
   return (
      <AccordionPrimitive.Root className={clsx(className)} {...props}>
         {children}
      </AccordionPrimitive.Root>
   );
}

export function AccordionItem({ className, children, ...props }) {
   return (
      <AccordionPrimitive.Item
         className={clsx(
            "overflow-hidden mt-px bg-white text-blue-custom my-[40px] border border-[rgba(0,0,0,0.06)]",
            "rounded-[10px] shadow-[0px_40px_60px_rgba(0,90,166,0.1)] py-[40px] px-[60px] text-[18px]",
            "font-medium",
            className
         )}
         {...props}
      >
         {children}
      </AccordionPrimitive.Item>
   );
}

export const AccordionTrigger = forwardRef(({ children, ...props }, forwardedRef) => (
   <AccordionPrimitive.Header className='flex'>
      <AccordionPrimitive.Trigger
         className="flex items-center justify-between text-left w-full"
         ref={forwardedRef}
         {...props}
      >
         {children}
         <FaPlus className='w-[40px]' />
      </AccordionPrimitive.Trigger>
   </AccordionPrimitive.Header>
));

export const AccordionContent = forwardRef(({ children, ...props }, forwardedRef) => (
   <AccordionPrimitive.Content
      ref={forwardedRef}
      className="overflow-hidden text-[1rem]"
      {...props}
   >
      <div className='mt-[25px]'>{children}</div>
   </AccordionPrimitive.Content>
));
