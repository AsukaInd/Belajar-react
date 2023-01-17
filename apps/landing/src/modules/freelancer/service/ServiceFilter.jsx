import { Button } from "@/components/ui/Button";
import { FaChevronDown } from "react-icons/fa";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/Popover";
import { useRouter } from 'next/router'
import { useRef } from "react";

export function ServiceFilter() {
   const defaultStyle = 'font-normal py-3 whitespace-pre'
   const router = useRouter()
   const deliveryTimeRef = useRef(null)
   const budgetRef = useRef(null)

   function applyFilter() {
      const deliveryTimeCurrentParams = deliveryTimeRef.current ? deliveryTimeRef.current.value : null
      const deliveryTimeQueryParams = router.query.delivery_time ? router.query.delivery_time : ""
      const deliveryTimeParams = deliveryTimeCurrentParams ?? deliveryTimeQueryParams

      const budgetCurrentParams = budgetRef.current ? budgetRef.current.value : null
      const budgetQueryParams = router.query.budget ? router.query.budget : ""
      const budgetParams = budgetCurrentParams ?? budgetQueryParams

      router.push(`/freelancer/?delivery_time=${deliveryTimeParams}&budget=${budgetParams}`)
   }

   return (
      <div className="mt-[60px] mb-[30px] flex flex-wrap items-center justify-between">
         <div className="flex gap-[20px] overflow-x-auto">
            <Popover>
               <PopoverTrigger>
                  <Button
                     asDiv
                     outlined
                     className={defaultStyle}
                     iconRight={<FaChevronDown className="mt-[2px]" size={12} />}
                  >
                     Service Option
                  </Button>
               </PopoverTrigger>
               <PopoverContent className="w-[170px] mt-5" >
                  <ul className="flex p-4 flex-col">
                     <li>option 1</li>
                     <li>option 2</li>
                     <li>option 3</li>
                  </ul>
               </PopoverContent>
            </Popover>
            <Popover>
               <PopoverTrigger>
                  <Button
                     asDiv
                     outlined
                     className={defaultStyle}
                     iconRight={<FaChevronDown className="mt-[2px]" size={12} />}
                  >
                     Service Detail
                  </Button>
               </PopoverTrigger>
               <PopoverContent className="w-[160px] mt-5" >
                  <ul className="flex p-4 flex-col">
                     <li>filter 1</li>
                     <li>filter 2</li>
                     <li>filter 3</li>
                  </ul>
               </PopoverContent>
            </Popover>
            <Popover>
               <PopoverTrigger>
                  <Button
                     asDiv
                     outlined
                     className={defaultStyle}
                     iconRight={<FaChevronDown className="mt-[2px]" size={12} />}
                  >
                     Budget
                  </Button>
               </PopoverTrigger>
               <PopoverContent className="mt-5 p-3" >
                  <div className="flex flex-col gap-3">
                     <div className="flex">
                        <div className="bg-[#ddd] px-3 rounded-l flex items-center">$</div>
                        <input
                           className="border-[.5px] h-9 border-[#ddd] rounded-r outline-none w-[120px] placeholder:text-sm p-2"
                           placeholder="Example: 100"
                           type="number"
                           min="1"
                           ref={budgetRef}
                        />
                     </div>
                     <Button
                        className="text-[10px] py-[6px] rounded hover:text-blue-custom"
                        onClick={applyFilter}
                     >
                        Apply Filter
                     </Button>
                  </div>
               </PopoverContent>
            </Popover>
            <Popover>
               <PopoverTrigger>
                  <Button
                     asDiv
                     outlined
                     className={defaultStyle}
                     iconRight={<FaChevronDown className="mt-[2px]" size={12} />}
                  >
                     Delivery Time
                  </Button>
               </PopoverTrigger>
               <PopoverContent className="mt-5 p-3" >
                  <div className="flex flex-col gap-3">
                     <div className="flex">
                        <input
                           className="border-[.5px] h-9 border-[#ddd] rounded-l outline-none w-[160px] placeholder:text-sm p-2"
                           placeholder="Example: 7"
                           type="number"
                           min="1"
                           ref={deliveryTimeRef}
                        />
                        <div className="bg-[#ddd] font-medium text-sm px-3 rounded-r flex items-center">Days</div>
                     </div>
                     <Button
                        className="text-[10px] py-[6px] rounded hover:text-blue-custom"
                        onClick={applyFilter}
                     >
                        Apply Filter
                     </Button>
                  </div>
               </PopoverContent>
            </Popover>
         </div>
         <div className="mt-[30px] lg:mt-0 flex justify-between w-full md:w-auto items-center gap-[20px]">
            <span className="font-semibold">Sort By</span>
            <Button
               outlined
               className="font-normal"
               iconRight={<FaChevronDown className="mt-[2px]" size={12} />}
            >
               Best Selling
            </Button>
         </div>
      </div>
   );
}
