import React from 'react'

const TextInput = ({ label, isRequired, type, register, height,  ...props }) => {
    return (
        <>
            <div className='flex flex-col'>
                {label ?
                    <label className="font-bold text-left text-black-1 mb-1">
                        {label}
                        {isRequired && <span className="required-field text-red-600">*</span>}
                    </label> : null
                }
                <input
                    type={type || "text"}
                    className={`form w-full p-3 text-base rounded-md border-1 border-gray-200 ${height ? height : 'h-[45px]'}`}
                    {...register}
                    {...props}
                />
            </div>
        </>
    )
}

export default TextInput