import { useController } from "react-hook-form";

export function TextArea({
   label,
   placeholder,
   isRequired = false,
   name,
   control,
   rows = 4
}) {
   const { field, fieldState } = useController({ name, control });
   const { error } = fieldState;
   return (
      <div className="w-full flex flex-col">
         <div className="w-full flex flex-col rounded text-black-1">
            <div className="font-bold">
                {label}
                {isRequired && <span className="required-field">*</span>}
            </div>
            <textarea
               rows={rows}
               className="p-3 border border-gray-400 rounded-lg mt-1"
               placeholder={placeholder}
               required={isRequired}
               {...field}
            />
         </div>
      </div>
   );
}
