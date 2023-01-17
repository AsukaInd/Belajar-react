import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import  TableInspection from "../../../../../components/product-inspection/TableInspection";
import { IconEdit } from "~/components/icons/IconEdit";
import { IconDelete2 } from "~/components/icons/IconDelete2";
import { DeleteModal } from "../../../../../components/product-inspection/DeleteModal";
import { AddEditModal } from "../../../../../components/product-inspection/AddEditModal";
import { useForm } from "react-hook-form";
import apiChapterInspection from "../../api/inspection/apiChapterInspection";
import ChapterAdd from "../../pages/inspection/ChapterAdd";
import ChapterAdd2 from "../../pages/inspection/ChapterAdd2";

function ChapterInspection() {
   const navigate = useNavigate();
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
         header: "Inspection",
         accessorKey: "inspection",
      },
      {
         header: "Name",
         accessorKey: "name",
      },
      {
         header: "Type",
         accessorKey: "type",
      },
      {
         header: "Instruction",
         accessorKey: "instruction",
      }
   ];

   const addData = () => {
    //   setValue("name", "");
      setAddEditDialog(true);
      setIsEdit(false);
    //   navigate("add");
   };

   const deleteData = async (id) => {
      await apiChapterInspection.deleteData(id).then(() => {
         setRenderData(!renderData);
         closeDeleteDialog();
      });
   };

   const onSubmit = async (data) => {
      if (isEdit) {
         data._method = "PUT";
         await apiChapterInspection.updateData(selected.id, data).then(() => {
            setRenderData(!renderData);
            setAddEditDialog(false);
            setIsEdit(false);
         });
      } else {
         await apiChapterInspection.addData(data).then(() => {
            setRenderData(!renderData);
            setAddEditDialog(false);
         });
      }
   };

   return (
      <>
         <TableInspection
            title="Inspection Chapter"
            addBtn="Add Chapter"
            api={apiChapterInspection}
            renderData={renderData}
            addData={addData}
            columns={columns}
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
            title={isEdit ? "Edit Type" : "Add Inspection Chapter"}
         >
            <div>
                <ChapterAdd2 />
            </div>
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

export default ChapterInspection
