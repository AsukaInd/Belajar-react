import { Button } from "primereact/button";
import React from "react";

export function FilePreview({
   files,
   removeFile,
   className,
   ...props
}) {
   function getImage(file) {
      return file ? URL.createObjectURL(file) : null;
   }

   function getFileName(file) {
      return file ? file.name : null;
   }

   function isImage(file) {
      return file?.type?.includes("image");
   }

   return Array.isArray(files)
      ? files?.length > 0 &&
      files?.map((file, index) => {
         return (
            <div key={index}>
               {isImage(file) ? (
                  <img className={className} src={getImage(file)} />
               ) : (
                  <span>{getFileName(file)}</span>
               )}
               <br />
               <Button onClick={() => removeFile(file)} label="remove" />
            </div>
         );
      })
      : files && (
         <>
            {isImage(files) ? (
               <div>
                  <img className={className} src={getImage(files)} {...props} />
               </div>
            ) : (
               <span>{getFileName(files)}</span>
            )}
         </>
      );
}
