import { useState } from "react";
import { WorkOrderList } from "./WorkOrderList";
import { useParams } from 'react-router-dom'
import { GridViewLayout } from "../../../../components/GridViewLayout/GridViewLayout";

export function WorkOrderMain({ data }) {
   const [selected, setSelected] = useState(null);
   const params = useParams()

   return (
      <GridViewLayout
         title="No selected work order"
         subtitle="Please select an active work order first to open the details"
         showDetail={params.id}
         listComponent={
            <WorkOrderList
               list={data?.data}
               selected={selected}
               setSelected={setSelected}
            />
         }
      />
   );
}
