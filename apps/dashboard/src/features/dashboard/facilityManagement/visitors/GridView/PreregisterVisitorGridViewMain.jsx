import { useState } from "react";
import { PreregisterVisitorList } from "./PreregisterVisitorList";
import { useParams } from 'react-router-dom'
import { GridViewLayout } from "../../../../../components/GridViewLayout/GridViewLayout";

export function PreregisterVisitorGridViewMain({ data }) {
   const [selected, setSelected] = useState(null);
   const params = useParams()

   return (
      <GridViewLayout
         title="No selected pre register visitor"
         subtitle="Please select an pre register visitor first to open the details"
         showDetail={params.id}
         listComponent={
            <PreregisterVisitorList
               list={data?.data}
               selected={selected}
               setSelected={setSelected}
            />
         }
      />
   );
}
