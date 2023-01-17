import React, { useState } from 'react'
import CustomWrapper from '../CustomWrapper'
import TextInput from '../../../../../components/product-inspection/TextInput'
import { Dropdown } from '../../../../../components/product-inspection/DropDown'
import { Checkbox } from 'primereact/checkbox'
import { Button } from '../../../../../components/product-inspection/Button'
import { useRef } from 'react'
import { Menu } from 'primereact/menu'
import { IconEdit } from "~/components/icons/IconEdit";
import { IconDelete } from "~/components/icons/IconDelete";
import QuestionModal from './components/QuestionModal'
import { useForm } from 'react-hook-form'

const Chapter = (props) => {
    const menu = useRef(null)
    const [modal, setModal] = useState(false)
    const {control} = useForm()

    const items = [
        {
            label: "Edit",
            icon: <IconEdit className="ml-auto flex-order-1" />,
            command() {
                setModal(true)
            },

        },
        {
            label: "Delete",
            icon: <IconDelete className="ml-auto text-blue-2 flex-order-1" />,
            command() {
                props.deleteData(selected.current);
            },
        },
    ];

    return (
        <CustomWrapper
            label="Chapter"
            withParent
        >
            <div className='p-3 py-4 flex flex-col gap-y-3'>
                <div className='grid grid-cols-8 font-bold mb-4 gap-x-4'>
                    <div className='text-center'>Sequence</div>
                    <div className='text-center col-span-2'>Name</div>
                    <div className='text-center'>Type</div>
                    <div className='text-center col-span-2'>Instruction</div>
                    <div className='text-center'>Is Chaked ? </div>
                    <div className='text-center'>Action</div>
                </div>
                <div className='grid grid-cols-8 items-center gap-x-4'>
                    <div>
                        <TextInput
                        />
                    </div>
                    <div className='col-span-2'>
                        <TextInput
                        />
                    </div>
                    <div>
                        <Dropdown
                            options={[
                                { label: 'Normal', value: 'normal' }
                            ]}
                        />
                    </div>
                    <div className='col-span-2 text-sm whitespace-pre-line'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi, possimus praesentium? Minima odit aperiam nostrum, incidunt officia nisi reiciendis excepturi.</div>
                    <div className='flex justify-center'>
                        <Checkbox
                            value={true}
                            onChange={() => console.log("change")}
                        />
                    </div>
                    <div className='flex justify-center'>
                        <Button
                            icon={
                                <i
                                    className="fa-solid fa-ellipsis"
                                    style={{ color: "var(--secondary-menu-text-color)" }}
                                ></i>
                            }
                            className="p-button-rounded p-button-text"
                            aria-label="Options"
                            tooltip="More"
                            onClick={(event) => {
                                menu.current.toggle(event);
                            }}
                            aria-haspopup
                            aria-controls="more-options"
                        />
                    </div>
                </div>
            </div>
            <Menu
                style={{
                    maxWidth: "125px",
                }}
                model={items}
                popup
                ref={menu}
                id="more-options"
            />
            <QuestionModal 
                onHide={() => setModal(false)}
                visible={modal}
                control={control}
            />
        </CustomWrapper>
    )
}

export default Chapter