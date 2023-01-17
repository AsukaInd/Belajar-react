import React, { useEffect, useState } from "react";
import { useFieldArray } from "react-hook-form";
import { TextField } from "../../../../../../components/product-inspection/TextField";
import { useProductSize } from "../../../api/services/product-size.services";
import { SIZE } from "./constant";
import WeightChartTable from "./WeightChartTable";

function WeightChart({ control, register }) {

   const { status, data, error } = useProductSize();
   const [activeSize, setActiveSize] = useState(data?.data?.data[0]);
   useEffect(() => {
      setActiveSize(data?.data?.data[0]);
   }, [data]);

   return (
      <section className="drop-shadow bg-white rounded-lg mt-6 border border-gray-500">
         <div className="flex justify-between bg-white-fa border-white-e9 border-b-2 p-4 rounded-t-lg">
            <h1 className="font-bold text-2xl my-auto">Weight Chart</h1>
         </div>
         <div className="px-4 py-4 ">
            <div className="flex rounded-lg overflow-auto">
               {data?.data?.data?.map((value, index) => (
                  <div
                     style={{ border: "1px solid grey" }}
                     className={`${
                        activeSize === value
                           ? "bg-blue-2 text-white "
                           : "bg-white text-grey-d4"
                     } border cursor-pointer border-gray-300 px-6 py-3 font-medium`}
                     onClick={() => setActiveSize(value)}
                     key={index}
                  >
                     {value.name}
                  </div>
               ))}
            </div>
            <div className="overflow-auto">
               {data?.data?.data?.map((value, index) => (
                  <>
                     {activeSize === value && (
                        <WeightChartTable
                           control={control}
                           register={register}
                           size={activeSize?.name}
                        />
                     )}
                  </>
               ))}
            </div>
         </div>
      </section>
   );
}

export default WeightChart;
