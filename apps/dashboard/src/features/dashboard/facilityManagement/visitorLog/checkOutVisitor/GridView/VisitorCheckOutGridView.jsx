import { useState } from "react";
import { VisitorLogList } from "./VisitorCheckOutList";
import { useParams } from 'react-router-dom'
import { GridViewLayout } from "~/components/GridViewLayout/GridViewLayout";

export function VisitorCheckOutGridViewMain({ data }) {
   const [selected, setSelected] = useState(null);
   const params = useParams()

   return (
      <GridViewLayout
         title="No selected visitor check out"
         subtitle="Please select a visitor check out first to open the details"
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
