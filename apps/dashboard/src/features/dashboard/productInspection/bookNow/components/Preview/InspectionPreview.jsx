import React from "react";

function InspectionPreview() {
   return (
      <>
         <div className="flex gap-4 m-4 text-blue-2">
            <div className=" bg-white-fa border-white-e9 border-b-2 p-4 rounded-t-lg w-full">
               <h1 className="font-bold text-lg  my-auto">
                  The Inspection is a First Inspection
               </h1>
               <p>Inspxt Ref No. 20-123456, year-6 digit</p>
            </div>
            <div className=" bg-white-fa border-white-e9 border-b-2 p-4 rounded-t-lg w-full">
               <h1 className="font-bold text-lg  my-auto">
                  System will aiutomatically generate Inspxt
               </h1>
               <p>Ref No. 20-123456, year-6 digit</p>
            </div>
         </div>
         <div className="flex m-4 bg-[#faf9f9] rounded">
            <div className="p-4 w-full">
               <b className="text-lg"> Supplier information</b>
               <div className="flex flex-col gap-3 mt-4">
                  <div className="flex justify-between">
                     <span>Supplier Name</span>
                     <span>JIANGSU SIANTAY TRADING CENTER CO</span>
                  </div>
                  <div className="flex justify-between">
                     <span>Main Contact Name</span>
                     <span>Montare Shen</span>
                  </div>
                  <div className="flex justify-between">
                     <span>Landline</span>
                     <span>+312476543</span>
                  </div>
                  <div className="flex justify-between">
                     <span>Mobile</span>
                     <span>+435566678</span>
                  </div>
                  <div className="flex justify-between">
                     <span>Mobile</span>
                     <span>chilsi98@hotmail.com</span>
                  </div>
               </div>
            </div>
            <div className="p-4 w-full ">
               <b className="text-lg"> Exptected Dates</b>
               <div className="flex flex-col gap-3 mt-4">
                  <div className="flex justify-between">
                     <span>Inspection</span>
                     <span>07 January 2022</span>
                  </div>
                  <div className="flex justify-between">
                     <span>Shipment</span>
                     <span>07 January 2022</span>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}

export default InspectionPreview;
