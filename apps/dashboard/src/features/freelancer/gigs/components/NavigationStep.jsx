import React from "react";
import { RegularButton } from "../../../../components/product-inspection/Button";

function NavigationStep({
   activeStep,
   handleNext,
   handlePrevious,
   handleFinish,
   isLoading
}) {
   return (
      <div className="flex flex-row-reverse gap-4 pt-4">
         {activeStep === 3 && (
            <button
               disabled={isLoading}
               type="submit"
               className={`flex gap-2 bg-blue-500 hover:bg-blue-700 text-white rounded px-4 py-3 font-bold cursor-pointer`}
            >
               {isLoading ? 'loading...' : 'Finish'}
            </button>
         )}
         {activeStep !== 3 && (
            <RegularButton
               title="Next"
               onClick={() => handleNext(activeStep + 1)}
            />
         )}
         {activeStep !== 0 && (
            <RegularButton
               title="Previous"
               onClick={() => handlePrevious(activeStep - 1)}
            />
         )}
      </div>
   );
}

export default NavigationStep;
