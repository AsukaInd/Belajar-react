import React from 'react'
import CustomWrapper from '../../components/CustomWrapper'
import { useState } from 'react'

const WeightChart = () => {
    const [size, setSize] = useState('XS')
    const generateButton = (array) => {
        return array.map((data) => (
            <button className={`border flex-1 py-2 ${size === data ? 'bg-[#2854F6] text-white' : 'bg-white'}`} onClick={() => setSize(data)}>{data}</button>
        ))
    }
    return (
        <CustomWrapper
            label="Weight Chart"
        >
            <div className='w-full'>
                <div className='flex flex-row w-full rounded-lg border overflow-hidden'>
                    {generateButton(['XS','S','M','L','XL','2XL','3XL'])}
                </div>
                <div className='w-full flex mt-2 space-x-1'>
                    <div className='w-1/2 bg-[#7A7A7A] text-white py-3 text-center rounded-md'>
                        Style/Weight
                    </div>
                    <div className='w-1/2 flex space-x-1'>
                        <div className='w-1/3 bg-[#7A7A7A] text-white py-3 rounded-md text-center'>
                            Grams
                        </div>
                        <div className='w-1/3 bg-[#7A7A7A] text-white py-3 rounded-md text-center'>
                            1
                        </div>
                        <div className='w-1/3 bg-[#7A7A7A] text-white py-3 rounded-md text-center'>
                            2
                        </div>
                    </div>
                </div>
                <div className='w-full flex mt-2 space-x-1'>
                    <div className='w-1/2 bg-[#F4F4F4] text-[#242323] py-2 px-4 font-bold text-left rounded-md'>
                        Navy Color
                    </div>
                    <div className='w-1/2 flex space-x-1'>
                        <div className='w-1/3 bg-[#F4F4F4] text-[#242323] py-2 rounded-md text-center'>
                        560
                        </div>
                        <div className='w-1/3 bg-white border border-[#F4F4F4] text-[#242323] py-2 rounded-md text-center'>
                            1.0
                        </div>
                        <div className='w-1/3 bg-white border border-[#F4F4F4] text-[#242323] py-2 rounded-md text-center'>
                            1.0
                        </div>
                    </div>
                </div>
                <div className='w-full flex mt-2 space-x-1'>
                    <div className='w-1/2 bg-[#F4F4F4] text-[#242323] py-2 px-4 font-bold text-left rounded-md'>
                        Maroon Color
                    </div>
                    <div className='w-1/2 flex space-x-1'>
                        <div className='w-1/3 bg-[#F4F4F4] text-[#242323] py-2 rounded-md text-center'>
                        560
                        </div>
                        <div className='w-1/3 bg-white border border-[#F4F4F4] text-[#242323] py-2 rounded-md text-center'>
                            1.0
                        </div>
                        <div className='w-1/3 bg-white border border-[#F4F4F4] text-[#242323] py-2 rounded-md text-center'>
                            1.0
                        </div>
                    </div>
                </div>
            </div>
        </CustomWrapper>
    )
}

export default WeightChart