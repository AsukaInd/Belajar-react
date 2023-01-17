import React, { useState, useEffect } from "react";
import TableInspection from "../../../../../components/product-inspection/TableInspection";
import apiProvince from "../../api/teritory/apiProvince";
import { DeleteModal } from "../../../../../components/product-inspection/DeleteModal";
import { AddEditModal } from "../../../../../components/product-inspection/AddEditModal";
import { useForm } from "react-hook-form";
import { Dropdown } from "../../../../../components/product-inspection/DropDown";
import apiCountry from "../../api/teritory/apiCountry";
import TextInput from "../../../../../components/product-inspection/TextInput";

function SubRegion() {
    const [CountryData, setCountryData] = useState({
        data: [
            {
                label: "",
                value: "",
            },
        ],
    });
    const [AddEditDialog, setAddEditDialog] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [selected, setSelected] = useState(null);
    const [renderData, setRenderData] = useState(false);
    const { register, handleSubmit, setValue, getValues } = useForm();
    const [errors, setErrors] = useState();
    const [provinceData, setprovinceData] = useState({
        data: []
    })

    useEffect(() => {
        const getCountry = async () => {
            await apiCountry.get().then((res) => {
                console.log(res.data.data.data);
                let options = [];
                res.data.data.data.map((v, i) => {
                    options.push({
                        label: v.name,
                        value: v.id,
                    });
                });
                setCountryData(options);
            });
        };
        getCountry();
    }, []);

    useEffect(() => {
        const getProvince = async (id) => {
            await apiProvince.get().then((res) => {
                let options = [];
                res.data.data.data.map((v, i) => {
                    options.push({
                        label: v.name,
                        value: v.id,
                    });
                });
                setprovinceData(options);
            });
        };
        getProvince();
    }, []);

    function openEditUserDialog(data) {
        setSelected(data);
        setAddEditDialog(true);
        setValue("name", data.name);
        setValue("country_id", parseInt(data.country_id));
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
        setValue("country_id", "");
        setAddEditDialog(true);
        setIsEdit(false);
    };

    const onSubmit = async (data) => {
        if (isEdit) {
            data._method = "PUT";
            await apiProvince.updateData(selected.id, data).then(() => {
                setRenderData(!renderData);
                setAddEditDialog(false);
                setIsEdit(false);
            });
        } else {
            await apiProvince
                .addData(data)
                .then(() => {
                    setRenderData(!renderData);
                    setAddEditDialog(false);
                })
                .catch((err) => {
                    setErrors(err.response.data.data);
                });
        }
    };

    const deleteData = async (id) => {
        await apiProvince.deleteData(id).then(() => {
            setRenderData(!renderData);
            closeDeleteDialog();
        });
    };

    return (
        <>
            <TableInspection
                title="Sub Region"
                addBtn="Add Sub Region"
                api={apiProvince}
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
                title={isEdit ? "Edit Province" : "Create Province"}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="pb-4">
                    <div className="flex flex-col gap-2">
                        <TextInput
                            label="Sub Region Name"
                            isRequired
                            placeholder="Input Sub Region Name"
                            register={register("name", { required: true })}
                        />
                        <div>
                            {errors && (
                                <span className="text-red-500 text-sm">
                                    {errors.country_id}
                                </span>
                            )}
                            <Dropdown
                                label="Province"
                                isRequired
                                placeholder="Select Province"
                                options={provinceData}
                                value={getValues("province_id")}
                                setValue={(id) => setValue("province_id", id)}
                            ></Dropdown>
                        </div>
                        <div>
                            {errors && (
                                <span className="text-red-500 text-sm">
                                    {errors.country_id}
                                </span>
                            )}
                            <Dropdown
                                label="Countries"
                                isRequired
                                fullWidth
                                placeholder="Select Country"
                                options={CountryData}
                                value={getValues("country_id")}
                                setValue={(id) => setValue("country_id", id)}
                            />
                        </div>
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

export default SubRegion;
