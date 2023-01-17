import React from 'react'
import CustomWrapper from '../CustomWrapper'
import Chip from '../../../../../components/product-inspection/Chip'
import TextInput from '../../../../../components/product-inspection/TextInput'

const Overall = () => {
    const createOverallItem = (desc, sampleSize, pass, fail, pending, na) => {
        return (
            <div className='flex gap-1 mt-4'>
                <div className='w-1/3'>
                    <Chip type="white" left>{desc}</Chip>
                </div>
                <div className='w-1/4'>
                    <Chip type="white">{sampleSize}</Chip>
                </div>
                <div className='flex-1'>
                    <Chip type={pass ? 'success' : 'white'}>Pass</Chip>
                </div>
                <div className='flex-1'>
                    <Chip type={fail ? 'fail' : 'white'}>Fail</Chip>
                </div> 
                <div className='flex-1'>
                    <Chip type={pending ? 'pending' : 'white'}>Pending</Chip>
                </div>
                <div className='flex-1'>
                    <Chip type="white">N/A</Chip>
                </div>
                <div className='flex-1'>
                    <TextInput 
                        placeholder="Add a remark"
                        height='h-[30px]'
                    />
                </div>
            </div>
        )
    }
  return (
    <CustomWrapper
        label="Overall"
        withParent
    >
        <div>
            <div className='flex'>
                <div className='flex-1'>
                    <Chip type='white'>
                        <p className='font-semibold text-lg'>Sequence</p>
                    </Chip>
                </div>
                <div className='flex-1'>
                    <Chip type='white'>
                        <p className=''>19</p>
                    </Chip>
                </div>
                <div className='flex-1'>
                    <Chip type='white'>
                        <p className='font-semibold text-lg'>Checklist Type</p>
                    </Chip>
                </div>
                <div className='flex-1'>
                    <Chip type='white'>
                        <p className=''>Overall Summary</p>
                    </Chip>
                </div>
            </div>
            <div className='flex gap-1 mt-4'>
                <div className='w-1/3'>
                    <Chip type="darkgrey">Defect Description</Chip>
                </div>
                <div className='w-1/4'>
                    <Chip type="darkgrey">Sample Size</Chip>
                </div>
                <div className='flex-1'>
                    <Chip type="darkgrey">Pass</Chip>
                </div>
                <div className='flex-1'>
                    <Chip type="darkgrey">Fail</Chip>
                </div>
                <div className='flex-1'>
                    <Chip type="darkgrey">Pending</Chip>
                </div>
                <div className='flex-1'>
                    <Chip type="darkgrey">N/A</Chip>
                </div>
                <div className='flex-1'>
                    <Chip type="darkgrey">Remarks</Chip>
                </div>
            </div>
            { createOverallItem('1. Shiipping Marks',' 5 cartons', 0,0,0,0 )}
            { createOverallItem('2. Product Conformity  Style','  100% of Samples Size', 0,0,0,0 )}
            { createOverallItem('3. Material',' 100% of Samples Size', 0,0,0,0 )}
            { createOverallItem('4. Color',' 5 cartons', 0,0,0,0 )}
            { createOverallItem('5. Packing & Assortment Assortment (Color/style/size) ',' 100% of Samples Size', 0,0,0,0 )}
            { createOverallItem('6. Export Carton Packing',' 5 cartons', 0,0,0,0 )}
            { createOverallItem('7. Inner carton packing',' 5 cartons', 0,0,0,0 )}
            { createOverallItem('8. Product packaging of carton (Kg)',' 3 cartons', 1,0,0,0 )}
        </div>
    </CustomWrapper>
  )
}

export default Overall