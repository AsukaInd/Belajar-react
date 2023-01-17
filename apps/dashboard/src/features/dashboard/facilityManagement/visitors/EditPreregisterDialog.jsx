import { useState } from "react";
import { PreRegisterFormDialog } from "./PreRegisterFormDialog";
import { useTranslation } from "react-i18next";
import { usePreregisterVisitorForm } from "../hooks/preregisterVisitor/usePreregisterVisitorForm";

export function EditPreregisterDialog({ isOpen, onClose, editData }) {
   const { t } = useTranslation();
   const [error, setError] = useState(null)
   const preregisterMutation = usePreregisterVisitorForm({
      isEdit: true,
      handleSuccess(data) {
         if (data.success) {
            onClose({ isUpdateSuccess: true })
         } else {
            setError(data)
         }
      },
   });

   function save(newData) {
      preregisterMutation.mutate({ ...newData, id: editData.id });
   }

   return (
      <PreRegisterFormDialog
         isOpen={isOpen}
         onClose={() => {
            onClose()
            setError(null)
            preregisterMutation.reset();
         }}
         save={save}
         loading={preregisterMutation.isLoading}
         error={error}
         status={preregisterMutation.status}
         editData={editData}
         title="Edit Pre Register"
      />
   );
}
