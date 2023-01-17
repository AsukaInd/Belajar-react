import { useController } from "react-hook-form"
import { Calendar } from 'primereact/calendar';

export function DateField({ label, placeholder, isRequired = false, name, control }) {

    const { field, fieldState } = useController({ name, control })
    const { error } = fieldState
    return (
        <div className="w-full flex flex-col">
            <label className="font-bold text-black-1">
                {label}
                {isRequired && <span className="required-field">*</span>}
            </label>
            <Calendar
                className="mt-[3px] py-[4px]"
                id="icon"
                showIcon
                placeholder={placeholder}
                required={isRequired}
                {...field}
            />
        </div>
    );
}
