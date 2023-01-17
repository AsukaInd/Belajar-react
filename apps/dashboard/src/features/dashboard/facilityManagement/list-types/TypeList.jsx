import { Button } from "primereact/button";
import { AddListDialog } from "./ListDialog/AddListDialog";
import { EditListDialog } from "./ListDialog/EditListDialog";
import { DeleteList } from "./ListDialog/DeleteList";
import { useState } from "react";
import { ErrorMessage } from "~/components/ErrorMessage";
import { useTranslation } from "react-i18next";

export function TypeList(props) {
   const { typeListData, setSelectedListIndex, selectedListIndex, name } =
      props;

   const { t } = useTranslation();
   const [addList, setAddList] = useState(false);
   const [editList, setEditList] = useState(false);
   const [deleteList, setDeleteList] = useState(false);
   const [selected, setSelected] = useState(null);

   function openAddList() {
      setAddList(true);
   }

   function closeAddList() {
      setAddList(false);
   }

   function openEditList(data) {
      setSelected(data);
      setEditList(true);
   }

   function closeEditList() {
      setSelected(null);
      setEditList(false);
   }

   function openDeleteList(data) {
      setSelected(data);
      setDeleteList(true);
   }

   function closeDeleteList() {
      setSelected(null);
      setDeleteList(false);
   }

   return (
      <>
         <div className="flex align-items-center justify-content-between">
            <span>{t("dashboard.type-list.all-lists")}</span>
            <Button
               onClick={openAddList}
               label={t("dashboard.type-list.add-list")}
            />
         </div>
         <ul className="list-none pl-0">
            {typeListData.status === "loading" ? (
               <span>loading...</span>
            ) : typeListData.status === "error" ? (
               <ErrorMessage error={typeListData.error} />
            ) : typeListData.data.data.length > 0 ? (
               typeListData.data.data.map((type, index) => {
                  return (
                     <li
                        className="py-3 flex align-items-center justify-content-between"
                        key={type.id}
                        style={{
                           color: selectedListIndex === index ? "blue" : null,
                           cursor: "pointer",
                        }}
                        onClick={() => {
                           setSelectedListIndex(index);
                        }}
                     >
                        <span>{type.name}</span>
                        <div className="flex align-items-center">
                           {type.is_default && (
                              <span style={{ color: "red" }}>*</span>
                           )}
                           <Button
                              onClick={(e) => {
                                 e.stopPropagation();
                                 openEditList(type);
                              }}
                              className="mx-2 min-w-0"
                           >
                              <i className="pi pi-pencil"></i>
                           </Button>
                           <Button
                              onClick={(e) => {
                                 e.stopPropagation();
                                 openDeleteList(type);
                              }}
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
         <AddListDialog name={name} isOpen={addList} onClose={closeAddList} />
         <EditListDialog
            name={name}
            isOpen={editList}
            onClose={closeEditList}
            editData={selected}
         />
         <DeleteList
            name={name}
            isOpen={deleteList}
            onClose={closeDeleteList}
            id={selected?.id}
         />
      </>
   );
}
