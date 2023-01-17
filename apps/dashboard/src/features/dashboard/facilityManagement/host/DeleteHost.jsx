import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { IconDelete } from "~/components/icons/IconDelete";
import { Toast } from "primereact/toast";
import { useRef } from 'react'
import { useDeleteHost } from "../hooks/host/useDeleteHost";

export function DeleteHost({ id, siteId, isOpen, onClose }) {
   const toast = useRef(null);

   const deleteHost = useDeleteHost({
      id,
      site_id: siteId,
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
   })

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
               <h1 className="mb-2 mt-5 text-xl">Delete this host</h1>
               <p className="mb-4 text-center">
                  Are you sure want to delete this host? This action can not
                  be undone
               </p>
               <div className="w-full flex">
                  <Button
                     className="flex-1 p-button-text mr-3 text-sm"
                     style={{ color: "var(--accent-text-color)" }}
                     label="Cancel"
                     onClick={onClose}
                  />
                  <Button
                     label="Delete"
                     loading={deleteHost.isLoading}
                     onClick={() => deleteHost.mutate()}
                     className="flex-1 p-button-danger text-sm"
                  />
               </div>
            </div>
         </Dialog>
         <Toast ref={toast} position="top-right" />
      </>
   );
}
