import React from "react";
import { RegularButton } from "../../../../../../components/product-inspection/Button";
import { TextArea } from "../../../../../../components/product-inspection/TextArea";

function ProductSpesification({control}) {
   return (
      <section className="drop-shadow bg-white rounded-lg mt-4 border border-gray-500">
         <div className="flex justify-between bg-white-fa border-white-e9 border-b-2 p-4 rounded-t-lg">
            <h1 className="font-bold text-2xl my-auto">
               Product Spesification
            </h1>
         </div>
         <div className="p-4">
            <div className="flex flex-col gap-4 mt-4">
               <div className="flex flex-col md:flex-row gap-4 text-gray-600 text-lg">
                  <TextArea
                     name="ps-color_material"
                     control={control}
                     label="Color, Material, and Finish"
                  />
                  <TextArea
                     name="ps-dimention_weight"
                     control={control}
                     label="Dimention and Weight"
                  />
               </div>
               <div className="flex flex-col md:flex-row gap-4 text-gray-600 text-lg">
                  <TextArea
                     name="ps-packing_packaging"
                     control={control}
                     label="Packing and assortment requirements"
                  />
                  <TextArea
                     name="ps-logo_label"
                     control={control}
                     label="Logo and Labelling /tag requirements"
                  />
               </div>
               <div className="flex flex-col md:flex-row gap-4 text-gray-600 text-lg">
                  <TextArea
                     name="ps-shipping_mark"
                     control={control}
                     label="Shipping Mark"
                  />
                  <TextArea
                     name="ps-add_comments"
                     control={control}
                     label="Additional Comments"
                  />
               </div>
            </div>
            {/* <div className="flex gap-2 my-4">
               <RegularButton
                  title="Upload"
                  className="py-2 cursor-pointer px-4 text-white rounded bg-blue-500 border-blue-500"
               />
               <RegularButton
                  title="Delete"
                  className="py-2 cursor-pointer px-4 text-white rounded bg-red-500 border-red-500"
               />
            </div> */}

            <div className=" bg-white-fa border-white-e9 border-b-2 p-4 rounded-t-lg w-full text-blue-2 mt-4">
               Please upload all relevent documents concerning your order, such
               as Purchase Order, Approved trim card，Picture of the product,
               and Product sketch.
            </div>
         </div>
      </section>
   );
}

export default ProductSpesification;
