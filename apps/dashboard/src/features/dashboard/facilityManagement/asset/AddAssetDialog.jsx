import { useState } from "react";
import { AssetFormDialog } from "./AssetFormDialog";
import { useTranslation } from "react-i18next";
import { useAssetForm } from "~/features/dashboard/facilityManagement/hooks/asset/useAssetForm";

export function AddAssetDialog({ isOpen, onClose }) {
   const { t } = useTranslation();

   const assetForm = useAssetForm({
      handleSuccess() {
         onClose();
      },
   });

   function save(newData) {
      assetForm.mutate(newData);
   }

   return (
      <AssetFormDialog 
         isOpen={isOpen} 
         onClose={() => {
            onClose()
            assetForm.reset();
         }} 
         save={save}
         loading={assetForm.isLoading}
         error={assetForm.error}
         status={assetForm.status}
      />
   );
}
