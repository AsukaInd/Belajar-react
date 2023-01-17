import React from "react";
import { TextArea } from "../../../../../../components/product-inspection/TextArea";

function DefectClassification({ control }) {
   return (
      <section className="drop-shadow bg-white rounded-lg mt-8 border border-gray-500">
         <div className="flex justify-between bg-white-fa border-white-e9 border-b-2 p-4 rounded-t-lg">
            <h1 className="font-bold text-2xl my-auto">
               My Defact Classification
            </h1>
         </div>
         <div className="p-4 text-gray-600">
            <div className=" bg-white-fa border-white-e9 border-b-2 p-4 rounded-t-lg w-full text-blue-2">
               Please write down the defects you think that may affect your
               production. Your classification of those defects is important for
               the final result of your inspection.
            </div>
            <div className="flex flex-col md:flex-row gap-4 mt-4">
               <TextArea
                  name="dc-critical"
                  control={control}
                  label="Critical"
                  rows={4}
               />
               <TextArea
                  name="dc-major"
                  control={control}
                  label="Major"
                  rows={4}
               />
               <TextArea
                  name="dc-minor"
                  control={control}
                  label="Minor"
                  rows={4}
               />
            </div>
         </div>
      </section>
   );
}

export default DefectClassification;
