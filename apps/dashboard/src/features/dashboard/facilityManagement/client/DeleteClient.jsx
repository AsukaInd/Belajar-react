import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useDeleteClient } from "../hooks/client/useDeleteClient";
import { useTranslation } from "react-i18next";
import { IconDelete } from "~/components/icons/IconDelete";
import { Toast } from "primereact/toast";
import { useRef } from 'react'

export function DeleteClient({ id, isOpen, onClose, bulkDelete, ids }) {
   const { t } = useTranslation();
   const toast = useRef(null);

   const deleteClient = useDeleteClient({
      id,
      onClose,
      onSuccess() {
         onClose();
      },
      onError() {
         toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "Unknown error",
            life: 3000,
         });
      },
   });

   const isDisabled = bulkDelete && Object.keys(ids).length === 0

   return (
      <>
         <Dialog
            modal
            showHeader={false}
            closable={false}
            visible={isOpen}
            className="p-dialog-delete"
            style={{ width: "300px" }}
            onHide={onClose}
            transitionOptions={{
               timeout: 500,
            }}
         >
            <div
               className="flex mt-3 flex-column align-items-center justify-content-center"
               style={{ color: "var(--secondary-menu-text-color)" }}
            >
               <IconDelete solid />
               {bulkDelete ? (
                  <>
                     <h1 className="mb-2 mt-5 text-xl">Delete selected client</h1>
                     <p className="mb-4 text-center">
                        Are you sure want to delete all of selected client? This
                        action can not be undone
                     </p>
                  </>
               ) : (
                  <>
                     <h1 className="mb-2 mt-5 text-xl">Delete this client</h1>
                     <p className="mb-4 text-center">
                        Are you sure want to delete this client? This action can
                        not be undone
                     </p>
                  </>
               )}
               <div className="w-full flex">
                  <Button
                     className="flex-1 p-button-text mr-3 text-sm"
                     style={{ color: "var(--accent-text-color)" }}
                     label="Cancel"
                     onClick={onClose}
                  />
                  <Button
                     label="Delete"
                     disabled={isDisabled}
                     loading={deleteClient.isLoading}
                     onClick={() => deleteClient.mutate()}
                     className="flex-1 p-button-danger text-sm"
                  />
               </div>
            </div>
         </Dialog>
         <Toast ref={toast} position="top-right" />
      </>
   );
}
