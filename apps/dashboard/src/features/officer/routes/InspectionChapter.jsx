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

function ChapterQuestion({ inspectionId, chapterId }) {
   const [{ pageIndex, pageSize }, setPagination] = useState({
      pageIndex: 0,
      pageSize: 10,
   });

   const { status, data, error } = useChapterQuestion({
      perPage: pageSize,
      page: pageIndex,
   });
   
   return (
      <div className="max-w-xl mx-auto bg-white-f4">
         <div className="bg-white-fa">
            {data?.data?.data?.map((value, index) => (
               <div key={index}>
                  {/* {value?.product_inspection_checklist_chapter_id?.toString() ===
                     chapterId && ( */}
                     <a
                        href={`/app/officer/inspection/${inspectionId}/chapter/${value.id}`}
                     >
                        <div className="flex py-4 border-grey-1 border-t-2  mx-1 my-2 bg-white  px-4 w-full justify-between">
                           <div className="flex gap-2">
                              <AiOutlineCheckCircle
                                 className="my-auto"
                                 size={20}
                                 color="#7A7A7A"
                              />
                              <p className="text-grey-1 my-auto">
                                 <b className="text-[#000000]">{value.name}</b> <br/>
                                 {value.desc}
                              </p>
                           </div>
                           <AiOutlineRight
                              className="my-auto"
                              size={16}
                              color="#7A7A7A"
                           />
                        </div>
                     </a>
                   {/* )} */}
               </div>
            ))}
         </div>
      </div>
   );
}

export default ChapterQuestion;
