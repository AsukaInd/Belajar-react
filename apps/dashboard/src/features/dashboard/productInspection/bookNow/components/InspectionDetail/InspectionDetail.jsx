import React from "react";
import AccepableQualityLimit from "./AccepableQualityLimit";
import SamplingSize from "./SamplingSize";

function InspectionDetail({ control }) {
   return (
      <>
         <SamplingSize control={control} />
         <AccepableQualityLimit control={control} />
      </>
   );
}

export default InspectionDetail;
