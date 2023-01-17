import React from "react";
import { DropdownField } from "../../../../../../components/product-inspection/DropDown";
import { TextField } from "../../../../../../components/product-inspection/TextField";
import { OPTIONS_SAMPLING_PLANS } from "./const";

function SamplingSize({ control }) {
   return (
      <section className="drop-shadow bg-white rounded-lg mt-8 border border-gray-500 pb-4">
         <div className="flex justify-between bg-white-fa border-white-e9 border-b-2 p-4 rounded-t-lg">
            <h1 className="font-bold text-2xl my-auto">Sampling Size</h1>
         </div>
         <div className="p-4">
            <div className="w-full bg-white-fa border-white-e9 px-4 py-3 rounded text-blue-2">
               This is to estimate your budget based on your experience to
               sampling
            </div>

            <div className="flex flex-col md:flex-row gap-4 my-6">
            <TextField
                  label="Pieces can be inspected in one day of work?"
                  placeholder="Select estimated value"
                  name="total_day"
                  control={control}
                  isRequired
               />
               <DropdownField
                  label="Your sampling plan"
                  placeholder="Select sampling plan"
                  name="sample_size"
                  control={control}
                  options={OPTIONS_SAMPLING_PLANS}
               />
            </div>

            <p className="w-full my-4 bg-green-50 border-white-e9 px-4 py-3 rounded text-[#41B92A]">
               <b> Level II offers a higher sample size </b>
               <br /> Select level III when you have low confidence in your
               supplier, for risky products or if you have high quality
               requirements
            </p>

            <div className="flex w-full border-white-e9 px-4 py-3 rounded-full border-1 justify-between ">
               <div>
                  Sampling Size <b>80</b> | Number of Mandays <b>1</b>
               </div>
               <div>
                  Estimation Budget
                  <span className="bg-blue-2 rounded-full p-2 text-white font-bold mx-3 px-4 ">
                     $2.500
                  </span>
               </div>
            </div>
         </div>
      </section>
   );
}

export default SamplingSize;
