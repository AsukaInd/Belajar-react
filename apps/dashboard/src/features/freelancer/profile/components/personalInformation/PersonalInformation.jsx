import React from "react";
import NameAndContract from "./NameAndContract";
import ResidenceAndBirthday from "./ResidenceAndBirthday";
import IdPhoto from "./IdPhoto";
import Avatar from "./Avatar";

function PersonalInformation({ control, watch, setValue, register }) {
   return (
      <>
         <NameAndContract control={control} />
         <ResidenceAndBirthday control={control} />
         <IdPhoto
            watch={watch}
            setValue={setValue}
            register={register}
         />
         <Avatar
            watch={watch}
            setValue={setValue}
            register={register}
         />
      </>
   );
}

export default PersonalInformation;