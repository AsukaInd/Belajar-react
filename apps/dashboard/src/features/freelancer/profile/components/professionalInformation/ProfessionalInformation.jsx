import React from "react";
import WorkExperience from "./WorkExperience";
import Education from "./Education";
import Language from "./Language";

function ProfessionalInformation({ control, register, watch, setValue }) {
   return (
      <>
         <WorkExperience control={control} />
         <Education control={control} register={register} watch={watch} setValue={setValue} />
         <Language control={control} />
      </>
   );
}

export default ProfessionalInformation;