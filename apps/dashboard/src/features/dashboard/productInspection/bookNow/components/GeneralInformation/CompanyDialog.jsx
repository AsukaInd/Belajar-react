import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { useCompany } from "../../../api/services/company.services";

export function CompanyDialog({ isOpen, onClose, isSupplier, setValue }) {
   const [sort, setSort] = useState("");

   function onBulkActionChange(event) {
      setSort(event.value);
   }
   const [{ pageIndex, pageSize }, setPagination] = useState({
      pageIndex: 0,
      pageSize: 10,
   });

   const { status, data, error } = useCompany({
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
         setValue("supplier_id", e.id);
         setValue("si-company", e.company_name);
         setValue("si-phone", e.phone);
         setValue("si-address", e.address);
         setValue("si-address_local", e.address_local);
         setValue("si-country_id", e.country_id);
         setValue("si-province_id", e.province_id);
         setValue("si-city_id", e.city_id);
         setValue("si-postal_code", e.postal_code);
         setValue("si-industry_type_id", e.industry_type_id);
         setValue("si-supplier_type_id", e.supplier_type_id);
      } else {
         setValue("fi-company_name", e.company_name);
         setValue("fi-phone", e.phone);
         setValue("fi-address_factory", e.address);
         setValue("fi-address_factory_local", e.address_local);
         setValue("fi-country_id", e.country_id);
         setValue("fi-province_id", e.province_id);
         setValue("fi-city_id", e.city_id);
         setValue("fi-postal_code", e.postal_code);
         setValue("fi-industry_type_id", e.industry_type_id);
         setValue("fi-supplier_type_id", e.supplier_type_id);
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
            <span className="text-xl font-bold">
               Search and Select {isSupplier ? "Supplier" : "Factory"}
            </span>
            <Button
               icon="pi pi-times"
               className="p-button-rounded p-button-text"
               style={{ color: "var(--accent-text-color)" }}
               onClick={closeDialog}
            />
         </div>
         <div className="text-gray-600">
            Once you the {isSupplier ? "supplier" : "factory"} selected, all of
            previous fields will be filled automatically. You can only choose
            one {isSupplier ? "supplier" : "factory"}
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
                     src="https://picsum.photos/seed/picsum/50/50"
                  />
                  <span className="my-auto">{value.company_name}</span>
                  {/* {sliceText({ text: row.original.name, limit: 16 })} */}
               </div>
               <div className="my-auto">
                  <Button
                     label="Select"
                     className="py-2 px-4 my-auto"
                     onClick={() => handleSelectedData(value)}
                  />
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
