import React from 'react'
import CustomWrapper from '../CustomWrapper'
import TextInput from '../../../../../components/product-inspection/TextInput'
import CustomCheckbox from '../../../../../components/product-inspection/CustomCheckbox'
import BrowseImage from '../../../../../components/product-inspection/BrowseImage'
import WrapperColumn from '../../../../../components/product-inspection/WrapperColumn'
import CardContent from '../../../../../components/product-inspection/CardContent'
import { Dropdown } from '../../../../../components/product-inspection/DropDown'
import { Button } from '../../../../../components/product-inspection/Button'
import { TextArea } from '../../../../../components/product-inspection/TextArea'
import { useForm } from 'react-hook-form'
import Chip from '../../../../../components/product-inspection/Chip'
import QuantityChecklistTable from './components/QuantityChecklistTable'

const Quantity = () => {
    const { control } = useForm()
    return (
        <CustomWrapper
            label="Quantity"
            withParent
        >
            <WrapperColumn
                left={
                    <div className='flex flex-col gap-4 mt-5'>
                        <TextInput
                            label="Checklist Name"
                            placeholder="Quantity"
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
                    </div>
                }
                right={
                    <>
                        <div className='mt-5'>
                            <QuantityChecklistTable />
                            <Button
                                label="Add Another Quantity Checklist"
                                className="bg-[#0073B7] my-6 w-full"
                            />
                            <CardContent
                                className="my-4"
                            >
                                <TextArea
                                    control={control}
                                    name="card_number"
                                    label="List of Export Carton Numbers Opened"
                                />
                            </CardContent>
                            <CardContent>
                                <TextArea
                                    control={control}
                                    name="card_number"
                                    label="Total       Cartons were opened for sampling."
                                />
                            </CardContent>
                        </div>
                    </>
                }
            />
        </CustomWrapper>
    )
}

export default Quantity