export function Stepper({label, activeStep, setActiveStep}) {
  return (
      <div className="p-5">
      <div className="px-auto">
         {/* start */}
         <div className="flex justify-around items-center">
            {/* item */}
            {label.map((value, index) => (
               <div className="w-full flex items-center" key={index}>
                  <div
                     className={`relative flex flex-col items-center`}
                  >
                     <div
                        className={` ${
                           activeStep + 1 > index &&
                           "text-blue-500 border-blue-2 font-bold"
                        } 
                        ${
                           activeStep > index &&
                           "text-white bg-blue-2"
                        }
                        ${
                           activeStep < index &&
                           "text-gray-400 border-gray-300"
                        } rounded-full transition duration-500 ease-in-out w-14 h-14  py-3 border-2  flex items-center justify-center cursor-pointer`}
                        onClick={() => setActiveStep(index)}
                     >
                        {index + 1}
                     </div>
                     <div
                        className={`${
                           activeStep > index - 1
                              ? "text-blue-2"
                              : "text-gray-500"
                        } absolute top-0 text-center mt-16 w-32 text-xs font-bold uppercase`}
                     >
                        {value}
                     </div>
                  </div>
                  {index !== 3 && (
                     <div
                        style={{ borderTop: "2px solid" }}
                        className={`${
                           activeStep > index
                              ? "border-blue-1"
                              : "border-gray-500"
                        } flex-auto border-t-4 transition duration-500 ease-in-out `}
                     />
                  )}
               </div>
            ))}
         </div>
         {/* end */}
      </div>
   </div>
  );
}
