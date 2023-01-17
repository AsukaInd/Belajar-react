import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function InformationCard() {
   const [hiddenCurrency, setHiddenCurrency] = useState(false);
   return (
      <>
         <div className="flex justify-between py-2 rounded">
            <h1 className="text-3xl my-auto">Dashboard</h1>
            <div
               className="flex gap-1 text-blue-2 cursor-pointer"
               onClick={() => setHiddenCurrency(!hiddenCurrency)}
            >
               {hiddenCurrency ? (
                  <AiOutlineEye className="my-auto" />
               ) : (
                  <AiOutlineEyeInvisible className="my-auto" />
               )}
               <p className="my-auto">
                  {hiddenCurrency ? "View" : "Hide"} Currency
               </p>
            </div>
         </div>
         <section className="overflow-hidden divide-y mt-2">
            <div className="flex flex-col md:flex-row gap-4">
               <div className="relative border-2 border-gray-100 drop-shadow overflow-hidden bg-white rounded-lg p-2 w-full">
                  <img src="/icons/credit-card-outline.svg" alt="credit card" />
                  <div className="mt-4 text-gray-600 text-md">Net Income</div>
                  <div className="text-green-500 font-bold my-1 text-2xl">
                     {hiddenCurrency ? "-" : "$24.000.000"}
                  </div>
               </div>

               <div className="relative border-2 border-gray-100 drop-shadow overflow-hidden bg-white rounded-lg p-2 w-full">
                  <img src="/icons/credit-card-outline.svg" alt="credit card" />
                  <div className="mt-4 text-gray-600 text-md">Withdraw</div>
                  <div className="text-red-500 font-bold my-1 text-2xl">
                     {hiddenCurrency ? "-" : "$4.000.000"}
                  </div>
               </div>

               <div className="relative border-2 border-gray-100 drop-shadow overflow-hidden bg-white rounded-lg p-2 w-full">
                  <img src="/icons/Transger.svg" alt="credit card" />
                  <div className="mt-4 text-gray-600 text-md">
                     Pending Clearance
                  </div>
                  <div className="font-bold my-1 text-2xl">
                     {hiddenCurrency ? "-" : "2.400"}{" "}
                  </div>
               </div>

               <div className="relative border-2 border-gray-100 drop-shadow overflow-hidden bg-white rounded-lg p-2 w-full">
                  <img src="/icons/Transger.svg" alt="credit card" />
                  <div className="mt-4 text-gray-600 text-md">Available</div>
                  <div className="font-bold my-1 text-2xl">
                     {hiddenCurrency ? "-" : "1.000"}{" "}
                  </div>
               </div>
            </div>
         </section>
      </>
   );
}

export default InformationCard;
