import React from 'react'
import { classNames } from 'primereact/utils'

const CustomWrapper = ({ children, label, withParent = false }) => {
    return (
        <div className={withParent ? '' : "layout-content"}>
            <div className='flex justify-between my-4 items-center'>
                <div className={classNames('custom-table')}>
                    <table className='w-full'>
                        <thead>
                            <tr>
                                <th>
                                    <h1 className='text-xl'>{label}</h1>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    {children}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default CustomWrapper