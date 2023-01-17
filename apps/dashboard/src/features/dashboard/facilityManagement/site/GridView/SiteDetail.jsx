import { Button } from "primereact/button";
import { Link, useLocation, useNavigate } from "react-router-dom"
import { IconDelete } from "~/components/icons/IconDelete";
import { IconEdit } from "~/components/icons/IconEdit";
import { Menu } from "primereact/menu";
import { FaEllipsisH, FaCalendarAlt, FaCity, FaGlobeAsia } from "react-icons/fa";
import { useRef, useState } from "react";
import { IconLocation } from '~/components/icons/IconLocation'
import { EditSiteDialog } from "../EditSiteDialog";
import { DeleteSite } from "../DeleteSite";

export default function SiteDetail() {
   const menu = useRef(null);
   const { state } = useLocation()
   const navigate = useNavigate()
   const [editSiteDialog, setEditSiteDialog] = useState(false);
   const [deleteDialog, setDeleteDialog] = useState(false);

   const items = [
      {
         label: "Edit",
         icon: <IconEdit className="ml-auto flex-order-1" />,
         command() {
            openEditSiteDialog();
         },
      },
      {
         label: "Delete",
         icon: <IconDelete className="ml-auto flex-order-1" />,
         command() {
            openDeleteDialog();
         },
      },
   ];

   if (state === null) {
      return <p className="h-full grid place-content-center">Not Found</p>
   }

   function openEditSiteDialog() {
      setEditSiteDialog(true);
   }

   function closeEditSiteDialog({ isUpdateSuccess } = {}) {
      setEditSiteDialog(false);

      if (isUpdateSuccess) {
         navigate('/facility-management/site/')
      }
   }

   function openDeleteDialog() {
      setDeleteDialog(true);
   }

   function closeDeleteDialog({ isDeleteSuccess } = {}) {
      setDeleteDialog(false);

      if (isDeleteSuccess) {
         navigate('/facility-management/site/')
      }
   }

   return (
      <>
         <div>
            <div className="px-[24px] py-[16px] sticky top-0 bg-[#f4f4f4] z-1">
               <div className="flex items-center justify-between">
                  <h1 className="mb-0 text-[21px] font-[500] mr-4">
                     {state.site_name}
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
               <div className="py-4 border-solid border-x-0  border-t-0 border-b border-[#e9e9e9]">
                  <div className="flex gap-3">
                     <Link
                        to={`/facility-management/site/tour-stops?siteId=${state.id}`}
                        className="total-user-view-button"
                     >
                        <IconLocation className="mr-1" />
                        Add Tour Stop
                     </Link>
                  </div>
               </div>
               <div className="py-4 flex gap-12  border-solid border-x-0 border-t-0 border-b border-[#e9e9e9]">
                  <div>
                     <h1 className="text-[16px] mb-[12px]">City</h1>
                     <span className="flex items-center gap-2">
                        <FaCity />
                        {state.city}
                     </span>
                  </div>
                  <div>
                     <h1 className="text-[16px] mb-[12px]">Country</h1>
                     <span className="flex items-center gap-2">
                        <FaGlobeAsia />
                        {state.country}
                     </span>
                  </div>
                  <div>
                     <h1 className="text-[16px] mb-[12px]">Tour Stop</h1>
                     <span className="flex items-center gap-2">
                        <IconLocation />
                        {state.tour_stops.length}
                     </span>
                  </div>
                  <div>
                     <h1 className="text-[16px] mb-[12px]">Date Created</h1>
                     <span className="flex items-center gap-2">
                        <FaCalendarAlt />
                        {state.tour_stops.length}
                     </span>
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
         <EditSiteDialog
            isOpen={editSiteDialog}
            onClose={closeEditSiteDialog}
            editData={state}
         />
         <DeleteSite
            isOpen={deleteDialog}
            onClose={closeDeleteDialog}
            id={state.id}
         />
      </>
   )
}