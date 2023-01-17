import { Menu } from 'primereact/menu';
import { useRef } from 'react'
import { IconRemoteLight } from '~/components/icons/IconRemoteLight'
import { classNames } from "primereact/utils";

export function EditGroup({group}) {
   const menu = useRef(null);
   const items = [
       {label: 'Group A'},
       {label: 'Group B'},
       {label: 'Group C'}
   ];

   return (
      <>
         <div className="flex items-center">
            <span className={classNames("mr-[12px]", {'text-[#A7A7A7]': !group})}>
               {group || 'No Group'}
            </span>
            <button 
               className="border-none text-[#2854F6] bg-[#F4F6FE] p-[6px] rounded-[4px] flex items-center hover:brightness-[90%] cursor-pointer"
               onClick={(event) => menu.current.toggle(event)} 
               aria-controls="edit-group-menu" 
               aria-haspopup
            >
               <IconRemoteLight/>
               Edit
            </button>
         </div>
         <Menu id="edit-group-menu" model={items} popup ref={menu} />
      </>
   )
}