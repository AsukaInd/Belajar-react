import React from "react";
import { DropdownField } from "../../../../../../components/product-inspection/DropDown";

function ProductionSamples({ register }) {
   return (
      <section className="drop-shadow bg-white rounded-lg mt-4 border border-gray-500">
         <div className="flex justify-between bg-white-fa border-white-e9 border-b-2 p-4 rounded-t-lg">
            <h1 className="font-bold text-2xl my-auto">Production Samples</h1>
         </div>
         <div className="p-4">
            <div className=" bg-white-fa border-white-e9 border-b-2 p-4 rounded-t-lg w-full text-blue-2">
               Inspxt assumes responsibility for properly picking, labeling and
               sealing any required samples at the inspection site. It is
               generally the supplier's responsibility to send them to you by
               courrier. In case you specifically need Inspxt to courrier
               samples to you, the inspector will first send them to Inspxt's
               Hangzhou, China office by domestic courier. Then Inspxt staff
               will organize forwarding the parcel to you at your cost. Inspxt
               will charge an additional US$40 to cover the domestic courier fee
               and handling.
            </div>
            <div className="mt-4 mb-2">
               <p className="font-bold">Do you want us to collect samples from mass production?</p>
               <div className="flex gap-4">
                  <div className="field-radiobutton">
                     <input
                        {...register("product_samples")}
                        type="radio"
                        inputId={`product_samples-yes`}
                        value="yes"
                     />
                     <label
                        htmlFor={`product_samples-yes`}
                        className="cursor-pointer"
                     >
                        Yes
                     </label>
                  </div>

                  <div className="field-radiobutton ">
                     <input
                        {...register("product_samples")}
                        type="radio"
                        inputId={`product_samples-no`}
                        value="no"
                     />
                     <label
                        htmlFor={`product_samples-no`}
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

export default ProductionSamples;
