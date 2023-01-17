import React from "react";
import { RadioButton } from "primereact/radiobutton";
import { DropdownCustom } from "../../../../../../components/product-inspection/DropDownCustom";

const inspector = [
   { label: "Elon Musk", value: "elonMusk" },
   { label: "Mark Zukerberg", value: "markZukerberg" },
   { label: "Bill Gates", value: "billGates" },
];
function ChooseInspector({ setIsHire, hire, setValue, control }) {
   return (
      <div className="p-4">
         <div className="field-radiobutton">
            <RadioButton
               inputId="assign"
               name="city"
               value="Chicago"
               onChange={(e) => setIsHire(false)}
               checked={!hire}
            />
            <label
               htmlFor="assign"
               className="font-bold text-blue-2 cursor-pointer"
            >
               Assign to in-house inspector
            </label>
         </div>
         {!hire && (
            <DropdownCustom 
            options={inspector} 
            control={control} 
            placeholder="Choose Inspector"
            name="assign_inspector"/>
         )}
         <div className="field-radiobutton ">
            <RadioButton
               inputId="hire"
               name="city"
               value="Los Angeles"
               onChange={(e) => setIsHire(true)}
               checked={hire}
            />
            <label
               htmlFor="hire"
               className="font-bold text-red-500 cursor-pointer"
            >
               Hire Inspxt Inspector to do it for you
            </label>
         </div>
      </div>
   );
}

export default ChooseInspector;
