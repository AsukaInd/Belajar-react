import { ContactFormDialog } from "./ContactFormDialog";
import { useAssetForm } from "~/features/dashboard/facilityManagement/hooks/asset/useAssetForm";

export function EditContactDialog({ isOpen, onClose, editData }) {

   const assetForm = useAssetForm({
      isEdit: true,
      handleSuccess() {
         onClose();
      },
   });

   function save(newData) {
      assetForm.mutate({ ...newData, id: editData.id });
   }

   return (
      <ContactFormDialog
         editData={editData}
         isOpen={isOpen}
         onClose={onClose}
         save={save}
         error={assetForm.error}
         loading={assetForm.isLoading}
      />
   );
}
