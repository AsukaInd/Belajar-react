import { TypeFormDialog } from "./TypeFormDialog";
import { useTypeForm } from "~/features/dashboard/facilityManagement/hooks/type/useTypeForm";
import { useTranslation } from "react-i18next";

export function AddTypeDialog({ isOpen, onClose, name }) {
   const { t } = useTranslation();

   const typeForm = useTypeForm({
      name,
      handleSuccess() {
         onClose();
      },
   });

   function save(newData) {
      typeForm.mutate({
         dataType: newData,
         name,
      });
   }

   return (
      <TypeFormDialog
         title={t("dashboard.type-list.add-type")}
         isOpen={isOpen}
         onClose={onClose}
         save={save}
         loading={typeForm.isLoading}
         error={typeForm.error}
         status={typeForm.status}
      />
   );
}
