import { PopoverContent } from "@/components/ui/Popover";
import clsx from "clsx";

export function PopoverMenuContent({ children, ...props }) {
   return (
      <PopoverContent
         contentProps={{
            sideOffset: 15,
            align: "start",
            ...props,
         }}
      >
         <STriangle />
         {children}
      </PopoverContent>
   );
}

function STriangle() {
   return (
      <div className="relative -top-[6px]">
         <div
            className={clsx(
               "absolute top-1/2 left-[40px] transform -translate-y-1/2",
               "w-[0px] h-[0px] border-l-[12px] border-l-transparent",
               "border-r-[12px] border-r-transparent",
               "border-b-[12px] border-b-gray-200"
            )}
         ></div>
         <div
            className={clsx(
               "absolute top-[1px] left-[40px] transform -translate-y-1/2",
               "w-[0px] h-[0px] border-l-[12px] border-l-transparent",
               "border-r-[12px] border-r-transparent",
               "border-b-[12px] border-b-white"
            )}
         ></div>
      </div>
   );
}
