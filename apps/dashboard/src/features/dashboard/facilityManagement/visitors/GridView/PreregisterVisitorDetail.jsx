import { Button } from "primereact/button";
import { useLocation, useNavigate } from "react-router-dom"
import { IconTime } from "~/components/icons/IconTime";
import { formatDate } from "~/utils/formatDate";
import { IconDelete } from "~/components/icons/IconDelete";
import { IconEdit } from "~/components/icons/IconEdit";
import { Menu } from "primereact/menu";
import { FaEllipsisH , FaPhoneAlt } from "react-icons/fa";
import { useRef, useState } from "react";

import { DeleteVisitor } from "../DeleteVisitor";
import { EditPreregisterDialog } from "../EditPreregisterDialog";

export default function PreregisterVisitorDetail() {
   const menu = useRef(null);
   const { state, pathname } = useLocation()
   const [deleteDialog, setDeleteDialog] = useState(false);
   const [editDialog, setEditDialog] = useState(false);
   const navigate = useNavigate()

   function openEditDialog() {
      setEditDialog(true);
   }

   function closeEditDialog({ isUpdateSuccess } = {}) {
      setEditDialog(false);

      if (isUpdateSuccess) {
         console.log(pathname)
         navigate('/facility-management/visitors/')
      }
   }

   function openDeleteDialog() {
      setDeleteDialog(true);
   }

   function closeDeleteDialog({ isDeleteSuccess } = {}) {
      setDeleteDialog(false);

      if (isDeleteSuccess) {
         navigate('/facility-management/visitors/')
      }
   }

   const items = [
      {
         label: "Edit",
         icon: <IconEdit className="ml-auto flex-order-1" />,
         command: () => openEditDialog(),
      },
      {
         label: "Delete",
         icon: <IconDelete className="ml-auto flex-order-1" />,
         command: () => openDeleteDialog(),
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
                     {state.first_name} {state.last_name}
                  </h1>
                  <Button
                     className="p-button-text p-button-rounded"
                     icon={<FaEllipsisH style={{ height: '30px', width: '30px' }} />}
                     onClick={(event) => {
                        menu.current.toggle(event);
                     }}
                  />
               </div>
            </div>
            <div className="px-[24px] pb-4">
               <div className="py-4 border-solid border-x-0 border-t-0 border-b border-[#e9e9e9]">
                  <h1 className="mb-[12px] text-[16px]">Notes</h1>
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
                     <h1 className="text-[16px] mb-[12px]">Start Date</h1>
                     <span className="flex items-center gap-2">
                        <IconTime />
                        {formatDate(state.start_date)}
                     </span>
                  </div>
                  <div>
                     <h1 className="text-[16px] mb-[12px]">End Date</h1>
                     <span className="flex items-center gap-2">
                        <IconTime />
                        {formatDate(state.end_date)}
                     </span>
                  </div>
                  <div>
                     <h1 className="text-[16px] mb-[12px]">Phone</h1>
                     <span className="flex items-center gap-2 text-[#005AA6]">
                        <FaPhoneAlt />
                        {state.phone}
                     </span>
                  </div>
               </div>
               <div className="py-4 flex flex-column  border-solid border-x-0 border-t-0 border-b border-[#e9e9e9]">
                  <h1 className="text-[16px] mb-[12px]">Host</h1>
                  <div className="flex items-center gap-6">
                     <span>{state?.host?.first_name} {state?.host?.last_name}</span>
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
         <DeleteVisitor
            isOpen={deleteDialog}
            onClose={closeDeleteDialog}
            id={state?.id}
         />
         <EditPreregisterDialog
            isOpen={editDialog}
            onClose={closeEditDialog}
            editData={state}
         />
      </>
   )
}