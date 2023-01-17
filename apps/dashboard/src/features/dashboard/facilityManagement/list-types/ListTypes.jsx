import { AllTypes } from "./AllTypes";
import { TypeList } from "./TypeList";
import { Assignment } from "./Assignment";
import { useState } from "react";

export function ListTypes(props) {
   const { allTypesData, typeListData, name } = props;
   const [selectedListIndex, setSelectedListIndex] = useState(null);

   return (
      <div className="grid">
         <div className="col-3 card mb-0">
            <AllTypes name={name} allTypesData={allTypesData} />
         </div>
         <div className="col-3 mx-4 card mb-0">
            <TypeList
               name={name}
               typeListData={typeListData}
               selectedListIndex={selectedListIndex}
               setSelectedListIndex={setSelectedListIndex}
            />
         </div>
         <div className="col card">
            <Assignment
               name={name}
               selectedList={
                  selectedListIndex !== null
                     ? typeListData?.data?.data[selectedListIndex]
                     : null
               }
            />
         </div>
      </div>
   );
}
