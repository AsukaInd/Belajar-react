import { useController } from "react-hook-form";

export function TextField({
   label,
   placeholder,
   isRequired = false,
   name,
   control,
   value = "",
   disable = false,
   type = 'text'
}) {
   const { field, fieldState } = useController({ name, control });
   const { error } = fieldState;
   return (
      <div className="w-full flex flex-col">
         <label className="font-bold text-black-1">
            {label}
            {isRequired && <span className="required-field">*</span>}
         </label>
         <input
            value={value}
            type={type}
            className="p-3 border-gray-200 border-1 rounded-md text-gray-700 h-full mt-1"
            placeholder={placeholder}
            required={isRequired}
            disabled={disable}
            {...field}
         />
      </div>
   );
}
