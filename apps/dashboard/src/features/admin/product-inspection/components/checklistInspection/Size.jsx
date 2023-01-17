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

const Size  = () => {
    const [size, setSize] = useState('XS')
    const {control} = useForm()
    const generateButton = (array) => {
        return array.map((data) => (
            <button className={`border flex-1 py-2 ${size === data ? 'bg-[#2854F6] text-white' : 'bg-white'}`} onClick={() => setSize(data)}>{data}</button>
        ))
    }
    return (
        <CustomWrapper
            label="Size"
            withParent
        >
            <div className='w-full'>
                <div className='flex flex-row w-full rounded-lg border overflow-hidden font-bold'>
                    {generateButton(['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'])}
                </div>
                <div className='w-full flex mt-2 space-x-1'>
                    <div className='w-2/5 bg-[#7A7A7A] text-white py-3 text-center rounded-md'>
                        POM
                    </div>
                    <div className='w-3/5 flex space-x-1'>
                        <div className='w-1/3 bg-[#7A7A7A] text-white py-3 rounded-md text-center'>
                            Required
                        </div>
                        <div className='w-1/3 bg-[#7A7A7A] text-white py-3 rounded-md text-center'>
                            Tolerance
                        </div>
                        <div className='w-1/3 bg-[#7A7A7A] text-white py-3 rounded-md text-center'>
                            Actual Sample
                        </div>
                    </div>
                </div>
                <div className='flex justify-end w-full mt-2 font-bold'>
                    <div className='w-2/5 flex flex-row space-x-1'>
                        <div className='w-1/4 bg-[#F4F4F4] border border-[#F4F4F4] text-[#242323] py-2 rounded-md text-center'>
                            -
                        </div>
                        <div className='w-1/4 bg-[#F4F4F4] border border-[#F4F4F4] text-[#242323] py-2 rounded-md text-center'>
                            +
                        </div>
                        <div className='w-1/6 bg-[#F4F4F4] border border-[#F4F4F4] text-[#242323] py-2 rounded-md text-center'>
                            1
                        </div>
                        <div className='w-1/6 bg-[#F4F4F4] border border-[#F4F4F4] text-[#242323] py-2 rounded-md text-center'>
                            2
                        </div>
                        <div className='w-1/6 bg-[#F4F4F4] border border-[#F4F4F4] text-[#242323] py-2 rounded-md text-center'>
                            3
                        </div>
                    </div>
                </div>
                <div className='w-full flex mt-2 space-x-1 text-[#A7A7A7]'>
                    <div className='w-2/5 border border-[#F4F4F4] py-2 px-4 text-left rounded-md'>
                        Insert Here
                    </div>
                    <div className='w-1/5 border border-[#F4F4F4] py-2 rounded-md text-center'>
                        1.0
                    </div>
                    <div className='w-2/5 flex space-x-1'>
                        <div className='w-1/4 bg-white border border-[#F4F4F4]  py-2 rounded-md text-center'>
                            1.0
                        </div>
                        <div className='w-1/4 bg-white border border-[#F4F4F4]  py-2 rounded-md text-center'>
                            1.0
                        </div>
                        <div className='w-1/6 bg-white border border-[#F4F4F4]  py-2 rounded-md text-center'>
                            1.0
                        </div>
                        <div className='w-1/6 bg-white border border-[#F4F4F4]  py-2 rounded-md text-center'>
                            1.0
                        </div>
                        <div className='w-1/6 bg-white border border-[#F4F4F4]  py-2 rounded-md text-center'>
                            1.0
                        </div>
                    </div>
                </div>
                <div className='w-full flex mt-2 space-x-1 text-[#A7A7A7]'>
                    <div className='w-2/5 border border-[#F4F4F4] py-2 px-4 text-left rounded-md'>
                        Insert Here
                    </div>
                    <div className='w-1/5 border border-[#F4F4F4] py-2 rounded-md text-center'>
                        1.0
                    </div>
                    <div className='w-2/5 flex space-x-1'>
                        <div className='w-1/4 bg-white border border-[#F4F4F4]  py-2 rounded-md text-center'>
                            1.0
                        </div>
                        <div className='w-1/4 bg-white border border-[#F4F4F4]  py-2 rounded-md text-center'>
                            1.0
                        </div>
                        <div className='w-1/6 bg-white border border-[#F4F4F4]  py-2 rounded-md text-center'>
                            1.0
                        </div>
                        <div className='w-1/6 bg-white border border-[#F4F4F4]  py-2 rounded-md text-center'>
                            1.0
                        </div>
                        <div className='w-1/6 bg-white border border-[#F4F4F4]  py-2 rounded-md text-center'>
                            1.0
                        </div>
                    </div>
                </div>
                <div className='w-full flex mt-2 space-x-1 text-[#A7A7A7]'>
                    <div className='w-2/5 border border-[#F4F4F4] py-2 px-4 text-left rounded-md'>
                        Insert Here
                    </div>
                    <div className='w-1/5 border border-[#F4F4F4] py-2 rounded-md text-center'>
                        1.0
                    </div>
                    <div className='w-2/5 flex space-x-1'>
                        <div className='w-1/4 bg-white border border-[#F4F4F4]  py-2 rounded-md text-center'>
                            1.0
                        </div>
                        <div className='w-1/4 bg-white border border-[#F4F4F4]  py-2 rounded-md text-center'>
                            1.0
                        </div>
                        <div className='w-1/6 bg-white border border-[#F4F4F4]  py-2 rounded-md text-center'>
                            1.0
                        </div>
                        <div className='w-1/6 bg-white border border-[#F4F4F4]  py-2 rounded-md text-center'>
                            1.0
                        </div>
                        <div className='w-1/6 bg-white border border-[#F4F4F4]  py-2 rounded-md text-center'>
                            1.0
                        </div>
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

export default Size