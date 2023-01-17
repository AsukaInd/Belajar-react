import { ListFormDialog } from "./ListFormDialog";
import { useListForm } from "~/features/dashboard/facilityManagement/hooks/list/useListForm";
import { useTranslation } from "react-i18next";

export function EditListDialog({ isOpen, onClose, editData, name }) {
   const { t } = useTranslation();

   const listForm = useListForm({
      name,
      isUpdate: true,
      handleSuccess() {
         onClose();
      },
   });

   function save(newData) {
      listForm.mutate({ dataList: newData, name });
   }

   return (
      <ListFormDialog
         title={t("dashboard.type-list.edit-list")}
         editData={editData}
         isOpen={isOpen}
         onClose={onClose}
         save={save}
         loading={listForm.isLoading}
         error={listForm.error}
         status={listForm.status}
      />
   );
}
