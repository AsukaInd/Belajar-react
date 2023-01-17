import { Dropdown as DropdownPrime } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { useController } from "react-hook-form";

export function CalendarField({
   label,
   isRequired = false,
   placeholder,
   name,
   control,
}) {
   const { field } = useController({ name, control });
   return (
      <div className="w-full flex flex-col">
         <label className="font-bold text-black-1">
            {label}
            {isRequired && <span className="required-field">*</span>}
         </label>
         <Calendar
            id="basic"
            placeholder={placeholder}
            {...field}
            dateFormat="mm-dd-yy"
         />
      </div>
   );
}
