import React from 'react'
import CustomWrapper from '../../components/CustomWrapper';

function Quantity() {

    return (
        <>
            <CustomWrapper
                label="Quantity Size"
            >
                <div className="text-base my-3">
                    <div className="grid grid-cols-8 my-0 text-center font-medium" style={{ border: "1px solid grey", borderWidth: "1px 0px" }}>
                        <div className>P.O. No.</div>
                        <div className=''>Item/Style/ <br /> Product <br />  No./ SKU</div>
                        <div>Order <br /> Quantity</div>
                        <div className='h-10'>Shipment <br /> Quantity</div>
                        <div>Presented <br /> Quantity for <br /> Inspection</div>
                        <div >Units <br /> Packed in <br /> Cartons</div>
                        <div >Units <br /> Finished <br /> Not Packed</div>
                        <div >Units <br /> Not <br /> Finished</div>
                        <div className="col-start-3 underline h-8">Units</div>
                        <div className="flex underline-offset-1 h-8">
                            <div className="w-1/2 text-center underline">Units</div>
                            <div className="w-1/2 text-center underline">Ctns</div>
                        </div>
                        <div className="col-start-6 flex underline-offset-1  h-8">
                            <div className="w-1/2 text-center underline">Qty</div>
                            <div className="w-1/2 text-center underline">%</div>
                        </div>
                        <div className="flex underline-offset-1  h-8">
                            <div className="w-1/2 text-center underline">Qty</div>
                            <div className="w-1/2 text-center underline">%</div>
                        </div>
                        <div className="flex underline-offset-1  h-8">
                            <div className="w-1/2 text-center underline">Qty</div>
                            <div className="w-1/2 text-center underline">%</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-8 my-0 py-1" style={{ border: "1px solid grey", borderWidth: "0px 0px 1px" }}>
                        <div className="">35460677</div>
                        <div className="text-center">2800098</div>
                        <div className="text-center h-8">2874</div>
                        <div className="flex h-8">
                            <div className="w-1/2 text-center">2874</div>
                            <div className="w-1/2 text-center">479</div>
                        </div>
                        <div className="text-center">2874</div>
                        <div className="flex h-8">
                            <div className="w-1/2 text-center">2874</div>
                            <div className="w-1/2 text-center">100</div>
                        </div>
                        <div className="flex  h-8">
                            <div className="w-1/2 text-center">0</div>
                            <div className="w-1/2 text-center">0</div>
                        </div>
                        <div className="flex  h-8">
                            <div className="w-1/2 text-center">0</div>
                            <div className="w-1/2 text-center">0</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-8 my-0 py-1" style={{ border: "1px solid grey", borderWidth: "0px 0px 1px" }}>
                        <div className="">35460677</div>
                        <div className="text-center">2800098</div>
                        <div className="text-center h-8">2874</div>
                        <div className="flex h-8">
                            <div className="w-1/2 text-center">2874</div>
                            <div className="w-1/2 text-center">479</div>
                        </div>
                        <div className="text-center">2874</div>
                        <div className="flex h-8">
                            <div className="w-1/2 text-center">2874</div>
                            <div className="w-1/2 text-center">100</div>
                        </div>
                        <div className="flex  h-8">
                            <div className="w-1/2 text-center">0</div>
                            <div className="w-1/2 text-center">0</div>
                        </div>
                        <div className="flex  h-8">
                            <div className="w-1/2 text-center">0</div>
                            <div className="w-1/2 text-center">0</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-8 my-0 py-1" style={{ border: "1px solid grey", borderWidth: "0px 0px 1px" }}>
                        <div className="font-bold">Total</div>
                        <div className="text-center"></div>
                        <div className="text-center h-8">2874</div>
                        <div className="flex h-8">
                            <div className="w-1/2 text-center">2874</div>
                            <div className="w-1/2 text-center">479</div>
                        </div>
                        <div className="text-center">2874</div>
                        <div className="flex h-8">
                            <div className="w-1/2 text-center">2874</div>
                            <div className="w-1/2 text-center">100</div>
                        </div>
                        <div className="flex  h-8">
                            <div className="w-1/2 text-center">0</div>
                            <div className="w-1/2 text-center">0</div>
                        </div>
                        <div className="flex  h-8">
                            <div className="w-1/2 text-center">0</div>
                            <div className="w-1/2 text-center">0</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-7 my-0 py-1 h-20" style={{ border: "1px solid grey", borderWidth: "0px 0px 1px" }}>
                        <div className="col-span-2 h-10">List of Export Carton Numbers Opened</div>
                        <div className="col-span-5 h-10 flex flex-col">
                            <div>Carton No.:</div>
                            <div>2, 13, 27, 33, 45, 66, 72, 89, 113, 165, 168, 177, 186, 190, 193, 194, 198, 203, 251, 338, 469, 473</div>
                        </div>
                    </div>
                </div>
            </CustomWrapper>
        </>
    );
}

export default Quantity;
