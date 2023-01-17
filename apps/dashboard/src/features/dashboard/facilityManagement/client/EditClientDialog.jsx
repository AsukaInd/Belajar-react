import { useState } from "react";
import { ClientFormDialog } from "./ClientFormDialog";
import { useTranslation } from "react-i18next";
import { useClientForm } from "../hooks/client/useClientForm";

export function EditClientDialog({
   isOpen,
   onClose,
   editClientData,
   isView,
   editForm,
}) {
   const { t } = useTranslation();
   const clientForm = useClientForm({
      isEdit: true,
      handleSuccess() {
         onClose();
      },
   });
   function save(newData) {
      clientForm.mutate({ ...newData, id: editClientData.id });
   }

   return (
      <ClientFormDialog
         isView={isView}
         title={
            isView
               ? "View Client"
               : t("dashboard.client.dialog-edit-client-title")
         }
         isOpen={isOpen}
         onClose={onClose}
         save={save}
         editData={editClientData}
         error={clientForm.error}
         editForm={editForm}
         status={clientForm.status}
         loading={clientForm.isLoading}
      />
   );
}
