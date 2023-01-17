import React from "react";
import { DropdownField } from "../../../../../components/product-inspection/DropDown";

export default function SamplingSizeAndAQL({ control }) {
   return (
      <div>
         <div className="bg-blue-1 w-full text-white p-2 rounded">
            Sampling Size
         </div>
         <div className="flex flex-col gap-4 mt-4">
            <DropdownField
               name="supplierCompany"
               label="How many pieces can be inspected in one day of work?"
               placeholder=""
               control={control}
               options={[{ value: "lorem ipsum", label: "lorem ipsum" }]}
            />
            <DropdownField
               name="supplierContact"
               label="Choose your sampling plan:"
               placeholder=""
               control={control}
               options={[{ value: "lorem ipsum", label: "lorem ipsum" }]}
            />
         </div>

         <div className="bg-blue-1 w-full text-white p-2 rounded mt-4">AQL</div>
         <div className="flex flex-col gap-4 mt-4">
            <div className="flex gap-4">
               <DropdownField
                  name="defectOptions"
                  label="Expeted Defects Options"
                  placeholder=""
                  control={control}
                  options={[{ value: "lorem ipsum", label: "lorem ipsum" }]}
               />
               <DropdownField
                  name="criticalDefect"
                  label="For Critical Defects"
                  placeholder=""
                  control={control}
                  options={[{ value: "lorem ipsum", label: "lorem ipsum" }]}
               />
            </div>
            <div className="flex gap-4">
               <DropdownField
                  name="minorDefect"
                  label="For Major Defects"
                  placeholder=""
                  control={control}
                  options={[{ value: "lorem ipsum", label: "lorem ipsum" }]}
               />
               <DropdownField
                  name="majorDefect"
                  label="For Minor Defects"
                  placeholder=""
                  control={control}
                  options={[{ value: "lorem ipsum", label: "lorem ipsum" }]}
               />
            </div>
         </div>
      </div>
   );
}
