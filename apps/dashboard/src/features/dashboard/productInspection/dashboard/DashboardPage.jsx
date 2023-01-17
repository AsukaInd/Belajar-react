import { ProgressSpinner } from "primereact/progressspinner";
import { ErrorMessage } from "~/components/ErrorMessage";
import InformationCard from "./InformationCard";
import ActiveOrdersTable from "./ActiveOrdersTable";
import FilterOrder from "./FilterOrder";
import { useService } from "../api/services/service.services";
import { useState } from "react";

export default function DashboardPage() {
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
         <InformationCard />
         <FilterOrder />

         {status === "loading" ? (
            <div className="vh-center">
               <ProgressSpinner strokeWidth={3} />
            </div>
         ) : status === "success" ? (
            <ActiveOrdersTable
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
