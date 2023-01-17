import React, { useState } from "react";
import { DropdownField } from "../../../../../components/product-inspection/DropDown";
import { TextField } from "../../../../../components/product-inspection/TextField";

export default function BasicInfoOrder({ control }) {
   const [supplierIsFactory, setSupplierIsFactory] = useState(false);

   const handleChangeImage = (e) => {
      /* code here */
   }

   return (
      <div>
         <div className="bg-blue-1 w-full text-white p-2 rounded">
            Basic Info
         </div>
         <div className="flex flex-col gap-4">
            <div className="flex mt-4 gap-4">
               <DropdownField
                  name="service"
                  label="Service"
                  placeholder="Select Service"
                  control={control}
                  options={[{ value: "lorem ipsum", label: "lorem ipsum" }]}
               />
            </div>
            <div className="flex gap-4">
               <TextField
                  name="clientName"
                  control={control}
                  label="Client Name"
                  isRequired={true}
               />
            </div>
            <div className="flex gap-4">
               <DropdownField
                  name="supplierCompany"
                  label="Supplier Company"
                  placeholder="Select Supplier Company"
                  control={control}
                  options={[{ value: "lorem ipsum", label: "lorem ipsum" }]}
               />
               <DropdownField
                  name="supplierContact"
                  label="Supplier Contact"
                  placeholder="Select Supplier Contact"
                  control={control}
                  options={[{ value: "lorem ipsum", label: "lorem ipsum" }]}
               />
            </div>
            <div className="flex gap-2">
               <input
                  type="checkbox"
                  className="my-auto"
                  onClick={(e) => setSupplierIsFactory(!supplierIsFactory)}
               />
               Supplier is factory?
            </div>
            {supplierIsFactory && (
               <div className="flex gap-4">
                  <DropdownField
                     name="factoryCompany"
                     label="Factory Company"
                     placeholder="Select Factory Company"
                     control={control}
                     options={[{ value: "lorem ipsum", label: "lorem ipsum" }]}
                  />
                  <DropdownField
                     name="factoryContact"
                     label="Factory Contact"
                     placeholder="Select Factory Contact"
                     control={control}
                     options={[{ value: "lorem ipsum", label: "lorem ipsum" }]}
                  />
               </div>
            )}
            <div className="flex gap-2">
               Golden Picture
               <input
                  type="file"
                  onChange={handleChangeImage}
               />
            </div>
            <TextField
               name="samplingStandard"
               control={control}
               label="Sampling Standard"
            />
            <div className="bg-blue-1 w-full text-white p-2 rounded">
               Inspection Info
            </div>
            <div className="flex gap-4">
               <TextField
                  type="date"
                  name="inspection_request_date"
                  control={control}
                  label="Inspection Request Date"
               />
               <TextField
                  type="date"
                  name="expected shipment date"
                  control={control}
                  label="Expected Shipment Date"
               />
            </div>
         </div>
      </div>
   );
}