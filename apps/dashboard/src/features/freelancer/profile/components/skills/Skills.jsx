import React from "react";
import ProductInspection from "./ProductInspection";
import FactoryAudit from "./FactoryAudit";

function Skills({ control, setValue, watch }) {
   return (
      <>
         <ProductInspection watch={watch} setValue={setValue} control={control} />
         <FactoryAudit control={control} />
      </>
   );
}

export default Skills;