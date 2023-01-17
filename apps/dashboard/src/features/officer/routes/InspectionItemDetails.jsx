import { Toolbar } from "primereact/toolbar";
import React, { useState } from "react";
import {
   AiOutlineDown,
   AiOutlineCheckCircle,
   AiOutlineRight,
   AiOutlineArrowLeft,
} from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useChapter, useChapterQuestion } from "../hooks/useChapter";
import ChapterQuestion from "./InspectionChapter";

const QUESTION_TYPE = [
   "simple question",
   "size-measurement",
   "quantity size",
   "Weight Chart",
];

function InspectionItemDetails() {
   const { inspectionId } = useParams();

   const [{ pageIndex, pageSize }, setPagination] = useState({
      pageIndex: 0,
      pageSize: 10,
   });

   const { status, data, error } = useChapter({
      perPage: pageSize,
      page: pageIndex,
   });
   console.log(data)
   return (
      <div className="max-w-xl mx-auto bg-white-f4 min-h-screen">
         <Toolbar
            left={
               <>
                  <a href="/app/officer/inspection">
                     <AiOutlineArrowLeft
                        color="#2854F6"
                        size={20}
                        className="mr-2 drop-shadow-md"
                     />
                  </a>
                  <h1 className="text-xl my-auto">Inspection Item Details</h1>
               </>
            }
         />

         <div className="p-4 bg-white-fa ">
            <p className="font-bold text-2xl">
               Mans 80 Hooded Jacket Ultra Light Down{" "}
            </p>
            <div className="text-grey-1">
               Supplier Name | Location | Qty 245
            </div>
            <div className="h-64 bg-[#D9D9D9] rounded-lg mt-4" />
         </div>
         <div className="bg-white-f4 my-4 px-4">
            <div className="flex justify-between">
               <span className="font-medium text-lg rounded my-auto text-black">
                  Inspection Chapters
               </span>
               <a
                  href={`/app/officer/inspection/${inspectionId}/report`}
                  className="bg-blue-2 text-white font-medium rounded border-r-0 px-3 py-2 my-auto"
               >
                  Report
               </a>
            </div>
         </div>

         <div className="bg-white-f4 px-4">
            <div className="overflow-hidden divide-y text-blue-900">
               {data?.data?.data?.map((item, index) => {
                  return (
                     <div div key={index}>
                        {item?.product_inspection_order_id?.toString() ===
                           inspectionId && (
                           <div className="relative overflow-hidden bg-white rounded-lg my-2 py-2">
                              <input
                                 type="checkbox"
                                 className="peer absolute top-0 inset-x-0 w-full h-12 opacity-0 z-10 cursor-pointer"
                              />
                              <div className="h-12 w-full  flex items-center font-bold px-4 ">
                                 <span className="font-medium text-lg rounded my-auto text-blue-2">
                                    {item.name}
                                 </span>
                              </div>
                              <div className="absolute top-5 right-3 transition-transform duration-500 rotate-0 peer-checked:-rotate-180">
                                 <AiOutlineDown />
                              </div>

                              <div className="overflow-hidden bg-white transition-all duration-500 peer-checked:max-h-0">
                                 <div className=" px-4 ">
                                    <div className="font-bold text-lg">
                                       {item.desc}
                                    </div>
                                    <div className="text-grey-1 mb-2">
                                       25/100 sub-chapters
                                    </div>
                                 </div>
                                 <ChapterQuestion inspectionId={inspectionId}  chapterId={item.id} />
                              </div>
                           </div>
                        )}
                     </div>
                  );
               })}
            </div>
         </div>
      </div>
   );
}

export default InspectionItemDetails;
