import React from "react";
import { TextArea } from "../../../../../components/product-inspection/TextArea";

export default function ProductSpesification({ control }) {
   return (
      <div>
         <div className="bg-blue-1 w-full text-white p-2 rounded">
            Product Spesification
         </div>
         <div className="flex flex-col gap-4 mt-4">
            <TextArea
               name="critical"
               control={control}
               label="Color, Material, and Finish"
               rows={4}
            />
            <TextArea
               name="critical"
               control={control}
               label="Dimention and Weight"
               rows={4}
            />
            <TextArea
               name="critical"
               control={control}
               label="Packing and Packaging"
               rows={4}
            />
            <TextArea
               name="critical"
               control={control}
               label="Logo and Label"
               rows={4}
            />
            <TextArea
               name="critical"
               control={control}
               label="Shipping Mark"
               rows={4}
            />
            <TextArea
               name="critical"
               control={control}
               label="Additional Comments"
               rows={4}
            />
         </div>
      </div>
   );
}
