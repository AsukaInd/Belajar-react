import { Dialog } from 'primereact/dialog'
import React from 'react'
import WrapperColumn from '../../../../../../components/product-inspection/WrapperColumn'
import TextInput from '../../../../../../components/product-inspection/TextInput'
import CustomCheckbox from '../../../../../../components/product-inspection/CustomCheckbox'
import CardContent from '../../../../../../components/product-inspection/CardContent'
import { Dropdown } from '../../../../../../components/product-inspection/DropDown'
import { Button } from '../../../../../../components/product-inspection/Button'
import BrowseImage from '../../../../../../components/product-inspection/BrowseImage'
import { TextArea } from '../../../../../../components/product-inspection/TextArea'

const Footer = (props) => {
    return (
        <div className='flex justify-end'>
            <Button
                label="Save"
                onClick={props.onSave}
                className="bg-[#0073B7] my-1 w-1/12"
            />
        </div>
    )
}

const QuestionModal = ({ visible, onHide, control }) => {
    return (
        <Dialog
            visible={visible}
            onHide={onHide}
            header="Chapter  Name- Arrival  Detail"
            className='w-[80vw] min-h-[60vh]'
            footer={
                <Footer
                    onSave={onHide}
                />
            }
        >
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
        </Dialog>
    )
}

export default QuestionModal