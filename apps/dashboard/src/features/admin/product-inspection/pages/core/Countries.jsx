import React, { useState } from "react";
import { Button } from "primereact/button";
import TableInspection from "../../../../../components/product-inspection/TableInspection";
import apiCountry from "../../api/teritory/apiCountry";
import { IconEdit } from "~/components/icons/IconEdit";
import { IconDelete2 } from "~/components/icons/IconDelete2";
import { DeleteModal } from "../../../../../components/product-inspection/DeleteModal";
import { AddEditModal } from "../../../../../components/product-inspection/AddEditModal";
import { useForm } from "react-hook-form";
import { TextField } from "../../../../../components/product-inspection/TextField";
import TextInput from "../../../../../components/product-inspection/TextInput";

function Countries() {
    const [AddEditDialog, setAddEditDialog] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [selected, setSelected] = useState(null);
    const [renderData, setRenderData] = useState(false);
    const { register, handleSubmit, setValue } = useForm();

    function openEditUserDialog(data) {
        console.log(data)
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
        },
        {
            header: "Date Added",
            accessorKey: "created_at",
        },
    ];

    const addData = () => {
        setValue("name", "");
        setAddEditDialog(true);
        setIsEdit(false);
    };

    const deleteData = async (id) => {
        await apiCountry.deleteData(id).then(() => {
            setRenderData(!renderData);
            closeDeleteDialog();
        });
    };

    const onSubmit = async (data) => {
        console.log(data)
        if (isEdit) {
            data._method = "PUT";
            await apiCountry.updateData(selected.id, data).then(() => {
                setRenderData(!renderData);
                setAddEditDialog(false);
                setIsEdit(false);
            });
        } else {
            await apiCountry.addData(data).then(() => {
                console.log('trigger')
                setRenderData(!renderData);
                setAddEditDialog(false);
            });
        }
    };

    return (
        <>
            <TableInspection
                title="Countries"
                addBtn="Add Country"
                api={apiCountry}
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
                title={isEdit ? "Edit Country" : "Create Country"}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="pb-4">
                    <div>
                        <TextInput
                            placeholder="Input Country Name"
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

export default Countries;
