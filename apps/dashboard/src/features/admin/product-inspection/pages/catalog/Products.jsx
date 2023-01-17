import React, { useState } from "react";
import { Button } from "primereact/button";
import TableInspection from "../../../../../components/product-inspection/TableInspection";
import apiProductSize from "../../api/catalog/apiProductSize";
import { IconEdit } from "~/components/icons/IconEdit";
import { IconDelete2 } from "~/components/icons/IconDelete2";
import { DeleteModal } from "../../../../../components/product-inspection/DeleteModal";
import { AddEditModal } from "../../../../../components/product-inspection/AddEditModal";
import { useForm } from "react-hook-form";
import apiProduct from "../../api/catalog/apiProduct";
import TextInput from "../../../../../components/product-inspection/TextInput";

function Products() {
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
            header: "Size",
            accessorKey: "product_name",
        },
        {
            header: "Sub Category",
            accessorKey: "",
        },
        {
            header: "Product Category",
            accessorKey: "",
        },
        {
            header: "Product Lines",
            accessorKey: "",
        },

    ];

    const addData = () => {
        setValue("name", "");
        setAddEditDialog(true);
        setIsEdit(false);
    };

    const deleteData = async (id) => {
        await apiProductSize.deleteData(id).then(() => {
            setRenderData(!renderData);
            closeDeleteDialog();
        });
    };

    const onSubmit = async (data) => {
        if (isEdit) {
            data._method = "PUT";
            await apiProductSize.updateData(selected.id, data).then(() => {
                setRenderData(!renderData);
                setAddEditDialog(false);
                setIsEdit(false);
            });
        } else {
            await apiProductSize.addData(data).then(() => {
                setRenderData(!renderData);
                setAddEditDialog(false);
            });
        }
    };

    return (
        <>
            <TableInspection
                title="Products"
                addBtn="Add Product"
                api={apiProduct}
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
                title={isEdit ? "Edit Size" : "Create Size"}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="pb-4">
                    <div className="flex flex-col gap-5">
                        <TextInput
                            type="text"
                            label="Product Category"
                            isRequired
                            placeholder="Input Type"
                            register={register("name", { required: true })}
                        />
                        <TextInput
                            type="text"
                            label="Product Lines"
                            isRequired
                            placeholder="Input Type"
                            register={register("name", { required: true })}
                        />
                        <TextInput
                            type="text"
                            label="Sub Category"
                            isRequired
                            placeholder="Input Type"
                            register={register("name", { required: true })}
                        />
                        <TextInput
                            type="text"
                            label="Product Name"
                            isRequired
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

export default Products;
