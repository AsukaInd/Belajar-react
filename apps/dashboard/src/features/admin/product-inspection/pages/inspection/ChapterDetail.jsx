import React from "react";

function ChapterDetail() {
   return (
      <div className="layout-content">
         <h4>Product Weight(Special Form)</h4>
         <main>
            <div
               style={{ borderBottom: "0.5px #e5e5e5 solid" }}
               className="flex w-full border-red-600 p-3"
            >
               <div className="w-32 font-bold my-auto">Inspection</div>
               <div>
                  <input
                     type="text"
                     className="p-2 border-gray-300 border-1 rounded-md text-gray-700 w-full"
                  />
               </div>
            </div>
            <div
               style={{ borderBottom: "0.5px #e5e5e5 solid" }}
               className="flex w-full border-red-600 p-3"
            >
               <div className="w-32 font-bold my-auto">Name</div>
               <div>
                  <input
                     type="text"
                     className="p-2 border-gray-300 border-1 rounded-md text-gray-700 w-full"
                  />
               </div>
            </div>
            <div
               style={{ borderBottom: "0.5px #e5e5e5 solid" }}
               className="flex w-full border-red-600 p-3"
            >
               <div className="w-32 font-bold">Type</div>
               <div>
                  <select className="p-2 border-gray-300 border-1 bg-white rounded-md text-gray-700 w-full">
                     <option>Normal</option>
                     <option>Quantity Breakdown</option>
                     <option>Weight Chart</option>
                     <option>Size Measurement</option>
                     <option>Workmanship</option>
                  </select>
               </div>
            </div>
            <div
               style={{ borderBottom: "0.5px #e5e5e5 solid" }}
               className="flex w-full border-red-600 p-3"
            >
               <div className="w-32 my-auto">Instruction</div>
               <div className="w-full">
                  <textarea
                     rows={4}
                     className="p-3 border border-gray-400 rounded w-full"
                  />
               </div>
            </div>
            <div
               style={{ borderBottom: "0.5px #e5e5e5 solid" }}
               className="flex w-full border-red-600 p-3"
            >
               <div className="w-32 my-auto">Sequence</div>
               <div>
                  <input
                     type="number   "
                     className="p-2 border-gray-300 border-1 rounded-md text-gray-700 w-full"
                  />
               </div>
            </div>
            <div
               style={{ borderBottom: "0.5px #e5e5e5 solid" }}
               className="flex w-full border-red-600 p-3"
            >
               <div className="w-32 my-auto">Sample Size</div>
               <div>
                  <input
                     type="number   "
                     className="p-2 border-gray-300 border-1 rounded-md text-gray-700 w-full"
                  />
               </div>
            </div>
            <div
               style={{ borderBottom: "0.5px #e5e5e5 solid" }}
               className="flex w-full border-red-600 p-3"
            >
               <div className="w-32 my-auto">Defect Item</div>
               <div>
                  <select className="p-2 border-gray-300 border-1 bg-white rounded-md text-gray-700 w-full">
                     <option>Normal</option>
                     <option>Quantity Breakdown</option>
                     <option>Weight Chart</option>
                     <option>Size Measurement</option>
                     <option>Workmanship</option>
                  </select>
               </div>
            </div>
         </main>
      </div>
   );
}

export default ChapterDetail;
