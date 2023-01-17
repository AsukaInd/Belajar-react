import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import TableInspection from "../../../../../components/product-inspection/TableInspection";
import apiCountry from "../../api/teritory/apiCountry";
import { IconEdit } from "~/components/icons/IconEdit";
import { IconDelete2 } from "~/components/icons/IconDelete2";
import { DeleteModal } from "../../../../../components/product-inspection/DeleteModal";
import { AddEditModal } from "../../../../../components/product-inspection/AddEditModal";
import { useForm } from "react-hook-form";
import apiCustomer from "../../api/teritory/apiCustomer";
import { Dropdown } from "../../../../../components/product-inspection/DropDown";
import apiProvince from "../../api/teritory/apiProvince";
import apiCity from "../../api/teritory/apiCity";
import TextInput from "../../../../../components/product-inspection/TextInput";

function Customer() {
   const [AddEditDialog, setAddEditDialog] = useState(false);
   const [isEdit, setIsEdit] = useState(false);
   const [deleteDialog, setDeleteDialog] = useState(false);
   const [selected, setSelected] = useState(null);
   const [renderData, setRenderData] = useState(false);
   const { register, handleSubmit, setValue, getValues} = useForm();
   const [CountryData, setCountryData] = useState({
      data: [],
   });
   const [provinceData, setprovinceData] = useState({
      data: [],
   });
   const [cityData, setCityData] = useState({
      data: [],
   });

   useEffect(() => {
      const getCountry = async () => {
         await apiCountry.get().then((res) => {
            const options = [];
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
            const options = [];
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

   useEffect(() => {
      const getProvince = async (id) => {
         await apiCity.get().then((res) => {
            const options = [];
            res.data.data.data.map((v, i) => {
               options.push({
                  label: v.name,
                  value: v.id,
               });
            });
            setCityData(options);
         });
      };
      getProvince();
   }, []);

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
      },
      {
         header: "Email",
         accessorKey: "email",
      },
      {
         header: "Phone",
         accessorKey: "phone",
      },
      {
         header: "Address",
         accessorKey: "address",
      },
   ];

   const addData = () => {
      setValue("name", "");
      setValue("phone", "");
      setValue("email", "");
      setValue("password", "");
      setValue("country_id", "");
      setValue("province_id", "");
      setValue("city_id", "");
      setValue("address", "");
      setAddEditDialog(true);
      setIsEdit(false);
   };

   const deleteData = async (id) => {
      await apiCustomer.deleteData(id).then(() => {
         setRenderData(!renderData);
         closeDeleteDialog();
      });
   };

   const onSubmit = async (data) => {
      if (isEdit) {
         data._method = "PUT";
         await apiCustomer.updateData(selected.id, data).then(() => {
            setRenderData(!renderData);
            setAddEditDialog(false);
            setIsEdit(false);
         });
      } else {
         await apiCustomer.addData(data).then(() => {
            setRenderData(!renderData);
            setAddEditDialog(false);
         });
      }
   };

   return (
      <>
         <TableInspection
            title="Users"
            addBtn="Add User"
            api={apiCustomer}
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
            title={isEdit ? "Edit Customer" : "Add Customer"}
         >
            <form
               onSubmit={handleSubmit(onSubmit)}
               className="pb-4 flex flex-col gap-4"
            >
               <div className="flex gap-2">
                  <div className="w-full">
                     <label className="text-gray-900">Name</label>
                     <TextInput
                        placeholder="Input Name"
                        register={register("name", { required: true })}
                     />
                  </div>
                  <div className="w-full">
                     <label className="text-gray-900">Phone</label>

                     <TextInput
                        type="text"
                        placeholder="Input Phone"
                        {...register("phone", { required: true })}
                     />
                  </div>
               </div>
               <div className="flex gap-2">
                  <div className="w-full">
                     <label className="text-gray-900">Email</label>
                     <TextInput
                        type="email"
                        placeholder="Input Email"
                        {...register("email", { required: true })}
                     />
                  </div>
                  <div className="w-full">
                     <label className="text-gray-900">Password</label>
                     <TextInput
                        type="password"
                        placeholder="Input Password"
                        {...register("password", { required: true })}
                     />
                  </div>
               </div>
               <div className="flex gap-2">
                  <div className="w-full">
                     <label className="text-gray-900">Country</label>
                     <Dropdown
                        placeholder="Select Country"
                        options={CountryData}
                        value={getValues("country_id")}
                        setValue={(id) => {
                           setValue("country_id", id);
                        }}
                     />
                  </div>
                  <div className="w-full">
                     <label className="text-gray-900">Province</label>
                     <Dropdown
                        placeholder="Select Province"
                        options={provinceData}
                        value={getValues("province_id")}
                        setValue={(id) => setValue("province_id", id)}
                     ></Dropdown>
                  </div>
               </div>
               <div className="flex gap-2">
                  <div className="w-full">
                     <label className="text-gray-900">City</label>
                     <Dropdown
                        placeholder="Select City"
                        options={cityData}
                        value={getValues("city_id")}
                        setValue={(id) => {
                           setValue("city_id", id);
                        }}
                     ></Dropdown>
                  </div>
                  <div className="w-full">
                     <label className="text-gray-900">Address</label>
                     <div className="flex-grow py-1">
                        <TextInput
                           type="text"
                           placeholder="Input Address"
                           {...register("address", { required: true })}
                        />
                     </div>
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

export default Customer;
