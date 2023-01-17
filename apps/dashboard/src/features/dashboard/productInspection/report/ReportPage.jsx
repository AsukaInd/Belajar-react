import { InputText } from "primereact/inputtext";
import { ProgressSpinner } from "primereact/progressspinner";
import { Toolbar } from "primereact/toolbar";
import React, { useState } from "react";
import { useService } from "../api/services/service.services";
import ReportTable from "./ReportTable";
import ScheduleTable from "./ReportTable";
import { ErrorMessage } from "~/components/ErrorMessage";

const MENU = ["Approved", "Archived"];

function ReportPage() {
   const [activeMenu, setActiveMenu] = useState("Approved");
   const [rowSelection, setRowSelection] = useState({});
   const [{ pageIndex, pageSize }, setPagination] = useState({
      pageIndex: 0,
      pageSize: 10,
   });

   const { status, data, error } = useService({
      perPage: pageSize,
      page: pageIndex,
   });
   return (
      <div className="layout-content">
         <Toolbar
            left={<h1 className="text-3xl my-auto">Report</h1>}
            right={
               <div className="flex bg-white-fa gap-4 font-medium p-2 rounded">
                  {MENU.map((value, index) => (
                     <div
                        className={`${
                           activeMenu === value
                              ? "bg-white text-blue-2 drop-shadow rounded"
                              : ""
                        } cursor-pointer px-4 py-2`}
                        key={index}
                        onClick={() => setActiveMenu(value)}
                     >
                        {value}
                     </div>
                  ))}
               </div>
            }
         />
         <InputText
            placeholder="Search your client here"
            className="w-full my-4"
         />

         {status === "loading" ? (
            <div className="vh-center">
               <ProgressSpinner strokeWidth={3} />
            </div>
         ) : status === "success" ? (
            <ReportTable
               data={data.data}
               rowSelection={rowSelection}
               setRowSelection={setRowSelection}
               pageIndex={pageIndex}
               pageSize={pageSize}
               setPagination={setPagination}
               pageCount={data?.data?.last_page}
               from={data?.data?.from}
               to={data?.data?.to}
            />
         ) : (
            <ErrorMessage className="vh-center" error={error} />
         )}
      </div>
   );
}

export default ReportPage
