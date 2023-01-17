import React, { useState} from "react";
import { Button } from "primereact/button";
import TableInspection from "../../../../../components/product-inspection/TableInspection";
import { IconEdit } from "~/components/icons/IconEdit";
import { IconDelete2 } from "~/components/icons/IconDelete2";
import { DeleteModal } from "../../../../../components/product-inspection/DeleteModal";
import { AddEditModal } from "../../../../../components/product-inspection/AddEditModal";
import { useForm } from "react-hook-form";
import apiDefectLevel from "../../api/catalog/apiDefectLevel";
import TextInput from "../../../../../components/product-inspection/TextInput";

function DefectLevel() {
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
         header: "Defect Level",
         accessorKey: "name",
      }
   ];

   const addData = () => {
      setValue("name", "");
      setAddEditDialog(true);
      setIsEdit(false);
   };

   const deleteData = async (id) => {
      await apiDefectLevel.deleteData(id).then(() => {
         setRenderData(!renderData);
         closeDeleteDialog();
      });
   };

   const onSubmit = async (data) => {
      if (isEdit) {
         data._method = "PUT";
         await apiDefectLevel.updateData(selected.id, data).then(() => {
            setRenderData(!renderData);
            setAddEditDialog(false);
            setIsEdit(false);
         });
      } else {
         await apiDefectLevel.addData(data).then(() => {
            setRenderData(!renderData);
            setAddEditDialog(false);
         });
      }
   };

   return (
      <>
         <TableInspection
            title="Defect Level"
            addBtn="Add Level"
            api={apiDefectLevel}
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
               <div>
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

export default DefectLevel;
