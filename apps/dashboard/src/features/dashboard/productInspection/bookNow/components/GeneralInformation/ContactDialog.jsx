import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { useContact } from "../../../api/services/contact.services";

export function ContactDialog({ isOpen, onClose, isSupplier, setValue }) {
   const [sort, setSort] = useState("");

   function onBulkActionChange(event) {
      setSort(event.value);
   }
   const [{ pageIndex, pageSize }, setPagination] = useState({
      pageIndex: 0,
      pageSize: 10,
   });

   const { status, data, error } = useContact({
      perPage: pageSize,
      page: pageIndex,
   });
   function closeDialog() {
      onClose();
      if (!editData) {
         reset();
      }
   }
   const handleSelectedData = (e) => {
      if (isSupplier) {
         setValue("sc-firstname", e.first_name);
         setValue("sc-lastname", e.last_name);
         setValue("sc-name_local", e.contact_name);
         setValue("sc-email", e.email);
         setValue("sc-phone_supplier", e.phone_number);
         setValue("sc-mobile", e.mobile);
      } else {
         setValue("fc-firstname", e.first_name);
         setValue("fc-lastname", e.last_name);
         setValue("fc-name_local", e.contact_name);
         setValue("fc-email", e.email);
         setValue("fc-phone", e.phone_number);
         setValue("fc-mobile_factory", e.mobile_factory);
      }
   };

   return (
      <Dialog
         modal
         visible={isOpen}
         style={{ width: "470px" }}
         showHeader={false}
         closable={false}
         className="p-fluid asset-form-dialog"
         onHide={closeDialog}
         transitionOptions={{
            timeout: 500,
         }}
      >
         <div
            className="flex align-items-center justify-content-between pb-2 mt-2 mb-4"
            style={{ borderColor: "var(--gray-50)" }}
         >
            <span className="text-xl font-bold">Search and Select Contact</span>
            <Button
               icon="pi pi-times"
               className="p-button-rounded p-button-text"
               style={{ color: "var(--accent-text-color)" }}
               onClick={closeDialog}
            />
         </div>
         <div className="text-gray-600">
            Once you the supplier selected, all of previous fields will be
            filled automatically. You can only choose one supplier
         </div>

         {/* <InputText
            placeholder="Type supplier name here"
            className="w-full mt-4"
         /> */}
         {data?.data?.data?.map((value, index) => (
            <div className="flex justify-between my-4" onClick={onClose}>
               <div className="flex gap-4 font-medium">
                  <img
                     className="rounded-full h-12"
                     src="https://picsum.photos/id/1/50/50"
                  />
                  <span className="my-auto">{value.contact_name}</span>
                  {/* {sliceText({ text: row.original.name, limit: 16 })} */}
               </div>
               <div className="my-auto">
                  <Button label="Select" className="py-2 px-4 my-auto" 
                     onClick={() => handleSelectedData(value)} />
               </div>
            </div>
         ))}
         <div className="flex flex-row-reverse mt-4">
            <button
               type="button"
               className="bg-white text-600 border-gray-200 rounded border-1 px-3 py-2 cursor-pointer"
               onClick={onClose}
            >
               Cancel
            </button>
         </div>
      </Dialog>
   );
}
