import { Button } from "primereact/button";
import { AddTypeDialog } from "./TypesDialog/AddTypeDialog";
import { EditTypeDialog } from "./TypesDialog/EditTypeDialog";
import { DeleteType } from "./TypesDialog/DeleteType";
import { useState } from "react";
import { ErrorMessage } from "~/components/ErrorMessage";
import { useTranslation } from "react-i18next";

export function AllTypes({ allTypesData, name }) {
   const { t } = useTranslation();
   const [addType, setAddType] = useState(false);
   const [editType, setEditType] = useState(false);
   const [deleteType, setDeleteType] = useState(false);
   const [selected, setSelected] = useState(null);

   function openAddType() {
      setAddType(true);
   }

   function closeAddType() {
      setAddType(false);
   }

   function openEditType(data) {
      setSelected(data);
      setEditType(true);
   }

   function closeEditType() {
      setSelected(null);
      setEditType(false);
   }

   function openDeleteType(data) {
      setSelected(data);
      setDeleteType(true);
   }

   function closeDeleteType() {
      setSelected(null);
      setDeleteType(false);
   }

   return (
      <>
         <div className="flex align-items-center justify-content-between">
            <span>{t("dashboard.type-list.all-types")}</span>
            <Button
               onClick={openAddType}
               label={t("dashboard.type-list.add-type")}
            />
         </div>
         <ul className="list-none pl-0">
            {allTypesData.status === "loading" ? (
               <span>loading...</span>
            ) : allTypesData.status === "error" ? (
               <ErrorMessage error={allTypesData.error} />
            ) : allTypesData.data.data.length > 0 ? (
               allTypesData.data.data.map((type) => {
                  return (
                     <li
                        className="py-3 flex align-items-center justify-content-between"
                        key={type.id}
                     >
                        <span>{type.name}</span>
                        <div className="flex align-items-center">
                           <div
                              style={{
                                 width: "24px",
                                 height: "24px",
                                 background: type.color,
                              }}
                           ></div>
                           <Button
                              onClick={() => openEditType(type)}
                              className="mx-2 min-w-0"
                           >
                              <i className="pi pi-pencil"></i>
                           </Button>
                           <Button
                              onClick={() => openDeleteType(type)}
                              className="min-w-0"
                           >
                              <i className="pi pi-trash"></i>
                           </Button>
                        </div>
                     </li>
                  );
               })
            ) : (
               <span>not found</span>
            )}
         </ul>
         <AddTypeDialog name={name} isOpen={addType} onClose={closeAddType} />
         <EditTypeDialog
            name={name}
            isOpen={editType}
            onClose={closeEditType}
            editData={selected}
         />
         <DeleteType
            name={name}
            isOpen={deleteType}
            onClose={closeDeleteType}
            id={selected?.id}
         />
      </>
   );
}
