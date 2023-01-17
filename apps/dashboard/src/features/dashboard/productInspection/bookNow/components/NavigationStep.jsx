import React from "react";
import { RegularButton } from "../../../../../components/product-inspection/Button";

function NavigationStep({
   activeStep,
   handleNext,
   handlePrevious,
   handleFinish,
   total,
}) {
   return (
      <div className="flex flex-row-reverse gap-4 pt-4">
         {activeStep === total - 1 && (
            <button
               type="submit"
               className={`flex gap-2 bg-blue-2 border-0 text-white rounded px-4 py-3 font-bold cursor-pointer`}
            >
               Finish
            </button>
         )}
         {activeStep !== total - 1 && (
            <RegularButton
               className="!bg-blue-2"
               title="Next"
               onClick={() => handleNext(activeStep + 1)}
            />
         )}
         {activeStep !== 0 && (
            <RegularButton
               className="!bg-blue-2"
               title="Previous"
               onClick={() => handlePrevious(activeStep - 1)}
            />
         )}
      </div>
   );
}

export default NavigationStep;
