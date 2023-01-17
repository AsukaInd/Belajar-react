import { useController } from "react-hook-form";

export function TextArea({
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
         <div className="w-full flex flex-col rounded">
            {isRequired && <span className="required-field">*</span>}
            <textarea
               rows={rows}
               className="p-3 border border-gray-400 rounded mt-1 mx-3"
               placeholder={placeholder}
               required={isRequired}
               {...field}
            />
         </div>
      </div>
   );
}
