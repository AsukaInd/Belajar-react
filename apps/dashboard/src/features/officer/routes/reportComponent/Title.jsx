import React from 'react'

const Title = ({children}) => {
  return (
    <div className='flex items-center text-xl justify-center font-bold uppercase text-cyan-500 my-3'>
        { children }
    </div>
  )
}

export default Title