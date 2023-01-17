import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useProductSize } from "../../dashboard/productInspection/api/services/product-size.services";
import SizeMeasurementTable from "./SizeMeasurementTable";

function SizeMeasurement() {
   const { control, handleSubmit, watch, register, setValue, getValues } =
      useForm({
         mode: "onSubmit",
         defaultValues: {
            sizemeasurement: [
               {
                  pom: { XS: "lorem ipsum 1" },
                  req: { XS: "yes" },
                  plus: { XS: "10.0" },
                  minus: { XS: "10.0" },
               },
               {
                  pom: { XS: "hello world" },
                  req: { XS: "yes" },
                  plus: { XS: "10.0" },
                  minus: { XS: "10.0" },
               },
               {
                  pom: { XS: "lorem ipsum 123" },
                  req: { XS: "yes" },
                  plus: { XS: "10.0" },
                  minus: { XS: "10.0" },
               },
            ],
         },
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
               <h6>Size Measurement</h6>
               <div className=" py-4 ">
                  <div className="flex rounded-lg overflow-auto w-full">
                     {data?.data?.data?.map((value, index) => (
                        <div
                           style={{ border: "1px solid grey" }}
                           className={`${
                              activeSize === value
                                 ? "bg-blue-2 text-white "
                                 : "bg-white text-grey-d4"
                           } border cursor-pointer border-gray-300 font-medium w-full text-center py-2`}
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
                              <SizeMeasurementTable
                                 control={control}
                                 register={register}
                                 size={activeSize?.name}
                              />
                           )}
                        </>
                     ))}
                  </div>
               </div>
            </div>
            <div className="m-4 rounded bg-white p-4">
               <Button label="Submit" className="w-full" type="submit" />
            </div>
         </form>
      </>
   );
}

export default SizeMeasurement;
