import { useTranslation } from "react-i18next";
import { useAssetForm } from "~/features/dashboard/facilityManagement/hooks/asset/useAssetForm";
import { useContactForm } from "../../api/services/contact.services";
import {  ContactFormDialog } from "./ContactFormDialog";

export function AddContactDialog({ isOpen, onClose }) {
   const { t } = useTranslation();

   const contactForm = useContactForm({
      handleSuccess() {
         onClose();
      },
   });

   function save(newData) {
      contactForm.mutate(newData);
   }

   return (
      <ContactFormDialog
         isOpen={isOpen} 
         onClose={() => {
            onClose()
            contactForm.reset();
         }} 
         save={save}
         loading={contactForm.isLoading}
         error={contactForm.error}
         status={contactForm.status}
      />
   );
}
