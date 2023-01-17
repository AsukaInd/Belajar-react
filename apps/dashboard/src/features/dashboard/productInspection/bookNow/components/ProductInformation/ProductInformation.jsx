import React from "react";
import ApprovalSamples from "./ApprovalSamples";
import DefectClassification from "./DefectClassification";
import ProductInspection from "./ProductInspection";
import ProductionSamples from "./ProductionSamples";
import ProductSpesification from "./ProductSpesification";
import QuantitySize from "./QuantitySize";
import SizeMeasurement from "./SizeMeasurement";
import WeightChart from "./WeightChart";

function ProductInformation({ control, register, getValues }) {
   return (
      <>
         <ProductInspection control={control} getValues={getValues}/>
         <SizeMeasurement control={control} register={register} />
         <WeightChart control={control} register={register} />
         <QuantitySize control={control} register={register} />
         <ProductSpesification control={control} />
         <DefectClassification control={control} />
         <ApprovalSamples register={register} />
         <ProductionSamples register={register} />
      </>
   );
}

export default ProductInformation;
