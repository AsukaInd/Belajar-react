import React, { useEffect, useState } from "react";
import { TextField } from "~/components/product-inspection/TextField";
import { useProductSize } from "../../../api/services/product-size.services";
import { SIZE_QUANTITY } from "./constant";

function QuantitySize({ control, register }) {
   const { status, data, error } = useProductSize();
   const [activeSize, setActiveSize] = useState(data?.data?.data[0]);
   useEffect(() => {
      setActiveSize(data?.data?.data[0]);
   }, [data]);

   return (
      <section className="drop-shadow bg-white rounded-lg mt-6 border border-gray-500">
         <div className="flex justify-between bg-white-fa border-white-e9 border-b-2 p-4 rounded-t-lg">
            <h1 className="font-bold text-2xl my-auto">Quantity Size</h1>
         </div>
         <div className="px-4 overflow-auto">
            <table className="mt-4 overflow-auto w-[768px] md:w-full">
               <thead>
                  <tr className="text-white rounded-lg">
                     <th className="bg-grey-a7 py-2 w-[512px] rounded-l-md">
                        Size
                     </th>
                     {data?.data?.data?.map((value, index) => (
                        <th className="bg-grey-a7 py-2 w-1" key={index}>
                           {value.name}
                        </th>
                     ))}
                     <th className="bg-grey-a7 py-2 rounded-r-md w-1">Total</th>
                  </tr>
               </thead>
               <tbody className="text-gray-500">
                  {SIZE_QUANTITY.map((sizeData, index) => (
                     <tr className="border-b-2" key={index}>
                        {/* <td>
                           <Controller
                              control={control}
                              name={`test.${index}.pos.${size}`}
                              render={({
                                 field: { onChange, onBlur, value, name, ref },
                                 fieldState: {
                                    invalid,
                                    isTouched,
                                    isDirty,
                                    error,
                                 },
                                 formState,
                              }) => (
                                 <input
                                    onChange={onChange}
                                    value={value}
                                    type="text"
                                    placeholder="Insert here"
                                    className="border-1 border-gray-400 p-3 rounded w-full"
                                 />
                              )}
                           />
                        </td> */}
                        <td className="p-2 text-grey-d4">{sizeData.label}</td>

                        {data?.data?.data?.map((value, index) => (
                           <td>
                              <input
                                 {...register(
                                    `quantity-size.${sizeData.value}.${value.name}`
                                 )}
                                 type="number"
                                 className="border-1 border-gray-400 p-3  rounded w-full"
                              />
                           </td>
                        ))}
                        <td>
                           <input
                              {...register(`quantity-size.total`)}
                              type="text"
                              className="border-1 border-gray-400 p-3  rounded w-full"
                           />
                        </td>
                        {/* <td>
                           <button
                              type="button"
                              onClick={() => remove(index)}
                              className="bg-red-500  text-white p-2 border-0 rounded"
                           >
                              {" "}
                              Delete{" "}
                           </button>
                        </td> */}
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
         {/* <div className="p-4 overflow-auto">
            <div className="flex gap-4">
               <TextField
                  name="qs-product_name"
                  control={control}
                  type="string"
                  label="Product Name"
                  placeholder="Input product name"
               />
               <TextField
                  name="qs-modal_name"
                  control={control}
                  type="string"
                  label="Modal Name"
                  placeholder="Input modal name"
               />
               <TextField
                  name="qs-color"
                  control={control}
                  type="string"
                  label="Color"
                  placeholder="Input color"
               />
            </div>
         </div> */}
      </section>
   );
}

export default QuantitySize;
