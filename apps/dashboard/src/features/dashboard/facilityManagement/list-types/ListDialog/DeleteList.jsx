import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useTranslation } from "react-i18next";
import { useDeleteList } from "~/features/dashboard/facilityManagement/hooks/list/useDeleteList";
import { Toast } from "primereact/toast";
import { useRef } from "react";

export function DeleteList({ id, isOpen, onClose, name }) {
   const { t } = useTranslation();
   const toast = useRef(null);
   const deleteList = useDeleteList({
      id,
      onClose,
      name,
      handleSuccess(data) {
         onClose();
         if (!data.success) {
            toast.current.show({
               severity: "error",
               summary: "Error",
               detail: data.message,
               life: 3000,
            });
         }
      },
      onError(error) {
         toast.current.show({
            severity: "error",
            summary: "Error",
            detail: error.status < 500 ? error.statusText : error.data.message,
            life: 3000,
         });
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
            loading={deleteList.isLoading}
            onClick={() => deleteList.mutate()}
         />
      </>
   );

   return (
      <>
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
               <span>{t("dashboard.type-list.delete-list-confirm")}</span>
            </div>
         </Dialog>
         <Toast ref={toast} position="top-right" />
      </>
   );
}
