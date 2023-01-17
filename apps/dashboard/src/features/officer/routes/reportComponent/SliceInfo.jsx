import React from 'react'

const SliceInfo = ({ name, value }) => {
    return (
        <div className="flex py-1 w-full text-xs" style={{ border: "solid grey", borderWidth: "0px 0px 1px 0px" }}>
            <div className="font-medium w-[130px]">{name}</div>
            <div className='flex-1'>{value}</div>
        </div>
    )
}

export default SliceInfo