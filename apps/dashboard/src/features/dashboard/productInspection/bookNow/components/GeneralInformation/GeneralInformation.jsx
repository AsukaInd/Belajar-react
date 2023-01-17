import React from "react";
import FactoryContact from "./FactoryContact";
import FactoryInformation from "./FactoryInformation";
import InspectionInformation from "./InspectionInformation";
import SupplierContact from "./SupplierContact";
import SupplierInformation from "./SupplierInformation";

function GeneralInformation({ control, register,setValue }) {
   return (
      <>
         <SupplierInformation control={control} setValue={setValue} />
         <SupplierContact control={control} setValue={setValue}/>
         <FactoryInformation control={control} setValue={setValue} />
         <FactoryContact control={control} setValue={setValue}/>
         <InspectionInformation control={control} register={register} />
      </>
   );
}

export default GeneralInformation;
