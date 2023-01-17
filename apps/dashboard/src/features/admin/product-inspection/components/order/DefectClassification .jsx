import React, { useState } from "react";
import { TextArea } from "../../../../../components/product-inspection/TextArea";

export default function DefectClassification({ control }) {
   return (
      <div>
         <div className="bg-blue-1 w-full text-white p-2 rounded">
            Product Spesification
         </div>
         <div className="flex flex-col gap-4 mt-4">
            <TextArea
               name="critical"
               control={control}
               label="Critical"
               rows={4}
            />
            <TextArea
               name="critical"
               control={control}
               label="Major"
               rows={4}
            />
            <TextArea
               name="critical"
               control={control}
               label="Minor"
               rows={4}
            />
         </div>
      </div>
   );
}
