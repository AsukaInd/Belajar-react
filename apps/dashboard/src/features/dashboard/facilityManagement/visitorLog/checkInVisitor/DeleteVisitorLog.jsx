import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useTranslation } from "react-i18next";
import { IconDelete } from "~/components/icons/IconDelete";

export function DeleteVisitorLog({ isOpen, onClose }) {
   const { t } = useTranslation();

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
            <h1 className="mb-2 mt-5 text-xl">Delete this visitor</h1>
            <p className="mb-4 text-center">
               Are you sure want to delete this visitor? This action can not be
               undone
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
                  className="flex-1 p-button-danger text-sm"
               />
            </div>
         </div>
      </Dialog>
   );
}
