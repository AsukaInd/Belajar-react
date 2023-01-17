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

const Workmanship = () => {
    const [size, setSize] = useState(1)
    const { control } = useForm()

    const generateButton = (array) => {
        return array.map((data) => (
            <button className={`border flex-1 py-2 ${size === data ? 'bg-[#0073B7] text-white' : 'bg-white'}`} onClick={() => setSize(data)}>{data}</button>
        ))
    }
    return (
        <CustomWrapper
            label="Cardboard weight and thickness, securing tape "
            withParent
        >
            <div className='mt-4'>
                <div className='flex flex-row w-full rounded-lg border overflow-hidden font-bold'>
                    {generateButton([1,2,3,4,5,6,7,8,9,10])}
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

export default Workmanship