import { ListFormDialog } from "./ListFormDialog";
import { useListForm } from "~/features/dashboard/facilityManagement/hooks/list/useListForm";
import { useTranslation } from "react-i18next";

export function AddListDialog({ isOpen, onClose, name }) {
   const { t } = useTranslation();

   const listForm = useListForm({
      name,
      handleSuccess() {
         onClose();
      },
   });

   function save(newData) {
      listForm.mutate({
         dataList: newData,
         name,
      });
   }

   return (
      <ListFormDialog
         title={t("dashboard.type-list.add-list")}
         isOpen={isOpen}
         onClose={onClose}
         save={save}
         loading={listForm.isLoading}
         error={listForm.error}
         status={listForm.status}
      />
   );
}
