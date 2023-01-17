import { useState } from "react";
import { ErrorMessage } from "~/components/ErrorMessage";
import { ProgressSpinner } from "primereact/progressspinner";
import { useFreelancers } from "../hooks/useFreelancers";
import { FreelancerTable } from "../freelancers/FreelancerTable";

export default function Freelancer() {
   const [{ pageIndex, pageSize }, setPagination] = useState({ pageIndex: 0, pageSize: 10 })

   const { status, data, error } = useFreelancers({ perPage: pageSize, page: pageIndex })

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
                     <FreelancerTable
                        data={data}
                        pageIndex={pageIndex}
                        pageSize={pageSize}
                        setPagination={setPagination}
                        pageCount={data?.last_page}
                        from={data?.from}
                        to={data?.to}
                     />
                  )
                  : <ErrorMessage className="vh-center" error={error} />
         }
      </div>
   );
}
