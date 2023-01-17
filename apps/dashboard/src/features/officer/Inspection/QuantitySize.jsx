import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useProductSize } from "../../dashboard/productInspection/api/services/product-size.services";
import { SIZE_QUANTITY } from "./constant";

function QuantitySize() {
   const { control, handleSubmit, watch, register, setValue, getValues } =
      useForm({
         mode: "onSubmit",
      });
   const { status, data, error } = useProductSize();
   const [activeSize, setActiveSize] = useState(data?.data?.data[0]);
   useEffect(() => {
      setActiveSize(data?.data?.data[0]);
   }, [data]);

   const onSubmit = (data) => {
      console.log(data);
   };

   return (
      <>
         <form onSubmit={handleSubmit(onSubmit)}>
            <div className="m-4 rounded bg-white p-4">
               <h6>Quantity Size</h6>
               <div className=" overflow-auto">
                  <table className=" overflow-auto w-[768px] md:w-full">
                     <thead>
                        <tr className="text-white rounded-lg">
                           <th className="bg-grey-a7 py-2 rounded-l-md">
                              Size
                           </th>
                           {data?.data?.data?.map((value, index) => (
                              <th className="bg-grey-a7 py-2 w-1" key={index}>
                                 {value.name}
                              </th>
                           ))}
                           <th className="bg-grey-a7 py-2 rounded-r-md w-1">
                              Total
                           </th>
                        </tr>
                     </thead>
                     <tbody className="text-gray-500">
                        {SIZE_QUANTITY.map((sizeData, index) => (
                           <tr className="border-b-2">
                              <td className="p-2 text-grey-d4 w-2">
                                 {sizeData.label}
                              </td>

                              {data?.data?.data?.map((value, index) => (
                                 <td>
                                    <input
                                       {...register(
                                          `quantity-size.${sizeData.value}.${value.name}`
                                       )}
                                       type="number"
                                       className="border-1 border-gray-400   rounded w-full py-3"
                                    />
                                 </td>
                              ))}
                              <td>
                                 <input
                                    {...register(`quantity-size.total`)}
                                    type="text"
                                    className="border-1 border-gray-400 py-3  rounded w-full"
                                 />
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
            <div className="m-4 rounded bg-white p-4">
               <Button label="Submit" className="w-full" type="submit" />
            </div>
         </form>
      </>
   );
}

export default QuantitySize;
