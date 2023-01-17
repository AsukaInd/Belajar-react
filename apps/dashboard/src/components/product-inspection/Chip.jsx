import React from 'react'

const Chip = ({ children, type, left }) => {
    const styles = {
        darkgrey: {
            backgroundColor: '#7A7A7A',
            color: 'white'
        },
        grey: {
            backgroundColor: '#E9E9E9',
            color: '#7A7A7A'
        },
        white: {
            backgroundColor: 'white',
            border: '1px solid #F4F4F4',
            color: '#7A7A7A'
        },
        success: {
            backgroundColor: '#61B15A',
            color: 'white'
        },
        fail: {
            backgroundColor: '#EB4646',
            color: 'white'
        },
        pending: {
            backgroundColor: '#A7A7A7',
            color: 'white'
        }
    }
    return (
        <div 
            className={`flex-1 flex rounded-md h-[30px] ${left ? 'justify-start px-3' : 'justify-center'} items-center`}
            style={styles[type || 'white']}
        >
            {children}
        </div>
    )
}

export default Chip