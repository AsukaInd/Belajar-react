import { Toolbar } from "primereact/toolbar";
import React, { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import {useParams} from 'react-router-dom'
import QuantitySize from "../Inspection/QuantitySize";
import SizeMeasurement from "../Inspection/SizeMeasurement";
import StandardInspection from "../Inspection/StandardInspection";
import WeightChart from "../Inspection/WeightChart";

const TABS_LIST = ["1", "2", "3", "4", "5", "6", "7"];

function InspectionQuestion() {
  const {inspectionId, chapterId} = useParams()
   const [activeTab, setActiveTab] = useState("1");
   const [inspectionType, setInspectionType] = useState("Normal");
   return (
      <div className="max-w-xl mx-auto bg-white-f4 min-h-screen">
         <div className="flex justify-between bg-white p-3">
            <a href={`/app/officer/inspection/${inspectionId}`}>
               <AiOutlineArrowLeft
                  color="#2854F6"
                  size={20}
                  className="mr-2 drop-shadow-md my-auto"
               />
            </a>
            <p className="my-auto text-center">
               <b>Chapter 1.14 </b>Is Invoice and consistant to the IRF booking?{" "}
            </p>
            <img src="/icons/Status_list.svg" alt="status list" />
         </div>
          <StandardInspection />
         {/* {chapterId === "1" && <SizeMeasurement />}
         {chapterId === "2" && <QuantitySize />}
         {chapterId === "3" && <WeightChart />} */}

         <div className="h-4" />
      </div>
   );
}

export default InspectionQuestion
