import { VisitorLogTable } from "./checkInVisitor/VisitorLogTable";
import { useReports } from "~/features/dashboard/facilityManagement/hooks/useReports"
import { ProgressSpinner } from "primereact/progressspinner";
import { ErrorMessage } from "~/components/ErrorMessage";
import { useState } from 'react'
import { VisitorLogGridViewMain } from "./checkInVisitor/GridView/VisitorLogGridView";

export function CheckInMain({ isGridView }) {
   const [rowSelection, setRowSelection] = useState({});
   const [{ pageIndex, pageSize }, setPagination] = useState({ pageIndex: 0, pageSize: 10 })
   const { status, data, error } = useReports({ name: 'visitor-logs', pageSize, page: pageIndex })

   return (
      <>
         {
            status === 'loading'
               ? (
                  <div className="vh-center">
                     <ProgressSpinner strokeWidth={3} />
                  </div>
               )
               : status === 'success'
                  ? (
                     <>
                        {
                           isGridView
                              ? <VisitorLogGridViewMain data={data} />
                              : (
                                 <div className="layout-content">
                                    <VisitorLogTable
                                       data={data}
                                       rowSelection={rowSelection}
                                       setRowSelection={setRowSelection}
                                       pageIndex={pageIndex}
                                       pageSize={pageSize}
                                       setPagination={setPagination}
                                       pageCount={data?.last_page}
                                       from={data?.from}
                                       to={data?.to}
                                    />
                                 </div>
                              )
                        }
                     </>
                  )
                  : <ErrorMessage className="vh-center" error={error} />
         }</>
   )
}