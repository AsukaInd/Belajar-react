import React from "react";
import { TextField } from "../../../gigs/components/TextField";
import { Dropzone } from "~/components/Dropzone";
import { useForm } from "react-hook-form";
import { Button } from "primereact/button";

function IdPhoto({ watch, setValue, register }) {

  return (
    <section className="drop-shadow bg-white rounded-lg mt-8 border border-gray-500">
      <div className="flex justify-between bg-white-fa border-white-e9 border-b-2 p-4 rounded-t-lg">
        <h1 className="font-bold text-2xl my-auto">ID Confirmation Photo (IDCP)</h1>
      </div>
      <div className="flex flex-col gap-4 text-gray-600 text-lg p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <Dropzone
            register={register}
            file={watch('id_confirmation_photo')}
            setValue={setValue}
            valueKey="id_confirmation_photo"
          />
          <div className="bg-white shadow dark:bg-gray-800 flex justify">
            <div className="w-full bg-white-fa border-white-e9 px-4 py-3 rounded text-blue-2">
              <p className="font-bold">ID confirmation photo (IDCP) instructions</p>
              <div className="flex flex-col md:flex-row gap-2">
                <i className="pi pi-check" style={{ 'fontSize': '1em' }}></i>
                <p className="font-thint">The ID and the note all have to be clearly visible.</p>
              </div>
              <div className="flex flex-col md:flex-row gap-2">
                <i className="pi pi-check" style={{ 'fontSize': '1em' }}></i>
                <p className="font-thint">Your face, upper body, arms and hands should be visible.</p>
              </div>
              <div className="flex flex-col md:flex-row gap-2">
                <i className="pi pi-check" style={{ 'fontSize': '1em' }}></i>
                <p className="font-thint">Take the photo during the daytime when the lightning is good.</p>
              </div>
              <div className="flex flex-col md:flex-row gap-2">
                <i className="pi pi-check" style={{ 'fontSize': '1em' }}></i>
                <p className="font-thint">Have your frined or family member take the photo.</p>
              </div>
              <div className="flex flex-col md:flex-row gap-2">
                <i className="pi pi-check" style={{ 'fontSize': '1em' }}></i>
                <p className="font-thint">Write the note with your hand.</p>
              </div>
              <div className="flex flex-col md:flex-row gap-2">
                <i className="pi pi-times" style={{ 'fontSize': '1em' }}></i>
                <p className="font-thint">Don't type the note.</p>
              </div>
              <div className="flex flex-col md:flex-row gap-2">
                <i className="pi pi-times" style={{ 'fontSize': '1em' }}></i>
                <p className="font-thint">Do not wear sunglasses or anything that covers your facial features.</p>
              </div>
              <div className="flex flex-col md:flex-row gap-2">
                <i className="pi pi-times" style={{ 'fontSize': '1em' }}></i>
                <p className="font-thint">Do not cover parts of the ID, message, or your face.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <Button
            disabled={true}
            // {disableButton}
            // onClick={handleSubmit(onSubmit)}
            // loading={loading}
            label="Delete"
            className="ml-3"
          />
        </div>
      </div>
    </section>
  );
}

export default IdPhoto;