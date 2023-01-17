import React, { useState } from "react";
import { TextField } from "../../../gigs/components/TextField";
import { DropdownField } from "../../../gigs/components/DropDown";
import { Calendar } from 'primereact/calendar';
import { TextArea } from "../../../gigs/components/TextArea";
import { Button } from "primereact/button";
import { DateField } from "../DateField";
import { RadioButton } from "../RadioButton";
import { useCountries } from "../../../hooks/useCountries";
import { transformToDropdownOptions } from "../../../../../utils/transformToDropdownOptions";
import { useCompanySize } from "../../../hooks/useCompanySize";

function WorkExperience({ control }) {
  const countriesQuery = useCountries()
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

  const companySizeQuery = useCompanySize()

  return (
    <section className="drop-shadow bg-white rounded-lg mt-8 border border-gray-500">
      <div className="flex justify-between bg-white-fa border-white-e9 border-b-2 p-4 rounded-t-lg">
        <h1 className="font-bold text-2xl my-auto">Employment and Work experience</h1>
      </div>
      <div className="flex flex-col gap-4 text-gray-600 text-lg p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <TextField
            name="work_experience[0].organization"
            control={control}
            type="string"
            label="Your Organization"
            placeholder="Input organization"
          />
          <TextField
            name="work_experience[0].title_or_position"
            control={control}
            label="Your Title/Position"
            placeholder="Input title/position"
          />
          <DropdownField
            name="work_experience[0].industry_type_id"
            control={control}
            label="Company Industry Type"
            placeholder="Agriculture & Products"
            options={[{ label: "1", value: "1" }]}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <DropdownField
            name="work_experience[0].company_size_id"
            control={control}
            label="Company Size"
            placeholder="1-9 employees"
            options={transformToDropdownOptions(
              companySizeQuery?.data?.data,
              {
                label: 'size',
                value: 'id'
              }
            )}
          />
          <DropdownField
            name="work_experience[0].country_id"
            control={control}
            label="Country"
            placeholder="under 50"
            options={transformToDropdownOptions(
              countriesQuery?.data?.data,
              {
                label: 'name',
                value: 'id'
              }
            )}
          />
          <DropdownField
            name="work_experience[0].city_id"
            control={control}
            label="City"
            placeholder="under 50"
            options={[{ label: "1", value: "1" }]}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex gap-4 text-gray-600 gap-4">
            <div className="p-4">
              <p className="mt-2 text-gray-600 font-bold">
                Is this your current company ?
              </p>
              <div className="flex flex-row">
                <RadioButton
                  control={control}
                  label="Yes"
                  name="work_experience[0].current_company"
                />
                <RadioButton
                  control={control}
                  label="No"
                  name="work_experience[0].current_company"
                />
              </div>
            </div>
          </div>
          <div className="flex gap-4 text-gray-600 gap-4">
            <div className="p-4">
              <p className="mt-2 text-gray-600 font-bold">
                Is this a third party company ?
              </p>
              <div className="flex flex-row">
                <RadioButton
                  control={control}
                  label="Yes"
                  name="work_experience[0].third_party_company"
                />
                <RadioButton
                  control={control}
                  label="No"
                  name="work_experience[0].third_party_company"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between bg-white-fa border-white-e9 border-b-2 p-4 rounded-t-lg">
        <h1 className="font-bold text-2xl my-auto">Duration</h1>
      </div>
      <div className="flex flex-row gap-4 text-gray-600 text-lg p-4">
        <DateField
          control={control}
          placeholder="Input date"
          label="From"
          name="work_experience[0].from"
        />
        <DateField
          control={control}
          placeholder="Input date"
          label="To"
          name="work_experience[0].to"
        />
      </div>

      <div className="flex flex-col gap-4 text-gray-600 text-lg p-4">
        <div className="w-full flex flex-col">
          <label className="font-bold text-black-1">
            Describe your job
          </label>
          <TextArea
            name="work_experience[0].description_job"
            control={control}
            type="string"
            placeholder="input describe the details of your job"
            rows={7}
          />
        </div>
      </div>

      <div className="flex flex-row gap-4 text-gray-600 text-lg p-4">
        <div className="w-full flex flex-col">
          <label className="font-bold text-black-1">
            Clients your serve
          </label>
          <TextArea
            name="work_experience[0].client"
            control={control}
            type="string"
            placeholder="Input clients your serve"
            rows={7}
          />
        </div>
        <div className="w-full flex flex-col">
          <label className="font-bold text-black-1">
            Standards/Protocols you use
          </label>
          <TextArea
            name="work_experience[0].standart_protocols"
            control={control}
            type="string"
            placeholder="input standards or protocols you use"
            rows={7}
          />
        </div>
      </div>

      <div className="flex flex-row gap-4 text-gray-600 text-lg p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <Button type="button" label="Cancel" className="p-button-outlined" />
          <Button
            type="button"
            // onClick={handleSubmit(onSubmit)}
            // loading={loading}
            label="Add Employment"
            className="ml-3"
          />
        </div>
      </div>

    </section>
  );
}

export default WorkExperience;