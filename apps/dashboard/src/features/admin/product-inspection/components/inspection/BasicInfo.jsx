import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Dropdown } from "../../../../../components/product-inspection/DropDown";
import apiServices from "../../api/services/apiServices";
import apiCustomer from "../../api/teritory/apiCustomer";
import { Calendar } from "primereact/calendar";
import { RegularButton } from "../../../../../components/product-inspection/Button";
import apiProductInspection from "../../api/inspection/apiProductInspection";

function BasicInfo() {
   const { register, handleSubmit, setValue, getValues } = useForm();
   const [orderData, setOrderData] = useState([]);
   const [inspectorData, setInspectorData] = useState([]);
   const [isEdit, setIsEdit] = useState(false);
   const [errors, setErrors] = useState();

   useEffect(() => {
      const getService = async () => {
         await apiServices.get().then((res) => {
            const options = [];
            res.data.data.data.map((v, i) => {
               options.push({
                  label: v.name,
                  value: v.id,
               });
            });
            // setOrderData(options);
         });
      };
      getService();
   }, []);

   useEffect(() => {
      const getInspector = async () => {
         await apiCustomer.get().then((res) => {
            const options = [];
            res.data.data.data.map((v, i) => {
               options.push({
                  label: v.email,
                  value: v.email,
               });
            });
            setInspectorData(options);
         });
      };
      getInspector();
   }, []);

   const onSubmit = async (data) => {
      console.log(data);
      data.checklist_template = 1;
      if (isEdit) {
         data._method = "PUT";
         await apiProductInspection.updateData(selected.id, data).then(() => {
            setAddEditDialog(false);
            setIsEdit(false);
         });
      } else {
         await apiProductInspection.addData(data).then(() => {
            window.location.href = "/admin/inspection";
            // setAddEditDialog(false);
         });
         // .catch((err) => {
         //    setErrors(err.response.data.data);
         // });
      }
   };

   return (
      <section>
         <div className="bg-blue-1 text-white p-2 rounded font-bold">
            Basic Info
         </div>
         <form onSubmit={handleSubmit(onSubmit)} className="pb-4">
            <div className="flex gap-4 w-full p-3">
               <div className="flex flex-col gap-1 w-full">
                  <div className="font-bold my-auto mb-4 text-gray-700">
                     Inspection Order
                  </div>
                  <div>
                     <Dropdown
                        placeholder="Select Inspection Order"
                        options={orderData}
                        value={getValues("inspector_order")}
                        setValue={(id) => setValue("inspector_order", id)}
                     ></Dropdown>
                  </div>
               </div>
               <div className="flex flex-col gap-1 w-full">
                  <div className="font-bold my-auto mb-4 text-gray-700">
                     Inspector
                  </div>
                  <div>
                     <Dropdown
                        placeholder="Select Product"
                        options={inspectorData}
                        value={getValues("inspector_email")}
                        setValue={(id) => setValue("inspector_email", id)}
                     ></Dropdown>
                  </div>
               </div>
            </div>

            <div className="flex gap-4 w-full px-3">
               <div className="flex flex-col gap-1 w-full">
                  <div className="font-bold my-auto mb-4 text-gray-700">
                     Product{" "}
                     <span className="text-red-500 text-xs">
                        Waiting Product feature
                     </span>
                  </div>
                  <div>
                     <Dropdown
                        placeholder="Select Supplier"
                        options={[
                           {
                              label: "lorem ipsum",
                              value: 1,
                           },
                        ]}
                        value={getValues("product_id")}
                        setValue={(id) => setValue("product_id", id)}
                     ></Dropdown>
                  </div>
               </div>
               <div className="flex flex-col gap-1 w-full">
                  <div className="font-bold my-auto mb-4 text-gray-700">
                     Supplier{" "}
                     <span className="text-red-500 text-xs">
                        Waiting Supplier feature
                     </span>
                  </div>
                  <div>
                     <Dropdown
                        placeholder="Select Supplier"
                        options={[
                           {
                              label: "lorem ipsum",
                              value: 1,
                           },
                        ]}
                        value={getValues("supplier_id")}
                        setValue={(id) => setValue("supplier_id", id)}
                     ></Dropdown>
                  </div>
               </div>
            </div>

            <div className="flex gap-4 w-full p-3">
               <div className="flex flex-col gap-1 w-full">
                  <div className="font-bold my-auto mb-4 text-gray-700">
                     Date
                  </div>
                  <div className="w-full">
                     <Calendar
                        dateFormat="yy-mm-dd"
                        className="w-full"
                        onChange={(e) =>
                           setValue(
                              "inspector_date",
                              e.value.getFullYear() +
                                 "-" +
                                 e.value.getMonth() +
                                 "-" +
                                 e.value.getDay()
                           )
                        }
                     />
                  </div>
               </div>
               <div className="flex flex-col gap-1 w-full">
                  <div className="font-bold my-auto mb-4 text-gray-700">
                     Address
                  </div>
                  <div>
                     <input
                        type="text"
                        className="form w-full p-3 text-sm rounded border-1 border-gray-200 "
                        placeholder="Input Address"
                        {...register("inspector_address", { required: true })}
                     />
                  </div>
               </div>
            </div>
            <div className="flex flex-row-reverse">
               <RegularButton title="Save" onClick={handleSubmit(onSubmit)} />
            </div>
         </form>
      </section>
   );
}

export default BasicInfo;
