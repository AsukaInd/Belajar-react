import { Button } from "primereact/button";
import { useLocation } from "react-router-dom"
import { IconLocation } from "~/components/icons/IconLocation";
import { IconTime } from "~/components/icons/IconTime";
import { formatDate } from "~/utils/formatDate";
import { IconDelete } from "~/components/icons/IconDelete";
import { IconEdit } from "~/components/icons/IconEdit";
import { Menu } from "primereact/menu";
import { FaEllipsisH } from "react-icons/fa";
import { useRef } from "react";
import { IconUserCircle } from '~/components/icons/IconUserCircle'
import { IconLocalPin } from '~/components/icons/IconLocalPin'

export default function VisitorCheckOutDetail() {
   const menu = useRef(null);
   const { state } = useLocation()

   const items = [
      {
         label: "Edit",
         icon: <IconEdit className="ml-auto flex-order-1" />,
         command: null,
      },
      {
         label: "Delete",
         icon: <IconDelete className="ml-auto flex-order-1" />,
         command: null,
      },
   ];

   if (state === null) {
      return <p className="h-full grid place-content-center">Not Found</p>
   }

   return (
      <>
         <div>
            <div className="px-[24px] py-[16px] sticky top-0 bg-[#f4f4f4] z-1">
               <div className="flex items-center justify-between">
                  <h1 className="mb-0 text-[21px] font-[500] mr-4">
                     {state?.first_name} {state?.last_name}
                  </h1>
                  {/* <Button
                     className="p-button-text p-button-rounded"
                     icon={<FaEllipsisH style={{ height: '30px', width: '30px' }} />}
                     onClick={(event) => {
                        menu.current.toggle(event);
                     }}
                  /> */}
               </div>
            </div>
            <div className="px-[24px] pb-4">
               <div className="py-4 border-solid border-x-0 border-t-0 border-b border-[#e9e9e9]">
                  <h1 className="mb-[12px] text-[16px]">Out Notes</h1>
                  <p className="text-[#7a7a7a]">{state.notes}</p>
               </div>
               <div className="py-4 border-solid border-x-0 border-t-0 border-b border-[#e9e9e9]">
                  <h1 className="mb-[12px] text-[16px]">Uploaded Image</h1>
                  <div className="flex gap-[24px]">
                     {state.files?.map((image, index) => (
                        <img
                           key={index}
                           src={image}
                           className="rounded-lg object-contain"
                           height="168"
                           width="168"
                        />
                     ))}
                  </div>
               </div>
               <div className="py-4 flex gap-12  border-solid border-x-0 border-t-0 border-b border-[#e9e9e9]">
                  <div>
                     <h1 className="text-[16px] mb-[12px]">Out Date</h1>
                     <span className="flex items-center gap-2">
                        <IconTime />
                        {formatDate(state.date_out)}
                     </span>
                  </div>
                  <div>
                     <h1 className="text-[16px] mb-[12px]">Company</h1>
                     <span className="flex items-center gap-2">
                        <IconUserCircle />
                        {state.company}
                     </span>
                  </div>
                  <div>
                     <h1 className="text-[16px] mb-[12px]">Destination</h1>
                     <span className="flex items-center gap-2 text-[#005AA6]">
                        <IconLocation />
                        {state.destination}
                     </span>
                  </div>
                  <div>
                     <h1 className="text-[16px] mb-[12px]">Site</h1>
                     <span className="flex items-center gap-2 text-[#005AA6]">
                        <IconLocalPin />
                        {state.site.site_name}
                     </span>
                  </div>
               </div>
               <div className="py-4 flex flex-column  border-solid border-x-0 border-t-0 border-b border-[#e9e9e9]">
                  <h1 className="text-[16px] mb-[12px]">Signed Out By</h1>
                  <div className="flex items-center gap-6">
                     <span>{state?.officer?.first_name} {state?.officer?.last_name}</span>
                  </div>
               </div>
            </div>
         </div>
         <Menu
            popup
            style={{ maxWidth: "125px" }}
            model={items}
            ref={menu}
            id="more-options"
         />
      </>
   )
}