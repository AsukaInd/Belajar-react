import React from "react";
import { TextField } from "../../../gigs/components/TextField";
import { DropdownField } from "../../../gigs/components/DropDown";
import { Button } from "primereact/button";

function Language({ control }) {

  return (
    <section className="drop-shadow bg-white rounded-lg mt-8 border border-gray-500">
      <div className="flex justify-between bg-white-fa border-white-e9 border-b-2 p-4 rounded-t-lg">
        <h1 className="font-bold text-2xl my-auto">Language</h1>
      </div>
      <div className="flex flex-col gap-4 text-gray-600 text-lg p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <TextField
            name="languages[0].language"
            control={control}
            type="string"
            label="Add Language"
            placeholder="Input education"
          />
          <DropdownField
            name="languages[0].language_level_id"
            control={control}
            label="Language Level"
            placeholder="Basic"
            options={[{ label: "basic", value: "1" }]}
          />
        </div>
        <div className="flex flex-row gap-4 text-gray-600 text-lg p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <Button type="button" label="Cancel" className="p-button-outlined" />
            <Button
              type="button"
              // onClick={handleSubmit(onSubmit)}
              // loading={loading}
              label="Add Language"
              className="ml-3"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Language;