import { useState } from "react";
import { SiteList } from "./SiteList";
import { useParams } from 'react-router-dom'
import { GridViewLayout } from "../../../../../components/GridViewLayout/GridViewLayout";

export function SiteGridViewMain({ data, hasNextPage, setPagination, pageIndex }) {
   const [selected, setSelected] = useState(null);
   const params = useParams()

   return (
      <GridViewLayout
         title="No selected site"
         subtitle="Please select a site first to open the details"
         showDetail={params.id}
         listComponent={
            <SiteList
               list={data?.data}
               selected={selected}
               setSelected={setSelected}
               hasNextPage={hasNextPage}
               setPagination={setPagination}
               pageIndex={pageIndex}
            />
         }
      />
   );
}
