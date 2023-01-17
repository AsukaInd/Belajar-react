import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useTranslation } from "react-i18next";
import { IconDelete } from "~/components/icons/IconDelete";
import { useDeleteTourStop } from "../hooks/tourStop/useDeleteTourStop";
import { Toast } from "primereact/toast";
import { useRef } from 'react'

export function DeleteTourStop(props) {
   const {
      isOpen,
      onClose,
      isBulkDelete,
      siteId,
      id,
      ids,
      setRowSelection,
   } = props

   const { t } = useTranslation();
   const toast = useRef(null);

   const isDisabled = isBulkDelete && Object.keys(ids).length === 0

   const deleteTourStop = useDeleteTourStop({
      id,
      onClose,
      ids,
      isBulkDelete,
      onSuccess() {
         if(setRowSelection) {
            setRowSelection({})
         }
         onClose();
      },
      onError(error) {
         toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "Unknown error",
            life: 3000,
         });
      },
   });

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
               {isBulkDelete ? (
                  <>
                     <h1 className="mb-2 mt-5 text-xl">
                        Delete selected tour stop
                     </h1>
                     <p className="mb-4 text-center">
                        Are you sure want to delete all of selected tour stop? This
                        action can not be undone
                     </p>
                  </>
               ) : (
                  <>
                     <h1 className="mb-2 mt-5 text-xl">Delete this tour stop</h1>
                     <p className="mb-4 text-center">
                        Are you sure want to delete this tour stop? This action can
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
                     loading={deleteTourStop.isLoading}
                     onClick={() => {
                        deleteTourStop.mutate()
                     }}
                     className="flex-1 p-button-danger text-sm"
                  />
               </div>
            </div>
         </Dialog>
         <Toast ref={toast} position="top-right" />
      </>
   );
}
