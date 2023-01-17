import { useState } from "react";
import { VendorFormDialog } from "./VendorFormDialog";
import { useTranslation } from "react-i18next";
import { useVendorForm } from "~/features/dashboard/facilityManagement/hooks/vendor/useVendorForm";

export function EditVendorDialog({ isOpen, onClose, editData }) {
   const { t } = useTranslation();

   const vendorForm = useVendorForm({
      isEdit: true,
      handleSuccess() {
         onClose();
      },
   });

   function save(newData) {
      vendorForm.mutate({ ...newData, id: editData.id });
   }

   return (
      <VendorFormDialog
         isOpen={isOpen}
         onClose={onClose}
         save={save}
         editData={editData}
         error={vendorForm.error}
         loading={vendorForm.isLoading}
      />
   );
}
