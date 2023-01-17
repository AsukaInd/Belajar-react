import React from 'react'

const WrapperColumn = ({left, right}) => {
  return (
    <div className='flex space-x-5'>
        <div className='flex-1'>
            {left}
        </div>
        <div className='flex-1'>
            {right}
        </div>
    </div>
  )
}

export default WrapperColumn