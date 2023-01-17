import { useState } from "react";
import { useHostForm } from "../hooks/host/useHostForm";
import { HostFormDialog } from "./HostFormDialog";

export function EditHostDialog({ isOpen, onClose, editData }) {
   const [errorMessage, setErrorMessage] = useState(null)
   const hostForm = useHostForm({
      onSuccess(data) {
         if (data.success) {
            onClose();
         } else {
            setErrorMessage(data)
         }
      },
      isUpdate: true,
   })

   function save(newHostData) {
      hostForm.mutate(newHostData);
   }

   return (
      <HostFormDialog
         editData={editData}
         isOpen={isOpen}
         onClose={onClose}
         save={save}
         loading={hostForm.isLoading}
         error={errorMessage}
         success={hostForm?.data?.success}
      />
   );
}
