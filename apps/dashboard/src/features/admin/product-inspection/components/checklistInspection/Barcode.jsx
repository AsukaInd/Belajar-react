import React from 'react'
import CustomWrapper from '../CustomWrapper'
import { useState } from 'react'
import TextInput from '../../../../../components/product-inspection/TextInput'
import { TextArea } from '../../../../../components/product-inspection/TextArea'
import CardContent from '../../../../../components/product-inspection/CardContent'
import CustomCheckbox from '../../../../../components/product-inspection/CustomCheckbox'
import { useForm } from 'react-hook-form'
import WrapperColumn from '../../../../../components/product-inspection/WrapperColumn'
import { Dropdown } from '../../../../../components/product-inspection/DropDown'
import BrowseImage from '../../../../../components/product-inspection/BrowseImage'
import { Button } from '../../../../../components/product-inspection/Button'
import Chip from '../../../../../components/product-inspection/Chip'

const Barcode = () => {
    const [size, setSize] = useState('XS')
    const { control } = useForm()
    return (
        <CustomWrapper
            label="Barcode readability check on: carton, hangtag, polybag   "
            withParent
        >
            <div>
                <div className='w-full mb-2'>
                    <TextInput
                        label="Model"
                        placeholder="Insert Data"
                    />
                </div>
                <div className='flex mb-2 gap-2'>
                    <Chip type="darkgrey">Color</Chip>
                    <Chip type="darkgrey">Size</Chip>
                    <Chip type="darkgrey">EAN Code  Req.</Chip>
                </div>
                <div className='flex mb-2 gap-2'>
                    <div className='w-full flex-1'>
                        <TextInput
                            placeholder="Enter Data"
                        />
                    </div>
                    <div className='w-full flex-1'>
                        <TextInput
                            disabled
                            placeholder="Enter Data"
                        />
                    </div>
                    <div className='w-full flex-1'>
                        <TextInput
                            placeholder="Enter Data"
                        />
                    </div>
                </div>
                <p className='mb-2'>Actual Finding</p>
                <div className='flex mb-2 gap-2'>
                    <Chip type="darkgrey">Color</Chip>
                    <Chip type="darkgrey">Size</Chip>
                    <Chip type="darkgrey">EAN Code  Req.</Chip>
                </div>
                <div className='flex mb-2 gap-2'>
                    <div className='w-full flex-1'>
                        <TextInput
                            placeholder="Enter Data"
                        />
                    </div>
                    <div className='w-full flex-1'>
                        <TextInput
                            disabled
                            placeholder="Enter Data"
                        />
                    </div>
                    <div className='w-full flex-1'>
                        <TextInput
                            placeholder="Enter Data"
                        />
                    </div>
                </div>
            </div>
            <div className='mt-5'></div>
            <WrapperColumn
                left={
                    <div className='flex flex-col gap-4'>
                        <TextInput
                            label="Checklist Name"
                            placeholder="Attendees in the opening meeting"
                        />
                        <CustomCheckbox
                            backgroundGrey
                            className="my-2"
                        />
                        <CardContent className="mb-2">
                            <p>Images</p>
                            <Dropdown
                                className="mb-1"
                            />
                            <Dropdown
                                className="mb-1"
                            />
                            <Button
                                label="Add Another Image"
                                className="bg-[#0073B7] my-1 w-full"
                            />
                        </CardContent>
                        <CardContent>
                            <BrowseImage />
                            <Dropdown
                                className="mb-1"
                            />
                            <Dropdown
                                className="mb-1"
                            />
                            <Button
                                label="Add Another Image"
                                className="bg-[#0073B7] my-1 w-full"
                            />
                        </CardContent>

                    </div>
                }
                right={
                    <>
                        <TextInput
                            label="Sequence"
                            placeholder="2022-11-29"
                        />
                        <TextInput
                            label="Checklist Type"
                            placeholder="Checklist Type Dropdown..."
                        />
                        <TextInput
                            label="Defect Category"
                            placeholder="Defect Category Dropdown..."
                        />
                        <p className='font-bold text-[#2854F6]'>Defect Code and Defect Name</p>
                        <TextInput
                            disabled
                            placeholder="Defect Code Dropdown..."
                        />
                        <TextInput
                            disabled
                            placeholder="Defect Name Dropdown..."
                        />
                        <TextInput
                            label='Defect Level'
                            placeholder='Defect Level Dropdown...'
                        />
                        <TextArea
                            label="Note"
                            name="note"
                            control={control}
                            className="mb-4"
                        />
                    </>
                }
            />
        </CustomWrapper>
    )
}

export default Barcode