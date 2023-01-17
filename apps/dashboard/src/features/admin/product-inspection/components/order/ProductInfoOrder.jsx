import React, { useState } from "react";

import { Button } from "../../../../../components/product-inspection/Button";
import { DropdownField } from "../../../../../components/product-inspection/DropDown";
import { TextField } from "../../../../../components/product-inspection/TextField";

export default function ProductInfoOrder({ control }) {
   const [anotherInspection, setAnotherInspection] = useState(1)

   const handleAddInspection = (param) => {
      if (param === 'add'){
         setAnotherInspection(prev => prev+1)
      }else if (param === 'remove'){
         if (anotherInspection === 1) {
            return anotherInspection
         }else {
            setAnotherInspection(prev => prev-1)
         }
      }
   }

   const generateAnotherInspection = () => {
      const forms = Array.from(Array(anotherInspection).keys()).map((number) => {
         return (
            <tr key={number}>
               <td>
                  <TextField
                     name="date"
                     type="date"
                     control={control}
                     label=""
                  />
               </td>
               <td>
                  <TextField
                     name="time"
                     type="time"
                     control={control}
                     label=""
                  />
               </td>
               <td>
                  <TextField
                     name="number"
                     control={control}
                     label=""
                  />
               </td>
               <td>
                  <TextField
                     name="modelnumber"
                     control={control}
                     label=""
                  />
               </td>
               <td>
                  <TextField
                     name="product_name"
                     control={control}
                     label=""
                  />
               </td>
               <td>
                  <TextField
                     name="po_number"
                     control={control}
                     label=""
                  />
               </td>
               <td>
                  <div className="flex justify-center items-center h-full w-full">
                     <i className="pi pi-times hover:text-red-500 cursor-pointer"
                        onClick={() => handleAddInspection("remove")}
                     ></i>
                  </div>
               </td>
            </tr>
         )
      })
      return forms
   }

   return (
      <div>
         <div className="bg-blue-1 w-full text-white p-2 rounded">
            Product Basic
         </div>
         <div className="flex flex-col gap-4 mt-4">
            <div className="flex gap-4">
               <DropdownField
                  name="productLine"
                  label="Product Line"
                  placeholder="Select Product Line"
                  control={control}
                  options={[{ value: "lorem ipsum", label: "lorem ipsum" }]}
               />
               <DropdownField
                  name="productCategory"
                  label="Product Category"
                  placeholder="Select Product Category"
                  control={control}
                  options={[{ value: "lorem ipsum", label: "lorem ipsum" }]}
               />
            </div>
            <div className="flex gap-4">
               <TextField
                  name="clientName"
                  control={control}
                  label="Min % of products to be finished"
               />
               <TextField
                  name="clientName"
                  control={control}
                  label="Min % of products to be finished and packed:"
               />
            </div>
            <div className="bg-blue-1 w-full text-white p-2 rounded">
               Inspection Order Products
            </div>
            <div className="flex gap-4">
               <table className="table-auto flex-1">
                  <thead>
                     <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Number</th>
                        <th>PO Number</th>
                        <th>Model Number</th>
                        <th>Product Name</th>
                        <th>Action</th>
                     </tr>
                  </thead>
                  <tbody>
                     {generateAnotherInspection()}
                  </tbody>
               </table>
            </div>
            <div>
               <button
                  onClick={() => handleAddInspection("add")}
                  className="flex gap-2 bg-blue-500 border-0 hover:bg-blue-700 text-white rounded px-4 py-3 font-bold cursor-pointer"
               >
                  <i className="pi pi-plus" ></i>
                  <span>Add another inspection order</span>
               </button>
            </div>
         </div>
      </div>
   );
}
