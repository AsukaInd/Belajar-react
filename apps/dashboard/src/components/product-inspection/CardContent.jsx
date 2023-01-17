import React from 'react'

const CardContent = ({children, className}) => {
  return (
    <div className={`p-4 rounded-md shadow-md ${className}`}>
        {children}
    </div>
  )
}

export default CardContent