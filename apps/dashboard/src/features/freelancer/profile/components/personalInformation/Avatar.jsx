import React from "react";
import { TextField } from "../../../gigs/components/TextField";
import { Dropzone } from "~/components/Dropzone";
import { useForm } from "react-hook-form";
import { Button } from "primereact/button";

function Avatar({ watch, setValue, register }) {

  return (
    <section className="drop-shadow bg-white rounded-lg mt-8 border border-gray-500">
      <div className="flex justify-between bg-white-fa border-white-e9 border-b-2 p-4 rounded-t-lg">
        <h1 className="font-bold text-2xl my-auto">Avatar</h1>
      </div>
      <div className="flex flex-col gap-4 text-gray-600 text-lg p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <Dropzone
            register={register}
            file={watch('photo')}
            setValue={setValue}
            valueKey="photo"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <Button
            type="button"
            // {disableButton}
            // onClick={handleSubmit(onSubmit)}
            // loading={loading}
            label="Delete"
            className="ml-3"
          />
          <Button
            type="button"
            // {disableButton}
            // onClick={handleSubmit(onSubmit)}
            // loading={loading}
            label="Upload"
            className="ml-3"
          />
        </div>
      </div>
    </section>
  );
}

export default Avatar;