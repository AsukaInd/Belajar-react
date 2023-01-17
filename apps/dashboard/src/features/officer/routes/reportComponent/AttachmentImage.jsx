import React from 'react'

const AttachmentImage = ({src, name}) => {
  return (
    <div className='flex flex-column p-2'>
        <img src={src} alt={name} className="w-full"/>
        <p className='mt-2 text-center text-sm'>{name}</p>
    </div>
  )
}

export default AttachmentImage