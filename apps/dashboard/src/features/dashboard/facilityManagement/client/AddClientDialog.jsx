import { useState } from "react";
import { ClientFormDialog } from "./ClientFormDialog";
import { useTranslation } from "react-i18next";
import { useClientForm } from "../hooks/client/useClientForm";

export function AddClientDialog({ isOpen, onClose }) {
   const { t } = useTranslation();
   const clientForm = useClientForm({
      handleSuccess() {
         onClose();
      },
   });

   function save(newData) {
      clientForm.mutate(newData);
   }

   return (
      <ClientFormDialog
         title="Add new client"
         isOpen={isOpen}
         onClose={() => {
            onClose();
            clientForm.reset();
         }}
         save={save}
         loading={clientForm.isLoading}
         error={clientForm.error}
         status={clientForm.status}
      />
   );
}
