import { useState } from "react";
import { VendorFormDialog } from "./VendorFormDialog";
import { useTranslation } from "react-i18next";
import { useVendorForm } from "~/features/dashboard/facilityManagement/hooks/vendor/useVendorForm";

export function AddVendorDialog({ isOpen, onClose }) {
   const { t } = useTranslation();

   const vendorForm = useVendorForm({
      handleSuccess() {
         onClose();
      },
   });

   function save(newData) {
      vendorForm.mutate(newData);
   }

   return (
      <VendorFormDialog 
         isOpen={isOpen} 
         onClose={() => {
            onClose()
            vendorForm.reset();
         }} 
         save={save} 
         loading={vendorForm.isLoading}
         error={vendorForm.error}
         status={vendorForm.status}
      />
   );
}
