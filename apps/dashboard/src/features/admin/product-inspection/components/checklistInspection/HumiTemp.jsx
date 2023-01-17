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

const HumiTemp = () => {
    const [size, setSize] = useState('XS')
    const { control } = useForm()
    return (
        <CustomWrapper
            label="Humidity and Temperature Check"
            withParent
        >
            <div className='mt-4'>
                <div className='flex gap-2 mb-2'>
                    <div className='flex-auto w-1/3'>
                        <Chip type="darkgrey">Location</Chip>
                    </div>
                    <div className='flex-1'>
                        <Chip type="darkgrey">Time</Chip>
                    </div>
                    <div className='flex-1'>
                        <Chip type="darkgrey">Temperature</Chip>
                    </div>
                    <div className='flex-1'>
                        <Chip type="darkgrey">Humidity</Chip>
                    </div>
                </div>
                <div className='flex gap-2 mb-1'>
                    <div className='flex-auto w-1/3'>
                        <Chip type="grey">Finished Goods</Chip>
                    </div>
                    <div className='flex-1'>
                        <Chip type="grey">10:18</Chip>
                    </div>
                    <div className='flex-1'>
                        <Chip type="grey">32.C</Chip>
                    </div>
                    <div className='flex-1'>
                        <Chip type="grey">60%</Chip>
                    </div>
                </div>
                <div className='flex gap-2 mb-1'>
                    <div className='flex-auto w-1/3'>
                        <Chip type="grey">Warehoue</Chip>
                    </div>
                    <div className='flex-1'>
                        <Chip type="grey">10:18</Chip>
                    </div>
                    <div className='flex-1'>
                        <Chip type="grey">32.C</Chip>
                    </div>
                    <div className='flex-1'>
                        <Chip type="grey">60%</Chip>
                    </div>
                </div>
                <div className='flex gap-2 mb-1'>
                    <div className='flex-auto w-1/3'>
                        <Chip type="grey">Export Catoon </Chip>
                    </div>
                    <div className='flex-1'>
                        <Chip type="grey">10:18</Chip>
                    </div>
                    <div className='flex-1'>
                        <Chip type="grey">32.C</Chip>
                    </div>
                    <div className='flex-1'>
                        <Chip type="grey">60%</Chip>
                    </div>
                </div>
                <div className='flex gap-2 mb-1'>
                    <div className='flex-auto w-1/3'>
                        <Chip type="grey">Enter Other Location Name</Chip>
                    </div>
                    <div className='flex-1'>
                        <Chip type="grey">10:18</Chip>
                    </div>
                    <div className='flex-1'>
                        <Chip type="grey">32.C</Chip>
                    </div>
                    <div className='flex-1'>
                        <Chip type="grey">60%</Chip>
                    </div>
                </div>
                <div className='flex gap-2 mb-1'>
                    <div className='flex-auto w-1/3'>
                        <Chip type="grey">Enter Other Location Name</Chip>
                    </div>
                    <div className='flex-1'>
                        <Chip type="grey">10:18</Chip>
                    </div>
                    <div className='flex-1'>
                        <Chip type="grey">32.C</Chip>
                    </div>
                    <div className='flex-1'>
                        <Chip type="grey">60%</Chip>
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

export default HumiTemp