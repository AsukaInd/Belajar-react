import React, { useState } from "react";
import { useForm } from "react-hook-form";

/* Component */
import { Button, RegularButton } from "../../../../../components/product-inspection/Button";
import { IconRepeat } from "../../../../../components/icons/IconRepeat";
import { CustomToolbar } from "../../components/CustomToolbar";

/* Pages */
import BasicInfo from "../../components/checklistInspection/BasicInfo";
import Chapter from "../../components/checklistInspection/Chapter";
import Weight from "../../components/checklistInspection/Weight";
import Size from "../../components/checklistInspection/Size";
import Barcode from "../../components/checklistInspection/Barcode";
import HumiTemp from "../../components/checklistInspection/HumiTemp";
import Summary from "../../components/checklistInspection/Summary";
import Overall from "../../components/checklistInspection/Overall";
import Quantity from "../../components/checklistInspection/Quantity";
import WorkmanShip from "../../components/checklistInspection/WorkmanShip";
import Carboard from "../../components/checklistInspection/Carboard";

const steps = [
    { label: 'Basic Info', value: 'basic_info' },
    { label: 'Chapter', value: 'chapter' },
    { label: 'Quantity', value: 'quantity' },
    { label: 'Weight', value: 'weight' },
    { label: 'Size', value: 'size' },
    { label: 'Barcode', value: 'barcode' },
    { label: 'Humi/Temp', value: 'humi_temp' },
    { label: 'Carboard', value: 'carboard' },
    { label: 'Workmanship', value: 'workmanship' },
    { label: 'Summary', value: 'summary' },
    { label: 'Overall', value: 'overall' },

]

function InspectionDetail2() {
    const [step, setStep] = useState('basic_info')
    const { control, register, getValues } = useForm()
    return (
        <div className="layout-content">
            <div className="flex justify-between my-4 items-center">
                <div>
                    <h4 className="text-xl font-bold">Checklist Question</h4>
                    <p>23-000002(2023-01-18) Supplier company name. City, Country</p>
                </div>
                <div className="ml-auto flex gap-2 h-16">
                    {
                        step !== 'basic_info' ?
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
                    containerClassName='flex gap-1 w-full overflow-auto py-2'
                    buttonClassName={`flex-1 bg-[#E8E8E8] text-[#3E3E3E] py-3 min-w-[150px] rounded-md`}
                    activeButtonClassName={`!bg-[#2854F6] !text-white-1`}
                />
            </div>
                {(() => {
                    switch (step) {
                        case 'basic_info':
                            return <BasicInfo />
                        case 'chapter':
                            return <Chapter />
                        case 'quantity':
                            return <Quantity />
                        case 'weight':
                            return <Weight />
                        case 'size':
                            return <Size />
                        case 'barcode':
                            return <Barcode />
                        case 'humi_temp':
                            return <HumiTemp />
                        case 'carboard':
                            return <Carboard />
                        case 'workmanship':
                            return <WorkmanShip />
                        case 'summary':
                            return <Summary />
                        default:
                            return <Overall />
                    }
                })()} {/* self invoke function */}
            <div className="flex mt-4 justify-end">
                <Button
                    label={step === 'overall' ? "Finish" : "Next"}
                    disabled={step === 'overall'}
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

export default InspectionDetail2