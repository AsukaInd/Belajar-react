import { useState } from "react";
import { VisitorLogList } from "./VisitorLogList";
import { useParams } from 'react-router-dom'
import { GridViewLayout } from "~/components/GridViewLayout/GridViewLayout";

export function VisitorLogGridViewMain({ data }) {
   const [selected, setSelected] = useState(null);
   const params = useParams()

   return (
      <GridViewLayout
         title="No selected visitor log"
         subtitle="Please select a visitor log first to open the details"
         showDetail={params.id}
         listComponent={
            <VisitorLogList
               list={data?.data}
               selected={selected}
               setSelected={setSelected}
            />
         }
      />
   );
}
