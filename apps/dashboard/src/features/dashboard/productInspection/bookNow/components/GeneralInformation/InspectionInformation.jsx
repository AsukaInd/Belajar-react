import React, { useState } from "react";
import { CalendarField } from "../../../../../../components/product-inspection/CalendarField";
import { RadioButton } from "primereact/radiobutton";
import { useController, Controller } from "react-hook-form";

function BooleanQuestion({ label, name, register }) {
   const [yes, setIsYes] = useState();
   return (
      <div className="flex ">
         <div className="w-72">{label}</div>
         <div className="flex gap-4">
            <div className="field-radiobutton">
               <input
                  {...register(name)}
                  type="radio"
                  inputId={`${name}-yes`}
                  // name={name}
                  value={1}
                  onChange={() => setIsYes(1)}
                  checked={yes === 1}
               />
               <label htmlFor={`${name}-yes`} className="cursor-pointer">
                  Yes
               </label>
            </div>

            <div className="field-radiobutton ">
               <input
                  {...register(name)}
                  type="radio"
                  inputId={`${name}-no`}
                  // name={name}
                  value={0}
                  onChange={() => setIsYes(0)}
                  checked={yes === 0}
                  // {...field}
               />
               <label htmlFor={`${name}-no`} className="cursor-pointer">
                  No
               </label>
            </div>
         </div>
      </div>
   );
}

function InspectionInformation({ control, register }) {
   const [date1, setDate1] = useState(null);
   return (
      <section className="drop-shadow bg-white rounded-lg mt-6 border border-gray-500">
         <div className="flex justify-between bg-white-fa border-white-e9 border-b-2 p-4 rounded-t-lg">
            <h1 className="font-bold text-2xl my-auto">
               Inspection Information
            </h1>
         </div>
         <div className="flex flex-col gap-4 text-gray-600 text-lg p-4">
            <div className="flex flex-col md:flex-row gap-4">
               <CalendarField
                  name="ii-inspect_req_date"
                  label="Inspection Request Date"
                  isRequired
                  placeholder="Choose Date"
                  control={control}
               />
               <CalendarField
                  name="ii-expect_ship_date"
                  label="Expeted Shipment Date"
                  isRequired
                  placeholder="Choose Date"
                  control={control}
               />
            </div>

            <div className="flex ">
               <div className="w-72">This inspection is</div>
               <div className="flex gap-4">
                  <div className="field-radiobutton">
                     <input
                        {...register("ii-the_inspection_is")}
                        type="radio"
                        inputId={`ii-the_inspection_is-yes`}
                        value="First Inspection"
                     />
                     <label
                        htmlFor={`ii-the_inspection_is-yes`}
                        className="cursor-pointer"
                     >
                        First Inspection
                     </label>
                  </div>

                  <div className="field-radiobutton ">
                     <input
                        {...register("ii-the_inspection_is")}
                        type="radio"
                        inputId={`ii-the_inspection_is-no`}
                        value="Re-inspection"
                     />
                     <label
                        htmlFor={`ii-the_inspection_is-no`}
                        className="cursor-pointer"
                     >
                        ReInspection
                     </label>
                  </div>
               </div>
            </div>

            <div className="flex ">
               <div className="w-72">Who will pay for the inspection?</div>
               <div className="flex gap-4">
                  <div className="field-radiobutton">
                     <input
                        {...register("ii-who_will_pay_for_he_inspection")}
                        type="radio"
                        inputId={`ii-who_will_pay_for_he_inspection-buyer`}
                        value="Buyer"
                     />
                     <label
                        htmlFor={`ii-who_will_pay_for_he_inspection-buyer`}
                        className="cursor-pointer"
                     >
                        Buyer
                     </label>
                  </div>

                  <div className="field-radiobutton ">
                     <input
                        {...register("ii-who_will_pay_for_he_inspection")}
                        type="radio"
                        inputId={`ii-who_will_pay_for_he_inspection-supplier`}
                        value="Supplier"
                     />
                     <label
                        htmlFor={`ii-who_will_pay_for_he_inspection-supplier`}
                        className="cursor-pointer"
                     >
                        Supplier
                     </label>
                  </div>
                  <div className="field-radiobutton ">
                     <input
                        {...register("ii-who_will_pay_for_he_inspection")}
                        type="radio"
                        inputId={`ii-who_will_pay_for_he_inspection-factory`}
                        value="Factory"
                     />
                     <label
                        htmlFor={`ii-who_will_pay_for_he_inspection-factory`}
                        className="cursor-pointer"
                     >
                        Factory
                     </label>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}

export default InspectionInformation;
