import { OfficerFormDialog } from "./form/OfficerFormDialog";
import { useTranslation } from "react-i18next";
import { useOfficerForm } from "../hooks/officer/useOfficerForm";

export function EditOfficerDialog({ isOpen, onClose, editOfficerData, id }) {
   const { t } = useTranslation();
   const officerForm = useOfficerForm({
      isUpdate: true,
      handleSuccess() {
         onClose();
      },
   });

   function save(newData) {
      officerForm.mutate(newData);
   }

   return (
      <OfficerFormDialog
         title={t("dashboard.officer.edit-officer")}
         isOpen={isOpen}
         onClose={onClose}
         save={save}
         editData={editOfficerData}
         loading={officerForm.isLoading}
         error={officerForm.error}
         status={officerForm.status}
      />
   );
}
