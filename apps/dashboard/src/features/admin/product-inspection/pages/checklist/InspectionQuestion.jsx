import React, { useState } from "react";
import { Button } from "primereact/button";
import TableInspection from "../../../../../components/product-inspection/TableInspection";
import apiProductSize from "../../api/catalog/apiProductSize";
import { IconEdit } from "~/components/icons/IconEdit";
import { IconDelete2 } from "~/components/icons/IconDelete2";
import { DeleteModal } from "../../../../../components/product-inspection/DeleteModal";
import { AddEditModal } from "../../../../../components/product-inspection/AddEditModal";
import { useForm , Controller } from "react-hook-form";
import apiSupplierType from "../../api/catalog/apiSupplierType";
import TextInput from "../../../../../components/product-inspection/TextInput";
import { TextArea } from "../../../../../components/product-inspection/TextArea";

function InspectionQuestion() {
    const [AddEditDialog, setAddEditDialog] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [selected, setSelected] = useState(null);
    const [renderData, setRenderData] = useState(false);
    const { register, handleSubmit, setValue, control } = useForm();

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
            accessorKey: "name",
        },
        {
            header: "Date Added",
            accessorKey: "created_at",
        }
    ];

    const addData = () => {
        setValue("name", "");
        setAddEditDialog(true);
        setIsEdit(false);
    };

    const deleteData = async (id) => {
        await apiSupplierType.deleteData(id).then(() => {
            setRenderData(!renderData);
            closeDeleteDialog();
        });
    };

    const onSubmit = async (data) => {
        if (isEdit) {
            data._method = "PUT";
            await apiSupplierType.updateData(selected.id, data).then(() => {
                setRenderData(!renderData);
                setAddEditDialog(false);
                setIsEdit(false);
            });
        } else {
            await apiSupplierType.addData(data).then(() => {
                setRenderData(!renderData);
                setAddEditDialog(false);
            });
        }
    };

    return (
        <>
            <TableInspection
                title="Inspection Question"
                addBtn="Add Inspection"
                api={apiSupplierType}
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
                title={isEdit ? "Edit Type" : "Create Type"}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="pb-4">
                    <div className="flex flex-col gap-5">
                        <TextInput
                            label="Service Type"
                            isRequired
                            type="text"
                            placeholder="Input Type"
                            register={register("name", { required: true })}
                        />
                        <TextInput
                            label="Checklist Type"
                            isRequired
                            type="text"
                            placeholder="Input Type"
                            register={register("name", { required: true })}
                        />
                        <TextInput
                            label="Name"
                            isRequired
                            type="text"
                            placeholder="Input Type"
                            register={register("name", { required: true })}
                        />
                        <TextArea
                            label="Instruction"
                            isRequired
                            name="description"
                            placeholder="Input Type"
                            control={control}
                        />
                        <TextInput
                            label="Sequence"
                            isRequired
                            type="text"
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

export default InspectionQuestion;
