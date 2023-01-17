import React from 'react'
import Chip from '../../../../../../components/product-inspection/Chip'
import TextInput from '../../../../../../components/product-inspection/TextInput'

const QuantityChecklistTable = () => {
    return (
        <>
            <div className='flex gap-2 mb-3'>
                <Chip type='darkgrey'>
                    Checklist
                </Chip>
                <Chip type='darkgrey'>
                    Data
                </Chip>
            </div>
            <div className='flex gap-2 mb-1'>
                <p className='flex-1 font-semibold'>
                    P.O. No.
                </p>
                <Chip type='grey'>
                    Sync
                </Chip>
            </div>
            <div className='flex gap-2 mb-1'>
                <p className='flex-1 font-semibold'>
                    Item/Style/ Product No./ SKU
                </p>
                <Chip type='grey'>
                    Sync
                </Chip>
            </div>
            <div className='flex gap-2 mb-1'>
                <p className='flex-1 font-semibold'>
                    Order Quantity
                </p>
                <Chip type='grey'>
                    Sync
                </Chip>
            </div>
            <div className='flex gap-2 items-center mb-1'>
                <p className='flex-1 font-semibold'>
                    Shipment Quantity- Units
                </p>
                <div className='flex-1'>
                    <TextInput
                    />
                </div>
            </div>
            <div className='flex gap-2 items-center mb-1'>
                <p className='flex-1 font-semibold'>
                    Shipment Quantity- %
                </p>
                <div className='flex-1'>
                    <TextInput
                    />
                </div>
            </div>
            <div className='flex gap-2 items-center mb-1'>
                <p className='flex-1 font-semibold'>
                    Presented Quantity for Inspection
                </p>
                <div className='flex-1'>
                    <TextInput
                    />
                </div>
            </div>
            <div className='flex gap-2 items-center mb-1'>
                <p className='flex-1 font-semibold'>
                    Units Packed in Cartons- QTY
                </p>
                <div className='flex-1'>
                    <TextInput
                    />
                </div>
            </div>
            <div className='flex gap-2 items-center mb-1'>
                <p className='flex-1 font-semibold'>
                    Units Packed in Cartons- %
                </p>
                <div className='flex-1'>
                    <TextInput
                    />
                </div>
            </div>
            <div className='flex gap-2 items-center mb-1'>
                <p className='flex-1 font-semibold'>
                    Units Finished Not Packed- QTY
                </p>
                <div className='flex-1'>
                    <TextInput
                    />
                </div>
            </div>
            <div className='flex gap-2 items-center mb-1'>
                <p className='flex-1 font-semibold'>
                    Units Finished Not Packed- %
                </p>
                <div className='flex-1'>
                    <TextInput
                    />
                </div>
            </div>
            <div className='flex gap-2 items-center mb-1'>
                <p className='flex-1 font-semibold'>
                    Units Not Finished- QTY
                </p>
                <div className='flex-1'>
                    <TextInput
                    />
                </div>
            </div>
            <div className='flex gap-2 items-center mb-1'>
                <p className='flex-1 font-semibold'>
                    Units Not Finished- %
                </p>
                <div className='flex-1'>
                    <TextInput
                    />
                </div>
            </div>
        </>
    )
}

export default QuantityChecklistTable