import { Checkbox } from 'primereact/checkbox'
import React, { useState } from 'react'

const CustomCheckbox = ({backgroundGrey, className}) => {
    const [checked, setChecked] = useState(false)
  return (
    <div 
        className={`h-[45px] flex px-3 items-center justify-between rounded-md ${backgroundGrey ? 'bg-[#E9E9E9] border border-[#E9E9E9]' : 'bg-white-1 border border-[#E9E9E9]'} ${className}`}
    >
        Checked
        <Checkbox
            checked={checked}
            onChange={(e) => setChecked(e.checked)}
        />
    </div>
  )
}

export default CustomCheckbox