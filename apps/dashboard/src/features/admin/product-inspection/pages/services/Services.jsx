import React, { useState } from "react";
import { Button } from "primereact/button";
import TableInspection from "../../../../../components/product-inspection/TableInspection";
import apiTypeInspection from "../../api/inspection/apiTypeInspection";
import { IconEdit } from "~/components/icons/IconEdit";
import { IconDelete2 } from "~/components/icons/IconDelete2";
import { DeleteModal } from "../../../../../components/product-inspection/DeleteModal";
import { AddEditModal } from "../../../../../components/product-inspection/AddEditModal";
import { useForm } from "react-hook-form";
import apiServices from "../../api/services/apiServices";
import { AiOutlineEye } from "react-icons/ai";

function ServicesPage() {
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
         header: "Name",
         accessorKey: "name",
      }
   ];

   const addEditData = (data) => {
      console.log(data);
      if (data === null) {
         window.location.href = "/app/admin/product-inspection/services/new";
      } else {
         window.location.href = `/app/admin/product-inspection/services/${data.id}`;
      }
   };

   const deleteData = async (id) => {
      await apiServices.deleteData(id).then(() => {
         setRenderData(!renderData);
         closeDeleteDialog();
      });
   };

   const onSubmit = async (data) => {
      if (isEdit) {
         data._method = "PUT";
         await apiTypeInspection.updateData(selected.id, data).then(() => {
            setRenderData(!renderData);
            setAddEditDialog(false);
            setIsEdit(false);
         });
      } else {
         await apiTypeInspection.addData(data).then(() => {
            setRenderData(!renderData);
            setAddEditDialog(false);
         });
      }
   };

   return (
      <>
         <TableInspection
            title="Services"
            addBtn="Add Service"
            api={apiServices}
            renderData={renderData}
            addData={() => addEditData(null)}
            columns={columns}
            editData={(e) => addEditData(e)}
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
            title={isEdit ? "Edit Type" : "Create Type"}
         >
            <form onSubmit={handleSubmit(onSubmit)} className="pb-4">
               <div>
                  <input
                     type="text"
                     className="form border w-full p-3 text-sm rounded border-1 border-gray-300"
                     placeholder="Input Type"
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

export default ServicesPage;
