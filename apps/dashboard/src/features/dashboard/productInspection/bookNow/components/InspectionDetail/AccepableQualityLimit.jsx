import React from "react";
import { DropdownField } from "../../../../../../components/product-inspection/DropDown";
import { OPTIONS_DEFECT } from "./const";

function AccepableQualityLimit({ control }) {
   return (
      <section className="drop-shadow bg-white rounded-lg mt-6 border border-gray-500 pb-4">
         <div className="flex justify-between bg-white-fa border-white-e9 border-b-2 p-4 rounded-t-lg">
            <h1 className="font-bold text-2xl my-auto">
               Accepable Quality Limits
            </h1>
         </div>
         <div className="p-4">
            <div className="w-full bg-white-fa border-white-e9 px-4 py-3 rounded text-blue-2">
               AQL determines the number of pieces with defects that you are
               willing to tolerate. Defects are divided in three types:
               Critical, Major and Minor. The most commonly AQL used for
               Electronic & Electrical products is Critical 0, Major 1.5, Minor
               4. and for Texitles and other product categories is Critical 0,
               Major 2.5, Minor 4 .
            </div>

            <div className="flex flex-col md:flex-row gap-4  mt-4">
               <DropdownField
                  label="Expected Defects Options"
                  placeholder="Select Defect Option"
                  name="defectOptopns"
                  control={control}
                  options={[
                     { value: "standard", label: "Standard" },
                     { value: "custom", label: "Custom" },
                  ]}
               />
               <DropdownField
                  label="For critical defects *"
                  placeholder="Select critical defects"
                  name="critical"
                  control={control}
                  options={OPTIONS_DEFECT}
               />
            </div>
            <div className="flex flex-col md:flex-row gap-4  mt-4">
               <DropdownField
                  label="For Major defects *"
                  placeholder="Select Major defect"
                  name="mayor"
                  control={control}
                  options={OPTIONS_DEFECT}
               />
               <DropdownField
                  label="For Minor defects *"
                  placeholder="Select Minor defect"
                  name="minor"
                  control={control}
                  options={OPTIONS_DEFECT}
               />
            </div>
         </div>
      </section>
   );
}

export default AccepableQualityLimit;
