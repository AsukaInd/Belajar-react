import React, { useEffect, useState } from "react";
import { Controller, useFieldArray } from "react-hook-form";
import { useProductSize } from "../../dashboard/productInspection/api/services/product-size.services";

function WeightChartTable({ control, register, size }) {
   const { fields, append, prepend, remove, swap, move, insert } =
      useFieldArray({
         control, // control props comes from useForm (optional: if you are using FormContext)
         name: "weight_chart", // unique name for your Field Array
      });

   const { status, data, error } = useProductSize();
   const [activeSize, setActiveSize] = useState(data?.data?.data[0]);
   useEffect(() => {
      setActiveSize(data?.data?.data[0]);
   }, [data]);

   return (
      <section>
         <table className="mt-4 overflow-auto w-[768px] md:w-full">
            <thead>
               <tr className="text-white rounded-lg">
                  <th className="bg-grey-a7 py-2 rounded-l-md ">Style/Weight</th>
                  <th className="bg-grey-a7 py-2 ">Grams</th>
                  <th className="bg-grey-a7 py-2">
                     1
                  </th>
                  <th className="bg-grey-a7 py-2 rounded-r-md">
                     2
                  </th>
               </tr>
            </thead>
            <tbody className="text-gray-500">
               {fields.map((field, index) => (
                  <tr className="border-b-2">
                     <td>
                        <input
                           {...register(
                              `weight_chart.${index}.style.${size}`
                           )}
                           disabled
                           type="text"
                           className="border-1 border-gray-400 p-3  rounded w-full"
                        />
                     </td>
                     <td>
                        <input
                           {...register(
                              `weight_chart.${index}.grams.${size}`
                           )}
                           disabled
                           type="text"
                           className="border-1 border-gray-400 p-3  rounded w-full"
                        />
                     </td>

                     <td>
                        <input
                           {...register(
                              `weight_chart.${index}.act1.${size}`
                           )}
                           type="text"
                           className="border-1 border-gray-400 p-3 rounded w-full"
                        />
                     </td>
                     <td>
                        <input
                           {...register(
                              `weight_chart.${index}.act2.${size}`
                           )}
                           type="text"
                           className="border-1 border-gray-400 p-3 rounded w-full"
                        />
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </section>
   );
}

export default WeightChartTable
