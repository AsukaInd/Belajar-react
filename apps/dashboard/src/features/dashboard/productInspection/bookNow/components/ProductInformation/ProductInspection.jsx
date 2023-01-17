import { ProgressSpinner } from "primereact/progressspinner";
import React, { useEffect, useState } from "react";
import { RegularButton } from "../../../../../../components/product-inspection/Button";
import { DropdownField } from "../../../../../../components/product-inspection/DropDown";
import { TextField } from "../../../../../../components/product-inspection/TextField";
import { useProduct } from "../../../api/services/product.services";
import { AddProductDialog } from "./AddProductDialog";
import { percentace } from "./constant";
import TableProduct from "./TableProduct";
import { ErrorMessage } from "~/components/ErrorMessage";

function ProductInspection({ control, getValues }) {
   const [rowSelection, setRowSelection] = useState({});
   const [dataProduct, setDataProduct] = useState()
   const [{ pageIndex, pageSize }, setPagination] = useState({
      pageIndex: 0,
      pageSize: 10,
   });

   const { status, data, error, empty } = useProduct({
      perPage: pageSize,
      page: pageIndex,
   });

   useEffect(() => {
      const productAdded = localStorage.getItem("productId")
      console.log(productAdded)
      if(productAdded){
         setDataProduct(data)
      } else{
         
      }
   }, []);


   const [newProductDialog, setNewProductDialog] = useState(false);

   function openNewProductDialog() {
      setNewProductDialog(true);
   }

   function closeNewProductDialog() {
      setNewProductDialog(false);
   }
   return (
      <section className="drop-shadow bg-white rounded-lg mt-4 border border-gray-500">
         <div className="flex justify-between bg-white-fa border-white-e9 border-b-2 p-4 rounded-t-lg">
            <h1 className="font-bold text-2xl my-auto">
               Production Inspection
            </h1>
            <RegularButton
               title="Add New Product"
               className="!bg-blue-2"
               onClick={openNewProductDialog}
            />
         </div>
         <div className="p-4">
            {status === "loading" ? (
               <div className="vh-center">
                  <ProgressSpinner strokeWidth={3} />
               </div>
            ) : status === "success" && !empty ? (
               <TableProduct
                  data={data?.data}
                  rowSelection={rowSelection}
                  setRowSelection={setRowSelection}
                  pageIndex={pageIndex}
                  pageSize={pageSize}
                  setPagination={setPagination}
                  pageCount={data?.data?.last_page}
                  from={data?.data?.from}
                  to={data?.data?.to}
               />
            ) : (
               <ErrorMessage className="vh-center" error="empty product" />
            )}
         </div>
         <div className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
               <div className="w-full">
                  <DropdownField
                     label="Product Category"
                     placeholder="Select product category"
                     name="product_category"
                     control={control}
                     options={[{ label: "low", value: 1 }]}
                     isRequired
                  />
               </div>
               <div className="flex flex-col md:flex-row gap-4 w-full ">
                  <div className="w-full md:w-1/2">
                     <DropdownField
                        label="Finished (%)"
                        placeholder="Select product category"
                        name="finished"
                        control={control}
                        options={percentace}
                        isRequired
                     />
                  </div>
                  <div className="w-full md:w-1/2">
                     <DropdownField
                        label="Finished & Packed (%)"
                        placeholder="Select product category"
                        name="finished_packed"
                        control={control}
                        options={percentace}
                        isRequired
                     />
                  </div>
               </div>
            </div>
            {/* <div className="flex flex-col md:flex-row gap-4 mt-4">
               <TextField
                  name="ref_number_inspection"
                  control={control}
                  label="Ref Number for This Inspection"
                  placeholder="Input ref number"
                  isRequired
               />
               <TextField
                  name="inspxt_ref_number"
                  control={control}
                  label="Inspxt Ref Number"
                  placeholder="Input ref number"
                  isRequired
               />
            </div> */}
         </div>

         <AddProductDialog
            isOpen={newProductDialog}
            onClose={closeNewProductDialog}
            getValues={getValues}
         />
      </section>
   );
}

export default ProductInspection;
