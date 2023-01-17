import { useState } from "react";
import { ErrorMessage } from "~/components/ErrorMessage";
import { ProgressSpinner } from "primereact/progressspinner";
import { useGigs } from "../hooks/useGigs";
import { GigTable } from "../gigs/GigTable";

export default function Gigs() {
   const [{ pageIndex, pageSize }, setPagination] = useState({ pageIndex: 0, pageSize: 10 })

   const { status, data, error } = useGigs({ perPage: pageSize, page: pageIndex })

   return (
      <div className="layout-content">
         {
            status === 'loading'
               ? (
                  <div className="vh-center">
                     <ProgressSpinner strokeWidth={3} />
                  </div>
               )
               : status === 'success'
                  ? (
                     <GigTable
                        data={data}
                        pageIndex={pageIndex}
                        pageSize={pageSize}
                        setPagination={setPagination}
                        pageCount={data?.data?.last_page}
                        from={data?.data?.from}
                        to={data?.data?.to}
                     />
                  )
                  : <ErrorMessage className="vh-center" error={error} />
         }
      </div>
   );
}
