import { IconImagePlus } from "~/components/icons/IconImagePlus";
import { FilePreview } from "~/components/FilePreview";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { sliceText } from "~/utils/sliceText";

export function DropzoneImageInspection({
   setValue,
   register,
   valueKey = "profile_image",
   isEdit,
   multiple,
   file,
   setFile
}) {
   const [ref, setRef] = useState(null);
   const [file2, setPreview] = useState();
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
      <div className="dropzone" ref={setRef}>
            <Preview
               isEdit={isEdit}
               file={file}
               setValue={setValue}
               valueKey={valueKey}
            />
            <Upload
               valueKey={valueKey}
               multiple={multiple}
               file={file}
               register={register}
               setValue={setValue}
               setFile={setFile}
            />
         
      </div>
   );
}

function Upload({ multiple, file, register, setValue, valueKey, setFile }) {
   return (
      <div className="flex gap-4">
         {!multiple || !file || file?.length === 0 ? (
            <IconImagePlus
               className=""
               style={{
                  height: "56px",
                  width: "56px",
                  color: "var(--gray-500)",
               }}
            />
         ) : null}
         <div className="my-auto text-left">
            <div className="font-bold text-xl">
               <div className=" inline cursor-pointer">
                  <label
                     className="text-center cursor-pointer hover:underline"
                     htmlFor={`upload-${valueKey}`}
                  >
                     Select your image here
                  </label>
                  <input
                     style={{ display: "none" }}
                     type="file"
                     accept="image/*"
                     id={`upload-${valueKey}`}
                     {...register(valueKey)}
                     onChange={(event) => {
                        setValue(valueKey, event.target.files[0]);
                        setFile( event.target.files[0])
                     }}
                  />
               </div>
            </div>
            <p className="text-sm">Minimum size 512 x 512 and size 100kb</p>
         </div>
      </div>
   );
}

function Preview({ isEdit, file, setValue, valueKey }) {
   return (
      <div className="text-left">
         <span className="text-xl font-bold">
            {isEdit ? "Change your" : "Uploading your"}{" "}
            <span className="text-primary">image</span>
         </span>
         <PreviewImage file={file} setValue={setValue} valueKey={valueKey} />
      </div>
   );
}

function PreviewImage({ file, setValue, valueKey, index }) {
   const fileSplit = typeof file === "string" ? file?.split("/") : [];

   return (
      <div className="dropzone-preview">
         <FilePreview files={file} showFileName />
         {/* <Button
            className="w-min p-button-outlined"
            label="Delete"
            onClick={() => setValue(valueKey, "", index)}
            style={{ color: "var(--accent-text-color)" }}
         /> */}
      </div>
   );
}
