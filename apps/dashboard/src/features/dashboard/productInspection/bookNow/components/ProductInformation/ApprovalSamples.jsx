import React from "react";
import { DropdownField } from "../../../../../../components/product-inspection/DropDown";

function ApprovalSamples({ register}) {
   return (
      <section className="drop-shadow bg-white rounded-lg mt-4 border border-gray-500">
         <div className="flex justify-between bg-white-fa border-white-e9 border-b-2 p-4 rounded-t-lg">
            <h1 className="font-bold text-2xl my-auto">Approval Samples</h1>
         </div>
         <div className="p-4">
            <div className=" bg-white-fa border-white-e9 border-b-2 p-4 rounded-t-lg w-full text-blue-2">
               Please do your maximum to send us approved samples as it can only
               help to have a more reliable quality control. Ideally please send
               directly to the factory in a sealed package.
            </div>
            <div className="mt-4 mb-2">
               <p className="font-bold">Will you provide us with reference/golden sample(s) ?</p>
               <div className="flex gap-4">
                  <div className="field-radiobutton">
                     <input
                        {...register("approval_samples")}
                        type="radio"
                        inputId={`approval_samples-yes`}
                        value="yes"
                     />
                     <label
                        htmlFor={`approval_samples-yes`}
                        className="cursor-pointer"
                     >
                        Yes
                     </label>
                  </div>

                  <div className="field-radiobutton ">
                     <input
                        {...register("approval_samples")}
                        type="radio"
                        inputId={`approval_samples-no`}
                        value="no"
                     />
                     <label
                        htmlFor={`approval_samples-no`}
                        className="cursor-pointer"
                     >
                        No
                     </label>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}

export default ApprovalSamples;
