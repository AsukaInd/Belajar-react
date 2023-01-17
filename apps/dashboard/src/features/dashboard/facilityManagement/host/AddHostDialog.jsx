import { useState } from "react";
import { useHostForm } from "../hooks/host/useHostForm";
import { HostFormDialog } from "./HostFormDialog";

export function AddHostDialog({ isOpen, onClose }) {
   const [errorMessage, setErrorMessage] = useState(null)
   const hostForm = useHostForm({
      onSuccess(data) {
         if (data.success) {
            onClose();
         } else {
            setErrorMessage(data)
         }
      },
   })

   function save(newHostData) {
      hostForm.mutate(newHostData);
   }

   return (
      <HostFormDialog
         isOpen={isOpen}
         onClose={onClose}
         save={save}
         loading={hostForm.isLoading}
         error={errorMessage}
         success={hostForm?.data?.success}
      />
   );
}
