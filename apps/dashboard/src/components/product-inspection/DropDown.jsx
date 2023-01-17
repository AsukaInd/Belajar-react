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
    fullWidth
}) {
    const [selected, setSelected] = useState(value);
    return (
        <div className={`flex flex-col items-start py-1 ${fullWidth ? 'w-full' : ''}`}>
            {label ?
                <label className="font-bold text-left text-black-1 mb-1">
                    {label}
                    {isRequired && <span className="required-field text-red-600">*</span>}
                </label> : null
            }
            <DropdownPrime
                width="full"
                placeholder={placeholder}
                size="md"
                options={options}
                value={selected}
                onChange={(e) => {
                    setSelected(e.value);
                    setValue(e.value);
                }}
                className=" border-gray-200 border-1 h-full w-full"
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
    disable = false
}) {
    const { field } = useController({ name, control });
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
                className=" border-gray-200 border-1 h-full mt-1"
                {...field}
                disabled={disable}
            />
        </div>
    );
}
