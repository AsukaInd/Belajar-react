import { useState } from "react";
import { PreRegisterFormDialog } from "./PreRegisterFormDialog";
import { useTranslation } from "react-i18next";
import { usePreregisterVisitorForm } from "../hooks/preregisterVisitor/usePreregisterVisitorForm";

export function AddPreregisterDialog({ isOpen, onClose }) {
   const { t } = useTranslation();
   const [error, setError] = useState(null)
   const preregisterMutation = usePreregisterVisitorForm({
      handleSuccess(data) {
         if (data.success) {
            onClose()
         } else {
            setError(data)
         }
      },
   });

   function save(newData) {
      preregisterMutation.mutate(newData);
   }

   return (
      <PreRegisterFormDialog 
         isOpen={isOpen} 
         onClose={() => {
            onClose()
            preregisterMutation.reset();
         }} 
         save={save} 
         loading={preregisterMutation.isLoading}
         error={error}
         status={preregisterMutation.status}
      />
   );
}
