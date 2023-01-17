import React from 'react'

const BrowseImage = ({ onChange, name, className }) => {

    return (
        <label htmlFor="fileUpload" className={className}>
            <div
                className='h-[60px] cursor-pointer rounded-md border-2 px-3 text-[#7A7A7A] bg-[#0073B706] flex items-center border-dashed border-[#0073B7]'
            >
                <i className='pi pi-images text-2xl'></i>
                <p className='text-black-1 ml-4'>Browse or Scan Image</p>
                <input id="fileUpload" type='file' name={name} onChange={onChange} class="hidden" />
            </div>
        </label>
    )
}

export default BrowseImage