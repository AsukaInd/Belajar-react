import { FaChevronDown } from "react-icons/fa";
import { classNames } from "primereact/utils";
import { Menu } from 'primereact/menu';
import { useRef } from 'react'

export function UserStatus({status}) {
   const menu = useRef(null);
   const items = [
       {label: 'Active'},
       {label: 'Deactive'},
   ];

   return (
      <>
         <div className="flex items-center gap-4">
            <span
               className={classNames(
                  "py-[4px] px-[8px] rounded-[6px]",
                  [status.toLowerCase() === 'active' ? 'text-[#61B15A] bg-[#F5FBF4]' : 'bg-[#F6E6E6] text-[#EB4646]']
               )}
            >
               {status}
            </span>
            <button 
               className={classNames(
                  "rounded-[4px] h-[24px] w-[24px] flex items-center justify-center border-none",
                  "cursor-pointer hover:brightness-[90%] flex items-center"
               )}
               onClick={(event) => menu.current.toggle(event)} 
               aria-controls="change-status" 
               aria-haspopup
            >
               <FaChevronDown size={10}/>
            </button>
         </div>
         <Menu id="change-status" model={items} popup ref={menu} />
      </>
   )
}