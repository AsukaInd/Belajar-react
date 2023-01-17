import React from 'react';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Checkbox } from 'primereact/checkbox';
import { Controller } from 'react-hook-form';
import { Dropdown } from 'primereact/dropdown';
import { Dropzone } from '~/components/Dropzone';
import { IconDelete2 } from "~/components/icons/IconDelete2";
import { IconDelete } from "~/components/icons/IconDelete";
import { AiOutlinePlus } from 'react-icons/ai';

function ChapterQuestion({
  control,
  defectItemOptions,
  defectLevelOptions,
  register,
  setValue,
  watch,
  questionImage,
  addQuestionImage,
  delQuestionImage,
  getValues,
  addQuestion,
  delQuestion,
  questions
}) {

  return (
    <div>
      <div className='flex flex-row font-bold text-base mt-4'>
        Inspection Questions
        <div className='ml-3' onClick={addQuestion}>
          <AiOutlinePlus className="mr-[6px]" size={17} />
        </div>
      </div>
      <div className='flex flex-row'>
        <div>
          <div className='py-4 bg-gray-100 px-2 mt-1 mb-3'>
            <p className='font-bold text-sm'>Sequence</p>
          </div>
          <Controller
            name="questions[0].sequence"
            control={control}
            render={({ field }) => (
              <InputNumber
                type="questions[0].sequence"
                id="questions[0].sequence"
                min={0}
                showButtons
                value={field.value}
                onValueChange={field.onChange}
                decrementButtonClassName="bg-gray-400"
                incrementButtonClassName="bg-gray-400"
              />
            )}
          />
        </div>
        <div>
          <div className='py-4 bg-gray-100 px-4 mt-1 mb-3'>
            <p className='font-bold text-sm'>Question</p>
          </div>
          <Controller
            name="questions[0].question"
            control={control}
            render={({ field }) => (
              <InputText
                type="questions[0].question"
                id="questions[0].question"
                {...field}
                className="ml-4 w-96"
              />
            )}
          />
        </div>
        <div>
          <div className='py-4 bg-gray-100 px-4 mt-1 mb-3'>
            <p className='font-bold text-sm w-24'>Defect Item</p>
          </div>
          <Controller
            name="questions[0].defectItem"
            control={control}
            render={({ field }) => (
              <Dropdown
                id="questions[0].defectItem"
                options={defectItemOptions}
                value={field.value}
                onChange={field.onChange}
                className="ml-4"
              />
            )}
          />
        </div>
        <div>
          <div className='py-4 bg-gray-100 px-4 mt-1 mb-3'>
            <p className='font-bold text-sm w-24'>Defect Level</p>
          </div>
          <Controller
            name="questions[0].defectLevel"
            control={control}
            render={({ field }) => (
              <Dropdown
                id="questions[0].defectLevel"
                options={defectLevelOptions}
                value={field.value}
                onChange={field.onChange}
                className="ml-4"
              />
            )}
          />
        </div>
        {questionImage && questionImage[0].map((item, index) => (
          <div>
            <div className='py-4 bg-gray-100 px-4 mt-1 mb-3'>
              <p className='font-bold text-sm'>Image {index + 1}</p>
            </div>
            <div className='ml-4'>
              {questions && questions?.length > 0 && (
                <div>
                  <Dropzone
                    register={register}
                    file={watch(`questions?[0].imageQ0${index + 1}`)?.length === 0 ? null : watch(`questions?[0].imageQ0${index + 1}`)}
                    setValue={setValue}
                    valueKey={`questions?[0].imageQ0${index + 1}`}
                    onlyUploadIcon
                  />
                  {/* {questionImage[0].length !== 1 && (
                    <div
                      onClick={delQuestionImage(0, index)}
                      className='items-center self-center justify-center flex mt-2'>
                      <IconDelete />
                    </div>
                  )} */}
                </div>
              )}
            </div>
          </div>
        ))}

        <div>
          <div className='py-4 bg-gray-100 px-4 mt-1 mb-3'>
            <p className='font-bold text-sm'>Notes</p>
          </div>
          <Controller
            name="questions[0].notes"
            control={control}
            render={({ field }) => (
              <InputTextarea
                autoResize
                id="questions[0].notes"
                rows={8}
                cols={30}
                {...field}
                className="ml-4 w-[428px]"
              />
            )}
          />
        </div>
        <div>
          <div className='py-4 bg-gray-100 px-4 mt-1 mb-3'>
            <p className='font-bold text-sm'>isChecked?</p>
          </div>
          <Controller
            name="questions[0].isChecked"
            control={control}
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onChange={() => {
                  field.onChange(!field.value);
                }}
                inputId={'questions[0].isChecked'}
                className="ml-4"
              />
            )}
          />
        </div>
        {questions && questions.length > 1 && (
          <div>
            <div className='py-4 bg-gray-100 px-4 mt-1 mb-3'>
              <p className='font-bold text-sm'>Delete?</p>
            </div>
            <div onClick={delQuestion}>
              <IconDelete2 solid className="ml-4" />
            </div>
          </div>
        )}
      </div>
      {questions && questions.map((question, idxQuestion) => (
          <div key={idxQuestion} className="mt-3">
            {idxQuestion != 0 && (
              <div className='flex flex-row'>
                <div>
                  <Controller
                    name={`questions[${idxQuestion}].sequence`}
                    control={control}
                    render={({ field }) => (
                      <InputNumber
                        type={`questions[${idxQuestion}].sequence`}
                        id={`questions[${idxQuestion}].sequence`}
                        min={0}
                        showButtons
                        value={field.value}
                        onValueChange={field.onChange}
                        decrementButtonClassName="bg-gray-400"
                        incrementButtonClassName="bg-gray-400"
                      />
                    )}
                  />
                </div>
                <div>
                  <Controller
                    name={`questions[${idxQuestion}].question`}
                    control={control}
                    render={({ field }) => (
                      <InputText
                        type={`questions[${idxQuestion}].question`}
                        id={`questions[${idxQuestion}].question`}
                        {...field}
                        className="ml-4 w-96"
                      />
                    )}
                  />
                </div>
                <div>
                  <Controller
                    name={`questions[${idxQuestion}].defectItem`}
                    control={control}
                    render={({ field }) => (
                      <Dropdown
                        id={`questions[${idxQuestion}].defectItem`}
                        options={defectItemOptions}
                        value={field.value}
                        onChange={field.onChange}
                        className="ml-4"
                      />
                    )}
                  />
                </div>
                <div>
                  <Controller
                    name={`questions[${idxQuestion}].defectLevel`}
                    control={control}
                    render={({ field }) => (
                      <Dropdown
                        id={`questions[${idxQuestion}].defectLevel`}
                        options={defectLevelOptions}
                        value={field.value}
                        onChange={field.onChange}
                        className="ml-4"
                      />
                    )}
                  />
                </div>
                {questionImage[idxQuestion].map((item, index) => (
                  <div>
                    <div className='ml-4'>
                      {questions?.length > 1 && (
                        <div>
                          <Dropzone
                            register={register}
                            file={watch(`questions?[${idxQuestion}].imageQ1${index + 1}`)?.length === 0 ? null : watch(`questions?[${idxQuestion}].imageQ1${index + 1}`)}
                            setValue={setValue}
                            valueKey={`questions?[${idxQuestion}].imageQ1${index + 1}`}
                            onlyUploadIcon
                          />
                          {/* {questionImage[idxQuestion].length !== 1 && (
                            <div
                              onClick={delQuestionImage(idxQuestion, index)}
                              className='items-center self-center justify-center flex mt-2'>
                              <IconDelete />
                            </div>
                          )} */}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div>
                  <Controller
                    name={`questions[${idxQuestion}].notes`}
                    control={control}
                    render={({ field }) => (
                      <InputTextarea
                        autoResize
                        id={`questions[${idxQuestion}].notes`}
                        rows={8}
                        cols={30}
                        {...field}
                        className="ml-4 w-[428px]"
                      />
                    )}
                  />
                </div>
                <div>
                  <Controller
                    name={`questions[${idxQuestion}].isChecked`}
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value}
                        onChange={() => {
                          field.onChange(!field.value);
                        }}
                        inputId={`questions[${idxQuestion}].isChecked`}
                        className="ml-4"
                      />
                    )}
                  />
                </div>
                <div onClick={delQuestion}>
                  <IconDelete2 solid className="ml-24" />
                </div>
              </div>
            )}
          </div>
        ))
      }
    </div>
  )
}

export default ChapterQuestion