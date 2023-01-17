import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useTranslation } from "react-i18next";
import { useDeleteType } from "~/features/dashboard/facilityManagement/hooks/type/useDeleteType";

export function DeleteType({ id, isOpen, onClose, name }) {
   const { t } = useTranslation();
   const deleteType = useDeleteType({
      id,
      onClose,
      name,
      handleSuccess() {
         onClose();
      },
      onError(error) {
         if (error.status >= 500) {
            // toast error
         } else {
            // toast error
         }
      },
   });

   const deleteDialogFooter = (
      <>
         <Button
            label={t("common.no")}
            icon="pi pi-times"
            className="p-button-text"
            onClick={onClose}
         />
         <Button
            label={t("common.yes")}
            icon="pi pi-check"
            className="p-button-text"
            loading={deleteType.isLoading}
            onClick={() => deleteType.mutate()}
         />
      </>
   );

   return (
      <Dialog
         visible={isOpen}
         style={{ width: "450px" }}
         header={t("common.confirm")}
         modal
         footer={deleteDialogFooter}
         onHide={onClose}
      >
         <div className="flex align-items-center justify-content-center">
            <i
               className="pi pi-exclamation-triangle mr-3"
               style={{ fontSize: "2rem" }}
            />
            <span>{t("dashboard.type-list.delete-type-confirm")}</span>
         </div>
      </Dialog>
   );
}
