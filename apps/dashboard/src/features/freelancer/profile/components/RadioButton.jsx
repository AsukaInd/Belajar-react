import { useController } from "react-hook-form"

export function RadioButton({ control, name, label, index = null }) {
    const { field } = useController({ name, control })

    return (
        <div>
            <input
                type="radio"
                id={`${name}-${label}`}
                checked={index ? field.value === index : field.value === label}
                onChange={() => {
                    field.onChange(index || label)
                }}
            />
            <label htmlFor={`${name}-${label}`}>{label}</label>
        </div>
    )
}