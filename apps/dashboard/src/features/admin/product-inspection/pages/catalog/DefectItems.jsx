import React, { useState, useEffect } from "react";
import TableInspection from "../../../../../components/product-inspection/TableInspection";
import apiDefectItem from "./../../api/catalog/apiDefectItem";
import { DeleteModal } from "../../../../../components/product-inspection/DeleteModal";
import { AddEditModal } from "../../../../../components/product-inspection/AddEditModal";
import { useForm } from "react-hook-form";
import TextInput from "../../../../../components/product-inspection/TextInput";

function DefectItems() {
   const [AddEditDialog, setAddEditDialog] = useState(false);
   const [isEdit, setIsEdit] = useState(false);
   const [deleteDialog, setDeleteDialog] = useState(false);
   const [selected, setSelected] = useState(null);
   const [renderData, setRenderData] = useState(false);
   const { register, handleSubmit, setValue } = useForm();

   function openEditUserDialog(data) {
      setSelected(data);
      setAddEditDialog(true);
      setValue("name", data.name);
      setIsEdit(true);
   }

   function openDeleteDialog(data) {
      setSelected(data);
      setDeleteDialog(true);
   }

   function closeDeleteDialog() {
      setSelected(null);
      setDeleteDialog(false);
   }
   const columns = [
      {
         header: "Defect Item",
         accessorKey: "name",
      },
      {
        header: "Defect Code",
        accessorKey: "name",
     }
   ];

   const addData = () => {
      setValue("name", "");
      setAddEditDialog(true);
      setIsEdit(false);
   };

   const deleteData = async (id) => {
      await apiDefectItem.deleteData(id).then(() => {
         setRenderData(!renderData);
         closeDeleteDialog();
      });
   };

   const onSubmit = async (data) => {
      if (isEdit) {
         data._method = "PUT";
         await apiDefectItem.updateData(selected.id, data).then(() => {
            setRenderData(!renderData);
            setAddEditDialog(false);
            setIsEdit(false);
         });
      } else {
         await apiDefectItem.addData(data).then(() => {
            setRenderData(!renderData);
            setAddEditDialog(false);
         });
      }
   };

   return (
      <>
         <TableInspection
            title="Defect Items"
            addBtn="Add Defect"
            api={apiDefectItem}
            renderData={renderData}
            addData={addData}
            columns={columns}
            editData={(e) => openEditUserDialog(e)}
            delete={(e) => openDeleteDialog(e)}
            style={{
               "--nth1Width": "50px",
               "--nth2Width": "100px",
               "--nth2-font-weight": "normal",
               "--totalColumn": "9",
            }}
         />
         <AddEditModal
            isOpen={AddEditDialog}
            onClose={() => setAddEditDialog(false)}
            isEdit={isEdit}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            title={isEdit ? "Edit Defect Item" : "Create Defect Item"}
         >
            <form onSubmit={handleSubmit(onSubmit)} className="pb-4">
               <div className="flex flex-col gap-5">
                  <TextInput
                     type="text"
                     label="Defect Code"
                     isRequired
                     placeholder="Input Defect"
                     register={register("name", { required: true })}
                  />
                  <TextInput
                     type="text"
                     label="Defect Items"
                     isRequired
                     placeholder="Input Defect"
                     register={register("name", { required: true })}
                  />
                  <TextInput
                     type="text"
                     label="Defect Category"
                     isRequired
                     placeholder="Input Defect"
                     register={register("name", { required: true })}
                  />
                  <TextInput
                     type="text"
                     label="Defect Level"
                     isRequired
                     placeholder="Input Defect"
                     register={register("name", { required: true })}
                  />
               </div>
            </form>
         </AddEditModal>
         <DeleteModal
            isOpen={deleteDialog}
            onClose={closeDeleteDialog}
            onDelete={deleteData}
            selectedData={selected?.id}
         />
      </>
   );
}

export default DefectItems;
