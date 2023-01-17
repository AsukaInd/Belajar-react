import { Dialog } from "primereact/dialog";
import { useTranslation } from "react-i18next";
import { IconDelete } from "~/components/icons/IconDelete";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { RegularButton } from "../../../../../components/product-inspection/Button";

export function AddEditCountry({
   isOpen,
   onClose,
   handleSubmit,
   onSubmit,
   isEdit,
   children,
   title,
}) {
   const { t } = useTranslation();
   const toast = useRef(null);

   return (
      <>
         <Dialog
            modal
            showHeader={false}
            closable={false}
            visible={isOpen}
            className="p-dialog-delete"
            style={{ minWidth: '300px' }}
            onHide={onClose}
            transitionOptions={{
               timeout: 500,
            }}
         >
            <h6>{title}</h6>
            {children}
            <div className="flex flex-row-reverse gap-4">
               <div>
                  <RegularButton
                     title={isEdit ? "Save" : "Create"}
                     onClick={handleSubmit(onSubmit)}
                     className="flex-1 p-button-danger text-sm !bg-blue-2 hover:!bg-blue-600"
                  />
               </div>
               <div>
                  <RegularButton
                     className="bg-gray-500 hover:!bg-gray-400  "
                     title="Cancel"
                     onClick={onClose}
                  />
               </div>
            </div>
         </Dialog>
         <Toast ref={toast} position="top-right" />
      </>
   );
}
