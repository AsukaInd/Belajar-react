import React from 'react'
import CustomWrapper from '../../components/CustomWrapper'
import { useState } from 'react'

const SizeMeasure = () => {
    const [size, setSize] = useState('XS')
    const generateButton = (array) => {
        return array.map((data) => (
            <button className={`border flex-1 py-2 ${size === data ? 'bg-[#2854F6] text-white' : 'bg-white'}`} onClick={() => setSize(data)}>{data}</button>
        ))
    }
    return (
        <CustomWrapper
            label="Size Measurement"
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
        </CustomWrapper >
    )
}

export default SizeMeasure