import { ContactFormDialog } from "./ContactFormDialog";
import { useContactForm } from "../../api/services/contact.services";

export function EditContactDialog({ isOpen, onClose, editData }) {

   const assetForm = useContactForm({
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
