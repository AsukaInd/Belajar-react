import React, { useState } from "react";

import { Checkbox } from "primereact/checkbox";
import { Button, RegularButton } from "../../../../../components/product-inspection/Button";
import BasicInfoOrder from "../../components/order/BasicInfoOrder";
import { useForm } from "react-hook-form";
import SamplingSizeAndAQL from "../../components/order/SamplingSizeAndAQL";
import ProductInfoOrder from "../../components/order/ProductInfoOrder";
import ProductSpesification from "../../components/order/ProductSpesification";
import DefectClassification from "../../components/order/DefectClassification ";
import Inspection from "../../components/order/Inspection";
import IconDownload from "../../../../../components/icons/IconDownload";
import IconUpload from "../../../../../components/icons/IconUpload";
import { IconRepeat } from "../../../../../components/icons/IconRepeat";
import { CustomToolbar } from "../../components/CustomToolbar";
import GeneralInformation from "../../../../dashboard/productInspection/bookNow/components/GeneralInformation/GeneralInformation";
import ProductInformation from "../../../../dashboard/productInspection/bookNow/components/ProductInformation/ProductInformation";
import InspectionDetail from "../../../../dashboard/productInspection/bookNow/components/InspectionDetail/InspectionDetail";
import Payment from "../../../../dashboard/productInspection/bookNow/components/Checkout/Payment";
import Checkout from "../../../../dashboard/productInspection/bookNow/components/Checkout/Checkout";

// function CreateOrderPage() {
//    const tabs = [
//       "Basic Info",
//       "Sampling Size & AQL",
//       "Product Info",
//       "Product Spesification",
//       "Defect Classification",
//       "Inspection",
//    ];
//    const [activeTabs, setActiveTabs] = useState(0);
//    const { control, handleSubmit, watch } = useForm({
//       mode: "onSubmit",
//    });
//    const onSubmit = (data) => {
//       console.log(data);
//    };
//    return (
//       <div className="layout-content">
//          <h4>Inspection Order</h4>
//          <div className="bg-gray-50 p-4 border rounded">
//             <div className="flex gap-2">
//                {tabs.map((value, index) => (
//                   <div
//                      className={`${
//                         activeTabs === index
//                            ? "bg-white text-blue-1 border-2"
//                            : "bg-blue-1 text-white hover:bg-blue-600"
//                      } cursor-pointer p-2 rounded `}
//                      key={index}
//                      onClick={() => setActiveTabs(index)}
//                   >
//                      {value}
//                   </div>
//                ))}
//             </div>
//             <div className="my-4" />

//             <form onSubmit={handleSubmit(onSubmit)}>
//                {activeTabs === 0 && <BasicInfoOrder control={control} />}
//                {activeTabs === 1 && <SamplingSizeAndAQL control={control} />}
//                {activeTabs === 2 && <ProductInfoOrder control={control} />}
//                {activeTabs === 3 && <ProductSpesification control={control} />}
//                {activeTabs === 4 && <DefectClassification control={control} />}
//                {activeTabs === 5 && <Inspection control={control} />}
//             </form>
//          </div>
//          <div className="flex flex-row-reverse mt-4">
//             <RegularButton title="Next" />
//          </div>
//       </div>
//    );
// }

// export default CreateOrderPage;

const steps = [
    { label: 'General Information', value: 'general_information' },
    { label: 'Product Information', value: 'product_information' },
    { label: 'Inspection Details ', value: 'inspection_detail' },
    { label: 'Payment', value: 'payment' },
]

function CreateOrderPage() {
    const [step, setStep] = useState('general_information')
    const { control, register, getValues } = useForm()
    return (
        <div className="layout-content">
            <div className="flex justify-between my-4 items-center">
                <h4 className="text-xl font-bold">Amazon FBA Inspection (FBAI)</h4>
                <div className="ml-auto flex gap-2 h-16">
                    {
                        step !== 'general_information' ?
                        <RegularButton
                            title={
                                <div className="flex items-center justify-center">
                                    <IconRepeat />
                                    <div className="ml-2">Back</div>
                                </div>
                            }
                            onClick={() => setStep((prev) => {
                                const index = steps.findIndex((step) => step.value === prev)
                                return steps[index - 1].value
                            }
                            )}
                            className="!border-blue-2 border-1 hover:!bg-blue-2 hover:!text-white-1 !text-blue-2 bg-white"
                        /> : null
                    }
                </div>
            </div>
            <div>
                <CustomToolbar
                    name="step"
                    options={steps}
                    optionActive={step}
                    onChange={({ name, value }) => setStep(value)}
                    containerClassName={`flex gap-1 w-full`}
                    buttonClassName={`flex-1 bg-[#E8E8E8] text-[#3E3E3E] py-3 rounded-md`}
                    activeButtonClassName={`!bg-[#2854F6] !text-white-1`}
                />
            </div>
            <div className="mt-4">
                {
                    step === 'general_information' && (
                        <GeneralInformation
                            control={control}
                            register={register}
                            getValues={getValues}
                        />
                    )
                }

                {
                    step === 'product_information' && (
                        <ProductInformation
                            control={control}
                            register={register}
                            getValues={getValues}
                        />
                    )
                }

                {
                    step === 'inspection_detail' && (
                        <InspectionDetail
                            control={control}
                            register={register}
                            getValues={getValues}
                        />
                    )
                }

                {
                    step === 'payment' && (
                        <div className="flex flex-col">
                            <Checkout
                                control={control}
                                register={register}
                                getValues={getValues}
                            />
                        </div>
                    )
                }
            </div>
            <div className="flex mt-4 justify-end">
                <Button
                    label={step === 'payment' ? "Finish" : "Next"}
                    disabled={step === 'payment'}
                    onClick={() => setStep((prev) => {
                        const index = steps.findIndex((step) => step.value === prev)
                        return steps[index + 1].value
                    }
                    )}
                    className={"bg-blue-2"}
                />
            </div>
        </div>
    )
}

export default CreateOrderPage