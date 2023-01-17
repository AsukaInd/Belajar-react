import React, { useEffect, useState } from "react";
import { Controller, useFieldArray } from "react-hook-form";
import { useProductSize } from "../../dashboard/productInspection/api/services/product-size.services";

function SizeMeasurementTable({ control, register, size }) {
   const { fields, append, prepend, remove, swap, move, insert } =
      useFieldArray({
         control, // control props comes from useForm (optional: if you are using FormContext)
         name: "sizemeasurement", // unique name for your Field Array
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
                  <th className="bg-grey-a7 py-2 w-[512px] rounded-l-md">POM</th>
                  <th className="bg-grey-a7 py-2 w-96">Required</th>
                  <th className="bg-grey-a7 py-2" colSpan="2">
                     Tolerance
                  </th>
                  <th className="bg-grey-a7 py-2 rounded-r-md" colSpan="3">
                     Actual Sample
                  </th>
               </tr>
               <tr className=" border-b-2 text-white">
                  <td></td>
                  <td></td>
                  <td className="bg-[#f4f4f4] text-grey-d4 font-bold py-2 text-center w-1">
                     +
                  </td>
                  <td className="bg-[#f4f4f4] text-grey-d4 font-bold py-2 text-center w-1">
                     -
                  </td>
                  <td className="bg-[#f4f4f4] text-grey-d4 font-bold py-2 text-center w-1">
                     1
                  </td>
                  <td className="bg-[#f4f4f4] text-grey-d4 font-bold py-2 text-center w-1">
                     2
                  </td>
                  <td className="bg-[#f4f4f4] text-grey-d4 font-bold py-2 text-center w-1">
                     3
                  </td>
               </tr>
            </thead>
            <tbody className="text-gray-500">
               {fields.map((field, index) => (
                  <tr className="border-b-2">
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
                     <td>
                        <input
                           {...register(
                              `sizemeasurement.${index}.pom.${size}`
                           )}
                           disabled
                           type="text"
                           className="border-1 border-gray-400 p-3  rounded w-full"
                        />
                     </td>
                     <td>
                        <input
                           {...register(
                              `sizemeasurement.${index}.req.${size}`
                           )}
                           disabled
                           type="text"
                           className="border-1 border-gray-400 p-3  rounded w-full"
                        />
                     </td>
                     <td>
                        <input
                           {...register(
                              `sizemeasurement.${index}.plus.${size}`
                           )}
                           type="text"
                           disabled
                           className="border-1 border-gray-400 p-3 rounded w-full"
                        />
                     </td>
                     <td>
                        <input
                           {...register(
                              `sizemeasurement.${index}.minus.${size}`
                           )}
                           type="text"
                           disabled
                           className="border-1 border-gray-400 p-3 rounded w-full"
                        />
                     </td>
                     <td>
                        <input
                           {...register(
                              `sizemeasurement.${index}.act1.${size}`
                           )}
                           type="text"
                           className="border-1 border-gray-400 py-3 rounded w-full"
                        />
                     </td>

                     <td>
                        <input
                           {...register(
                              `sizemeasurement.${index}.act2.${size}`
                           )}
                           type="text"
                           className="border-1 border-gray-400 py-3 rounded w-full"
                        />
                     </td>
                     <td>
                        <input
                           {...register(
                              `sizemeasurement.${index}.act3.${size}`
                           )}
                           type="text"
                           className="border-1 border-gray-400 py-3 rounded w-full"
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
      </section>
   );
}

export default SizeMeasurementTable;
