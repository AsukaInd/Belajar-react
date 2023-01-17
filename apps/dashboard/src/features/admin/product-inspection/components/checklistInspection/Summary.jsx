import React from 'react'
import CustomWrapper from '../CustomWrapper'
import Chip from '../../../../../components/product-inspection/Chip'
import TextInput from '../../../../../components/product-inspection/TextInput'
import { TextArea } from '../../../../../components/product-inspection/TextArea'
import { useForm } from 'react-hook-form'

const Summary = () => {
    const { control } = useForm()
    const createSummary = (level, aql, acc, totalFund) => {
        return (
            <>
                <div className='flex gap-2 mb-1'>
                    <div className='flex-auto w-1/3'>
                        <Chip type="white" left>{level}</Chip>
                    </div>
                    <div className='flex-1'>
                        <Chip type="grey">{aql}</Chip>
                    </div>
                    <div className='flex-1'>
                        <Chip type="grey">{acc}</Chip>
                    </div>
                    <div className='flex-1'>
                        <Chip type="white">{totalFund}</Chip>
                    </div>
                </div>
            </>
        )
    }

    const createSummaryDetail = (defect, critical, major, minor) => {
        return (
            <>
                <div className='flex gap-2 mb-1'>
                    <div className='flex-auto w-1/3'>
                        <Chip type="white" left>{defect}</Chip>
                    </div>
                    <div className='flex-1'>
                        <TextInput
                            type="number"
                            placeholder={critical}
                            height='h-[30px]'
                        />
                    </div>
                    <div className='flex-1'>
                        <TextInput
                            placeholder={major}
                            type="number"
                            height='h-[30px]'
                        />
                    </div>
                    <div className='flex-1'>
                        <TextInput
                            placeholder={minor}
                            type="number"
                            height='h-[30px]'
                        />
                    </div>
                </div>
            </>
        )
    }
    return (
        <CustomWrapper
            label="Workmanship Summary"
            withParent
        >
            <div>
                <div className='flex gap-2 mb-2'>
                    <div className='flex-auto w-1/3'>
                        <Chip type="darkgrey">Level</Chip>
                    </div>
                    <div className='flex-1'>
                        <Chip type="darkgrey">AQL</Chip>
                    </div>
                    <div className='flex-1'>
                        <Chip type="darkgrey">Accepted</Chip>
                    </div>
                    <div className='flex-1'>
                        <Chip type="darkgrey">Total Fund</Chip>
                    </div>
                </div>
                {createSummary('Critical', '1.0', '1.0', '1.0')}
                {createSummary('Major', '1.0', '1.0', '1.0')}
                {createSummary('Minor', '1.0', '1.0', '1.0')}
            </div>
            <div className='py-4'>
                <h3 className='font-bold text-lg'>Detail</h3>
            </div>
            <div>
                <div className='flex gap-2 mb-2'>
                    <div className='flex-auto w-1/3'>
                        <Chip type="darkgrey">Defect Description</Chip>
                    </div>
                    <div className='flex-1'>
                        <Chip type="darkgrey">Critical</Chip>
                    </div>
                    <div className='flex-1'>
                        <Chip type="darkgrey">Major</Chip>
                    </div>
                    <div className='flex-1'>
                        <Chip type="darkgrey">Minor</Chip>
                    </div>
                </div>
                {createSummaryDetail('Sync with Defect item', '1.0', '1.0', '1.0')}
                {createSummaryDetail('Sync with Defect item', '1.0', '1.0', '1.0')}
                {createSummaryDetail('Sync with Defect item', '1.0', '1.0', '1.0')}
                {createSummaryDetail('Total  Found', '1.0', '1.0', '1.0')}
                {createSummaryDetail('Allowned', '1.0', '1.0', '1.0')}
                {createSummaryDetail('Sample Size', '200', '1.0', '1.0')}
                <div className='flex gap-2 mb-2'>
                    <div className='flex-auto w-1/3'>
                        <Chip type="darkgrey">Result</Chip>
                    </div>
                    <div className='flex-1'>
                        <Chip type="success">Pass</Chip>
                    </div>
                    <div className='flex-1'>
                        <Chip type="fail">Fail</Chip>
                    </div>
                    <div className='flex-1'>
                        <Chip type="pending">Pending</Chip>
                    </div>
                </div>
                <div className='flex flex-col gap-4'>
                    <TextInput
                        label="Sequence"
                        placeholder="29"
                    />
                    <TextInput
                        label="Checklist Type"
                        placeholder="Checklist Type Dropdown..."
                    />
                    <TextArea
                        label="Note"
                        name="note"
                        control={control}
                    />
                </div>
            </div>
        </CustomWrapper>
    )
}

export default Summary