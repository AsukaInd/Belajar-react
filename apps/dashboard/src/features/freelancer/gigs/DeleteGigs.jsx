import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useDeleteGigs } from "../hooks/gigs/useDeleteGigs";
import { useTranslation } from "react-i18next";
import { IconDelete } from "~/components/icons/IconDelete";

export function DeleteGigs({ id, isOpen, onClose, bulkDelete }) {
   const { t } = useTranslation();

   const deleteGigs = useDeleteGigs({
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

   return (
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
                  <h1 className="mb-2 mt-5 text-xl">Delete selected gigs</h1>
                  <p className="mb-4 text-center">
                     Are you sure want to delete all of selected gigs? This
                     action can not be undone
                  </p>
               </>
            ) : (
               <>
                  <h1 className="mb-2 mt-5 text-xl">Delete this gigs</h1>
                  <p className="mb-4 text-center">
                     Are you sure want to delete this gigs? This action can
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
                  loading={deleteGigs.isLoading}
                  onClick={() => deleteGigs.mutate()}
                  className="flex-1 p-button-danger text-sm"
               />
            </div>
         </div>
      </Dialog>
   );
}