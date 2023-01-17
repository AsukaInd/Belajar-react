import React from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { RegularButton } from '~/components/product-inspection/Button';
import { InputNumber } from 'primereact/inputnumber';
import { Controller, get, useForm } from 'react-hook-form';
import { Dropzone } from '~/components/Dropzone';
import ChapterQuestion from './ChapterQuestion';
import { IconDelete } from "~/components/icons/IconDelete";
import apiDefectItem from '../../api/catalog/apiDefectItem';
import apiDefectLevel from '../../api/catalog/apiDefectLevel';
import apiProductInspectionOrder from '../../api/inspection/apiInspectionOrder';
import TextInput from '../../../../../components/product-inspection/TextInput';
import { Dropdown } from '../../../../../components/product-inspection/DropDown';
import { TextArea } from '../../../../../components/product-inspection/TextArea';

const inspectorTypeOptions = [
    {
        label: 'Normal',
        value: 'normal'
    },
    {
        label: 'Quantity Breakdown',
        value: 'quantity-breakdown'
    },
    {
        label: 'Weight Chart',
        value: 'weight-chart'
    },
    {
        label: 'Size Measurement',
        value: 'size-measurement'
    },
    {
        label: 'Workmanship',
        value: 'workmanship'
    }
];

function ChapterAdd2() {
    const [imageInstructions, setImageInstructions] = React.useState([
        { imageInstruction1: null }
    ]);
    const [image, setImage] = React.useState([
        { image1: null }
    ]);
    const [questionImage, setQuestionImage] = React.useState([
        [{ imageQ01: null }, { imageQ02: null }, { imageQ03: null }]
    ]);
    const [defectItemOptions, setDefectItemOptions] = React.useState([]);
    const [defectLevelOptions, setDefectLevelOptions] = React.useState([]);
    const [questions, setQuestions] = React.useState([
        {
            sequence: 0,
            question: '',
            defectItem: '',
            defectLevel: '',
            notes: '',
            isChecked: false,
            ...Object.assign({}, ...questionImage[0])
        }
    ]);
    const [inspectionOrders, setInspectionOrders] = React.useState([]);
    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
        register,
        setValue,
        getValues
    } = useForm({
        defaultValues: {
            inspection: "",
            name: "",
            type: 'normal',
            instruction: "",
            sequence: 0,
            sampleSize: 0,
            questionTemplate: "",
            defectItem: "",
            defectLevel: '',
            notes: '',
            ...Object.assign({}, ...imageInstructions),
            ...Object.assign({}, ...image),
            questions: questions
        },
    });

    React.useEffect(() => {
        getDefectItems();
        getDefectLevels();
        getInspectionOrder();
    }, []);

    const transformOptionsData = rawData => {
        let transformedData = rawData.map(item => ({
            label: item.name,
            value: item.name
        }));
        transformedData = [{
            label: '-------',
            value: ''
        }, ...transformedData];

        return transformedData;
    }

    const getDefectItems = async () => {
        const res = await apiDefectItem.get();
        const transformedData = transformOptionsData(res.data.data.data);
        setDefectItemOptions(transformedData);
    };

    const getDefectLevels = async () => {
        const res = await apiDefectLevel.get();
        const transformedData = transformOptionsData(res.data.data.data);
        setDefectLevelOptions(transformedData);
    };

    const getInspectionOrder = async () => {
        const res = await apiProductInspectionOrder.get();
        let transformedData = res.data.data.data.map(item => ({
            label: item.id,
            value: item.id
        }));
        transformedData = [{
            label: '-------',
            value: ''
        }, ...transformedData];

        setInspectionOrders(transformedData);
    };

    const onSubmit = () => { };

    const addQuestion = () => {
        let tempArrObj = [];
        for (let i = 0; i < 3; i++) {
            let tempImgObj = {};
            tempImgObj[`imageQ${questions.length}${i + 1}`] = null;
            tempArrObj.push(tempImgObj);
        }

        let tempQuestionImages = [...questionImage, tempArrObj];

        let tempQuestions = [...questions, {
            sequence: 0,
            question: '',
            defectItem: '',
            defectLevel: '',
            notes: '',
            isChecked: false,
            ...Object.assign({}, ...tempArrObj)
        }];
        console.log(tempQuestions, 'line 150')
        setQuestionImage(tempQuestionImages);
        setQuestions(tempQuestions);
    };

    const delQuestion = idxQuestion => {
        let tempQuestions = [...questions];
        tempQuestions.splice(idxQuestion, 1);
        setQuestions(tempQuestions);
    };

    const addImageInstruction = () => {
        let newObj = {};
        newObj[`imageInstruction${imageInstructions.length}`] = null;
        const newImageInstructions = [...imageInstructions, newObj];
        setImageInstructions(newImageInstructions);
    };

    const delImageInstruction = index => () => {
        let newImageInstructions = [...imageInstructions];
        newImageInstructions.splice(index, 1);
        setImageInstructions(newImageInstructions);
    };

    const addImage = () => {
        let newObj = {};
        newObj[`image${image.length}`] = null;
        const newImages = [...image, newObj];
        setImage(newImages);
    };

    const delImage = index => () => {
        let newImages = [...image];
        newImages.splice(index, 1);
        setImage(newImages);
    };

    const addQuestionImage = index => () => {
        let questionImages = questionImage[index];
        let newObj = {};
        newObj[`imageQ${index}${questionImages.length}`] = null;
        newObj[`imageQ${index}${questionImages.length + 1}`] = null;
        newObj[`imageQ${index}${questionImages.length + 2}`] = null;
        questionImages.push(newObj);
        let newQuestionImage = [...questionImage];
        newQuestionImage.splice(index, 1, questionImages);
        setQuestionImage(newQuestionImage);
    };

    const delQuestionImage = (indexQuestion, indexImg) => () => {
        let questionImages = questionImage[indexQuestion];
        questionImages.splice(indexImg, 1);
        let newQuestionImage = [...questionImage];
        newQuestionImage.splice(indexQuestion, 1, questionImages);
        setQuestionImage(newQuestionImage);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                {/* <div className='flex flex-row border-solid border-0 border-b border-gray-200 pb-4'>
                    <div className='w-48 my-auto'>
                        <p className='font-bold'>Inspection :</p>
                    </div>
                    <Controller
                        name="inspection"
                        control={control}
                        render={({ field }) => (
                            <Dropdown
                                id="inspection"
                                options={inspectionOrders}
                                value={field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />
                </div> */}
                <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                        <TextInput
                            label="Name"
                            id="name"
                            isRequired
                            placeholder="Input Name"
                            {...field}
                        />
                    )}
                />
                <Controller
                    name="type"
                    control={control}
                    render={({ field }) => (
                        <Dropdown
                            label="Type"
                            isRequired
                            id="type"
                            options={inspectorTypeOptions}
                            value={field.value}
                            onChange={field.onChange}
                        />
                    )}
                />
                <TextArea
                    label="Instruction"
                    isRequired
                    autoResize
                    name="instruction"
                    control={control}
                    id="instruction"
                    rows={8}
                    cols={30}
                />
                <div className='flex flex-row justify-end mt-4'>
                    <RegularButton
                        title={'Add Image Instruction'}
                        onClick={addImageInstruction}
                        className="!bg-[#2854F6] hover:!bg-[#2854F6] mr-2"
                    />
                </div>
                {imageInstructions.map((item, index) => (
                    <div>
                        <div className='flex flex-row items-center mb-2'>
                            <p className='font-bold'>Instruction Image {index + 1}</p>
                            {imageInstructions.length !== 1 && (
                                <div className='my-auto ml-4' onClick={delImageInstruction(index)}>
                                    <IconDelete className="text-red-500" />
                                </div>
                            )}
                        </div>
                        <Dropzone
                            register={register}
                            file={watch(`imageInstruction${index + 1}`)?.length === 0 ? null : watch(`imageInstruction${index + 1}`)}
                            setValue={setValue}
                            valueKey={`imageInstruction${index + 1}`}
                            className="mt-2 border-2 border-dashed"
                        />
                    </div>
                ))}
                <Controller
                    name="sequence"
                    control={control}
                    render={({ field }) => (
                        <TextInput
                            label="Sequence"
                            isRequired
                            type="number"
                            id="sequence"
                            min={0}
                            showButtons
                            value={field.value}
                            onValueChange={field.onChange}
                            decrementButtonClassName="bg-gray-400"
                            incrementButtonClassName="bg-gray-400"
                        />
                    )}
                />
            </form>
        </>
    )
}

export default ChapterAdd2;