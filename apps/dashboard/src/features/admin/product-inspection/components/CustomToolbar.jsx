import React from "react"
import { useEffect } from "react"
import { useState } from "react"

export function CustomToolbar ({options, name, onChange, containerClassName, buttonClassName, activeButtonClassName, optionActive})  {
    const [selected, setSelected] = useState(options[0].value)
    
    const handleChange = (value) => {
        setSelected(prev => {
            if (prev === value){
                return prev
            }
            onChange({name, value})
            return value
        })
    }

    useEffect(() => {
        if (optionActive) {
            setSelected(optionActive)
        } else {
            setSelected(selected)
        }
    }, [optionActive])

    return (
        <div className={containerClassName ? containerClassName : "overflow-hidden rounded-md"}>
            {
                options.map((option) => (
                    <button
                        onClick={() => handleChange(option.value)}
                        className={buttonClassName ? `${buttonClassName} ${selected === option.value ? activeButtonClassName : ''}` : `bg-[#2854F606] px-5 py-3 text-sm ${selected === option.value ? 'text-[#2854F6] font-semibold' : 'text-[#7A7A7A]'}`}
                    >
                        {option.label}
                    </button>
                ))
            }
        </div>
    )
}