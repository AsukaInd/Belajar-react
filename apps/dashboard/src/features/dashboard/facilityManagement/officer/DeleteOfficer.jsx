import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useTranslation } from "react-i18next";
import { useDeleteOfficer } from "../hooks/officer/useDeleteOfficer";

export function DeleteOfficer({ id, isOpen, onClose }) {
   const { t } = useTranslation();
   const deleteOfficer = useDeleteOfficer({
      id,
      onClose,
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
            loading={deleteOfficer.isLoading}
            onClick={() => deleteOfficer.mutate()}
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
            {<span>{t("dashboard.officer.delete-officer-confirm")}</span>}
         </div>
      </Dialog>
   );
}
