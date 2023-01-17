import { VisitorLogCheckOutTable } from "./checkOutVisitor/VisitorLogCheckOutTable";
import { ProgressSpinner } from "primereact/progressspinner";
import { ErrorMessage } from "~/components/ErrorMessage";
import { useState } from 'react'
import { VisitorCheckOutGridViewMain } from "./checkOutVisitor/GridView/VisitorCheckOutGridView";
import { useVisitorCheckOutHistory } from "../hooks/useVisitorCheckOutHistory";

export function CheckOutMain({ isGridView }) {
   const [rowSelection, setRowSelection] = useState({});
   const [{ pageIndex, pageSize }, setPagination] = useState({ pageIndex: 0, pageSize: 10 })
   const { status, data, error } = useVisitorCheckOutHistory({ pageSize, page: pageIndex })

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
                              ? <VisitorCheckOutGridViewMain data={data} />
                              : (
                                 <div className="layout-content">
                                    <VisitorLogCheckOutTable
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
         }
      </>
   )
}