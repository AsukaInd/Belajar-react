import React, { useState } from "react";
import { TextField } from "../../../gigs/components/TextField";
import { Calendar } from 'primereact/calendar';
import { Button } from "primereact/button";
import { DateField } from "../DateField";
import { Dropzone } from "~/components/Dropzone";

function Education({ control, register, setValue, watch }) {
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = prevMonth === 11 ? year - 1 : year;
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = nextMonth === 0 ? year + 1 : year;
  const [date, setDate] = useState(null);

  const minDate = new Date();

  minDate.setMonth(prevMonth);
  minDate.setFullYear(prevYear);

  const maxDate = new Date();

  maxDate.setMonth(nextMonth);
  maxDate.setFullYear(nextYear);

  const invalidDates = [today];


  return (
    <section className="drop-shadow bg-white rounded-lg mt-8 border border-gray-500">
      <div className="flex justify-between bg-white-fa border-white-e9 border-b-2 p-4 rounded-t-lg">
        <h1 className="font-bold text-2xl my-auto">Education</h1>
      </div>
      <div className="flex flex-col gap-4 text-gray-600 text-lg p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <TextField
            name="educations[0].major"
            control={control}
            type="string"
            label="Major"
            placeholder="Input education"
          />
          <TextField
            name="educations[0].university"
            control={control}
            label="College/University"
            placeholder="Input college or university"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <DateField
            control={control}
            placeholder="Input date"
            label="From"
            name="educations[0].from"
          />
          <DateField
            control={control}
            placeholder="Input date"
            label="From"
            name="educations[0].to"
          />
        </div>
        <div className="font-bold text-black-1">Certificate education</div>
        <Dropzone
          register={register}
          file={watch('educations[0].certificate_education')}
          setValue={setValue}
          valueKey="educations[0].certificate_education"
        />
        <div className="flex flex-row gap-4 text-gray-600 text-lg p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <Button type="button" label="Cancel" className="p-button-outlined" />
            <Button
              type="button"
              // onClick={handleSubmit(onSubmit)}
              // loading={loading}
              label="Add Education"
              className="ml-3"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Education;