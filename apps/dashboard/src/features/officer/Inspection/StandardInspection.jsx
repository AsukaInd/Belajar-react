import React, { useRef, useState } from "react";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { DropzoneImageInspection } from "./DropzoneImageInspection";
import { useInspectionQuestion } from "../hooks/useInspectionQuestion";
import { Toast } from "primereact/toast";

function StandardInspection() {
   const [checked, setChecked] = useState(false);
   const [category, setCategory] = useState();
   const [item, setItem] = useState();
   const [level, setLevel] = useState();
   const [notes, setNotes] = useState();
   const [previewImage, setPreviewImage] = useState(null);
   const [file, setFile] = useState();
   const toast = useRef(null);
   const {
      control,
      formState: { errors },
      handleSubmit,
      reset,
      register,
      setValue,
      getValues,
   } = useForm({
      defaultValues: {
         image: [
            {
               files: "",
            },
         ],
      },
   });

   const { fields, append, prepend, remove, swap, move, insert } =
      useFieldArray({
         control, // control props comes from useForm (optional: if you are using FormContext)
         name: "image", // unique name for your Field Array
      });

   const myUploader = (e) => {
      console.log(e);
      setPreviewImage(e.files[0].objectURL);
      setFile(e.files[0]);
   };

   const inspection = useInspectionQuestion({
      handleSuccess() {
         // onClose();
         location.href = "/app/officer/inspection";
      },
   });

   function save(newData) {
      console.log(newData);
      inspection.mutate(newData);
   }

   const onSubmit = (data) => {
      console.log(data);

      const formData = new FormData();
      formData.append("attendance", "test");
      formData.append("supplier_id", 10);
      formData.append("defect_item_id", 1);
      formData.append("defect_level_id", 1);
      formData.append("notes", data.notes);
      formData.append("is_checked", 1);
      formData.append("product_inspection_checklist_queston_id", 1);
      formData.append("product_inspection_id", 1);

      for (let i = 0; i < data.category.length; i++) {
         formData.append(`caption_category[${i}]`, data.category[i]);
      }
      for (let i = 0; i < data.caption.length; i++) {
         formData.append(`caption[${i}]`, data.caption[i]);
      }
      for (let i = 0; i < data.image.length; i++) {
         formData.append(`image[${i}]`, data.image[i]);
      }
      for (const pair of formData.entries()) {
         console.log(pair[0] + ", " + pair[1]);
      }
      save(formData);
      console.log(formData);
   };

   return (
      <div>
         <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
            <div className="m-4 rounded bg-white p-4">
               <h6>
                  Is Invoice available and consistent to the IFR of booking?
               </h6>
               <div className="flex justify-between">
                  <label htmlFor="cb1">Checked</label>
                  <Checkbox
                     inputId="cb1"
                     checked={checked}
                     onChange={(e) => setChecked(e.checked)}
                  />
               </div>
            </div>
            <div className="m-4 rounded bg-white p-4">
               <h6>Notes</h6>
               <Controller
                  name="notes"
                  control={control}
                  rules={{ required: "Name is required." }}
                  render={({ field, fieldState }) => (
                     <InputTextarea
                        {...field}
                        rows={5}
                        cols={30}
                        autoResize
                        className="w-full"
                        placeholder="write notes"
                     />
                  )}
               />
            </div>

            <div className="m-4 rounded bg-white p-4">
               <h6>Image</h6>
               {fields.map((item, index) => (
                  <div className="pt-4">
                     {" "}
                     <DropzoneImageInspection
                        register={register}
                        file={getValues(`image.${index}`)}
                        setValue={setValue}
                        valueKey={`image.${index}`}
                        isEdit={false}
                        setFile={e => setFile(e)}
                     />
                     <Controller
                        name={`category.${index}`}
                        control={control}
                        rules={{ required: "Name is required." }}
                        render={({ field, fieldState }) => (
                           <Dropdown
                              options={[
                                 {
                                    label: "Open Seam",
                                    value: 0,
                                 },
                                 {
                                    label: "Untrimmed thread",
                                    value: 1,
                                 },
                                 {
                                    label: "Dirty mark",
                                    value: 2,
                                 },
                              ]}
                              {...field}
                              placeholder="Caption Category"
                              dropdownIcon="fa-solid fa-caret-down"
                              className="w-full mt-4"
                           />
                        )}
                     />
                     <Controller
                        name={`caption.${index}`}
                        control={control}
                        rules={{ required: "Name is required." }}
                        render={({ field, fieldState }) => (
                           <Dropdown
                              options={[
                                 {
                                    label: "Caption 1",
                                    value: 0,
                                 },
                                 {
                                    label: "Caption 2",
                                    value: 1,
                                 },
                              ]}
                              {...field}
                              placeholder="Caption"
                              dropdownIcon="fa-solid fa-caret-down"
                              className="w-full mt-4"
                           />
                        )}
                     />
                     <Button
                        label="Add Another Image"
                        className="w-full mt-4"
                        type="button"
                        onClick={() => append({ pictures: "" })}
                     />
                  </div>
               ))}
            </div>
            <div className="m-4 rounded bg-white p-4">
               <h6>Defect Category</h6>
               <Dropdown
                  options={[
                     {
                        label: "Category 1",
                        value: "category_1",
                     },
                     {
                        label: "Category 2",
                        value: "category_2",
                     },
                     {
                        label: "Category 3",
                        value: "category_3",
                     },
                  ]}
                  onChange={(e) => setCategory(e.value)}
                  value={category}
                  placeholder="Defect Category"
                  dropdownIcon="fa-solid fa-caret-down"
                  className="w-full"
               />
            </div>
            <div className="m-4 rounded bg-white p-4">
               <h6>Defect Item</h6>
               <Dropdown
                  options={[
                     {
                        label: "Open Seam",
                        value: "open_seam",
                     },
                     {
                        label: "Untrimmed thread",
                        value: "untrimmed thread",
                     },
                     {
                        label: "Dirty mark",
                        value: "dirty_mark",
                     },
                  ]}
                  onChange={(e) => setItem(e.value)}
                  value={item}
                  placeholder="Defect Item"
                  dropdownIcon="fa-solid fa-caret-down"
                  className="w-full"
               />
            </div>
            <div className="m-4 rounded bg-white p-4">
               <h6>Defect Level</h6>
               <Dropdown
                  options={[
                     {
                        label: "Critical",
                        value: "critical",
                     },
                     {
                        label: "Major",
                        value: "major",
                     },
                     {
                        label: "Minor",
                        value: "minor",
                     },
                  ]}
                  onChange={(e) => setLevel(e.value)}
                  value={level}
                  placeholder="Defect Level"
                  dropdownIcon="fa-solid fa-caret-down"
                  className="w-full"
               />
            </div>

            <div className="m-4 rounded bg-white p-4">
               <Button label="Submit" className="w-full" type="submit" />
            </div>
         </form>

         <Toast ref={toast} position="top-right" />
      </div>
   );
}

export default StandardInspection;
