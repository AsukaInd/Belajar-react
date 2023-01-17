import React from "react";
import GalleryField from "./GalleryField";


function Gallery({ watch, setValue, register }) {
   return (
      <>
         <GalleryField watch={watch} setValue={setValue} register={register} />
      </>
   );
}

export default Gallery;