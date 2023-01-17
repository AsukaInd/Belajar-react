import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import TableInspection from "../../../../../components/product-inspection/TableInspection";
import apiProvince from "../../api/teritory/apiProvince";
import { IconEdit } from "~/components/icons/IconEdit";
import { IconDelete2 } from "~/components/icons/IconDelete2";
import { DeleteModal } from "../../../../../components/product-inspection/DeleteModal";
import { AddEditModal } from "../../../../../components/product-inspection/AddEditModal";
import { useForm } from "react-hook-form";
import { Dropdown } from "../../../../../components/product-inspection/DropDown";
import apiCountry from "../../api/teritory/apiCountry";
import apiCity from "../../api/teritory/apiCity";
import TextInput from "../../../../../components/product-inspection/TextInput";

function Province() {
    const [CountryData, setCountryData] = useState({
        data: [],
    });
    const [provinceData, setprovinceData] = useState({
        data: [],
    });
    const [AddEditDialog, setAddEditDialog] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [selected, setSelected] = useState(null);
    const [renderData, setRenderData] = useState(false);
    const { register, handleSubmit, setValue, getValues } = useForm();
    const [errors, setErrors] = useState();

    useEffect(() => {
        const getCountry = async () => {
            await apiCountry.get().then((res) => {
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
        setValue("country_id", parseInt(data.province.country_id));
        setValue("province_id", parseInt(data.province_id));
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
            header: "Province",
            accessorKey: "name",
        },
        {
            header: "Countries",
            accessorKey: "name",
        }
    ];

    const addData = () => {
        setValue("name", "");
        setValue("country_id", "");
        setValue("province_id", "");
        setAddEditDialog(true);
        setIsEdit(false);
    };

    const onSubmit = async (data) => {
        console.log("hello world");
        console.log(data);
        if (isEdit) {
            data._method = "PUT";
            await apiCity.updateData(selected.id, data).then(() => {
                setRenderData(!renderData);
                setAddEditDialog(false);
                setIsEdit(false);
            });
        } else {
            await apiCity
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
        await apiCity.deleteData(id).then(() => {
            setRenderData(!renderData);
            closeDeleteDialog();
        });
    };

    return (
        <>
            <TableInspection
                title="Cities"
                addBtn="Add City"
                api={apiCity}
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
                title={isEdit ? "Edit City" : "Create City"}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="pb-4">
                    <div className="flex flex-col gap-2">
                        <div>
                            <TextInput
                                isRequired
                                label="City Name"
                                placeholder="Input Cities Name"
                                register={register("name", { required: true })}
                            />
                        </div>
                        <div>
                            {errors && (
                                <span className="text-red-500 text-sm">
                                    {errors.province_id}
                                </span>
                            )}
                            <Dropdown
                                label="Province"
                                isRequired
                                placeholder="Select Province"
                                options={provinceData}
                                value={getValues("province_id")}
                                setValue={(id) => setValue("province_id", id)}
                            />
                        </div>
                        <div>
                            {errors && (
                                <span className="text-red-500 text-sm">
                                    {errors.country_id}
                                </span>
                            )}
                            <Dropdown
                                label="Country"
                                isRequired
                                placeholder="Select Country"
                                options={CountryData}
                                value={getValues('country_id')}
                                setValue={(id) => {
                                    setValue("country_id", id);
                                }}
                            />
                        </div>
                        {/* )} */}
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

export default Province;