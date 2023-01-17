import React from 'react'
import CustomWrapper from '../CustomWrapper'
import TextInput from '../../../../../components/product-inspection/TextInput'
import { useForm } from 'react-hook-form'

const BasicInfo = () => {
    const { register } = useForm()
    return (
        <CustomWrapper
            label="Basic Info"
            withParent
        >
            <div className='grid grid-cols-2 gap-2 p-3 pt-4'>
                <div className='flex-1'>
                    <TextInput
                        label="Inspection Order"
                        type="text"
                        register={register('name')}
                    />
                </div>
                <div className='flex-1'>
                    <TextInput
                        label="Inspection Date"
                        type="text"
                        register={register('name')}
                    />
                </div>
                <div className='min-w-1/3'>
                    <TextInput
                        label="Inspection Address"
                        type="text"
                        register={register('name')}
                    />
                </div>
                <div className='min-w-1/3'>
                    <TextInput
                        label="Supplier"
                        type="text"
                        register={register('name')}
                    />
                </div>
                <div className='min-w-1/3'>
                    <TextInput
                        label="Inspector"
                        type="text"
                        register={register('name')}
                    />
                </div>
            </div>
        </CustomWrapper>
    )
}

export default BasicInfo