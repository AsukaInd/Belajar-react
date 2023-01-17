import { Dropdown as DropdownPrime } from "primereact/dropdown";
import { useState } from "react";
import { useController } from "react-hook-form";

export function Dropdown({
   label,
   isRequired = false,
   placeholder,
   options,
   value,
   setValue,
}) {
   const [selected, setSelected] = useState(value);
   return (
      <div className="w-full flex flex-col">
         <label className="font-bold text-black-1">
            {label}
            {isRequired && <span className="required-field">*</span>}
         </label>
         <DropdownPrime
            placeholder={placeholder}
            size="md"
            options={options}
            value={selected}
            onChange={(e) => {
               setSelected(e.value);
               setValue(e.value);
            }}
            className=" border-gray-200 border-1 h-full"
         />
      </div>
   );
}


export function DropdownField({
   label,
   isRequired = false,
   placeholder,
   options,
   name,
   control,
}) {
   const { field} = useController({ name, control });
   return (
      <div className="w-full flex flex-col">
         <label className="font-bold text-black-1">
            {label}
            {isRequired && <span className="required-field">*</span>}
         </label>
         <DropdownPrime
            placeholder={placeholder}
            size="md"
            options={options}
            className=" border-gray-200 border-1 mt-1"
            {...field}
         />
      </div>
   );
}
