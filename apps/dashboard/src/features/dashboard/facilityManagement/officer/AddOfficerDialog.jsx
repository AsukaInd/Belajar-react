import { OfficerFormDialog } from "./form/OfficerFormDialog";
import { useTranslation } from "react-i18next";
import { useOfficerForm } from "../hooks/officer/useOfficerForm";

export function AddOfficerDialog({ isOpen, onClose }) {
   const { t } = useTranslation();
   const officerForm = useOfficerForm({
      handleSuccess() {
         onClose();
      },
   });

   function save(newData) {
      officerForm.mutate(newData);
   }

   return (
      <OfficerFormDialog
         title={t("dashboard.officer.add-officer")}
         isOpen={isOpen}
         onClose={onClose}
         save={save}
         loading={officerForm.isLoading}
         error={officerForm.error}
         status={officerForm.status}
      />
   );
}
