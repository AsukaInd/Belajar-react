import { IconImagePlus } from "~/components/icons/IconImagePlus";
import { FilePreview } from "~/components/FilePreview";
import { Button } from "primereact/button";
import React, { useEffect, useState, useRef } from "react";
import { sliceText } from '~/utils/sliceText'
import { classNames } from "primereact/utils";

export function Dropzone({
   file,
   setValue,
   register,
   valueKey = "profile_image",
   isEdit,
   multiple,
   className,
   previewImageClassName,
   onlyUploadIcon,
   isRequired = true
}) {
   const [ref, setRef] = useState(null);
   const imageInputRef = useRef(null)

   function onDragover(event) {
      event.preventDefault();
   }

   function onDrop(event) {
      event.preventDefault();
      setValue(valueKey, event.dataTransfer.files[0]);
   }

   useEffect(() => {
      ref?.addEventListener("dragover", onDragover);
      ref?.addEventListener("drop", onDrop);

      return () => {
         ref?.removeEventListener("dragover", onDragover);
         ref?.removeEventListener("drop", onDrop);
      };
   }, [ref]);

   return (
      <div
         className={classNames("dropzone cursor-pointer hover:shadow-lg transition-shadow", className)}
         ref={setRef}
         onClick={(event) => {
            imageInputRef.current?.click()
         }}
      >

         {
            multiple
               ? (
                  <>
                     {file?.length > 0 &&
                        <Preview
                           isEdit={isEdit}
                           file={file}
                           setValue={setValue}
                           valueKey={valueKey}
                           previewImageClassName={previewImageClassName}
                        />
                     }
                     <div className="mt-4">
                        <Upload
                           valueKey={valueKey}
                           multiple={multiple}
                           file={file}
                           register={register}
                           setValue={setValue}
                           isRequired={isRequired}
                           imageInputRef={imageInputRef}
                           onlyUploadIcon={onlyUploadIcon}
                        />
                     </div>
                  </>
               )
               : !file
                  ? <Upload
                     valueKey={valueKey}
                     multiple={multiple}
                     file={file}
                     register={register}
                     setValue={setValue}
                     isRequired={isRequired}
                     imageInputRef={imageInputRef}
                     onlyUploadIcon={onlyUploadIcon}
                  />
                  : <Preview
                     isEdit={isEdit}
                     file={file}
                     setValue={setValue}
                     valueKey={valueKey}
                     previewImageClassName={previewImageClassName}
                  />
         }
      </div>
   );
}

function Upload({ multiple, file, register, setValue, valueKey, isRequired, imageInputRef, onlyUploadIcon }) {
   return (
      <div>
         {
            !multiple || !file || file?.length === 0 ? (
               <IconImagePlus
                  className="mb-3 mx-auto"
                  style={{
                     height: "56px",
                     width: "56px",
                     color: "var(--gray-500)",
                  }}
               />
            ) : null
         }
         <div>
            <div className="font-bold text-xl">
               {!onlyUploadIcon && 'Drop your image here or'}{" "}
               <div className="text-primary inline cursor-pointer">
                  <label
                     ref={imageInputRef}
                     className="text-center cursor-pointer hover:underline"
                     htmlFor={`upload-${valueKey}`}
                     onClick={(event) => {
                        event.stopPropagation()
                     }}
                  >
                     {!onlyUploadIcon && 'browse'}
                  </label>
                  <input
                     style={{ display: "none" }}
                     type="file"
                     accept="image/*"
                     id={`upload-${valueKey}`}
                     {...register(valueKey)}
                     onChange={(event) => {
                        setValue(valueKey, event.target.files[0])
                     }}
                  />
               </div>
               {
                  isRequired && !onlyUploadIcon ? <span className="required-field">*</span> : null
               }
            </div>
            {!onlyUploadIcon && (
               <p className="text-sm">Minimum size 512 x 512 and size 100kb</p>
            )}
         </div>
      </div>
   )
}

function Preview({ isEdit, file, setValue, valueKey, previewImageClassName }) {
   return (
      <div className="text-left">
         <span className="text-xl font-bold">
            {isEdit ? "Change your" : "Uploading your"}{" "}
            <span className="text-primary">image</span>
         </span>
         {Array.isArray(file) && file.length > 0 ? (
            file.map((img, index) => (
               <PreviewImage
                  key={index}
                  file={img}
                  setValue={setValue}
                  valueKey={valueKey}
                  index={index}
                  previewImageClassName={previewImageClassName}
               />
            ))
         ) : (
            <PreviewImage file={file} setValue={setValue} valueKey={valueKey} previewImageClassName={previewImageClassName} />
         )}
      </div>
   )
}

function PreviewImage({ file, setValue, valueKey, index, previewImageClassName }) {
   const fileSplit = typeof file === 'string' ? file?.split('/') : []

   function sliceFileName(name) {
      return sliceText({ text: name, limit: 32 })
   }

   return (
      <div className="dropzone-preview">
         {file instanceof File ? (
            <FilePreview className={previewImageClassName} files={file} />
         ) : (
            <div className="flex align-items-center">
               <img className={previewImageClassName} src={file} />
            </div>
         )}

         <div className="flex items-center flex-wrap justify-between mt-3">
            {
               file instanceof File
                  ? (
                     <span>{sliceFileName(file.name)}</span>
                  )
                  : (
                     <span>
                        {fileSplit.length > 0
                           ? sliceFileName(fileSplit[fileSplit?.length - 1])
                           : ""
                        }
                     </span>
                  )
            }
            <Button
               className="w-min p-button-outlined"
               label="Delete"
               onClick={(event) => {
                  event.stopPropagation()
                  setValue(valueKey, "", index)
               }}
               style={{ color: "var(--accent-text-color)" }}
            />
         </div>

      </div>
   );
}

export function useMultipleUpload(image, setValue) {
   const imageRef = useRef([]);

   function onSetValue(key, value, index) {
      if (index != null) {
         const filtered = image.filter((_, idx) => {
            return idx !== index;
         });
         imageRef.current = filtered;
         setValue(key, filtered);
      }

      if (value && index == null) {
         imageRef.current.push(value);
         setValue(key, [...imageRef.current]);
      }
   }

   return { onSetValue };
}