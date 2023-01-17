import { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { AppTopbar } from "~/features/dashboard/layout/AppTopbar";
import { Toolbar } from "primereact/toolbar";
import { MenuFilter } from "~/components/MenuFilter";
import { DueDateCalendarPopup } from "~/features/dashboard/facilityManagement/workOrder/DueDateCalendarPopup";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { IconCalendar } from "~/components/icons/IconCalendar";
import { IconInbox } from "~/components/icons/IconInbox";
import { VehicleLogTable } from '~/features/dashboard/facilityManagement/vehicleLog/VehicleLogTable'
import { useReports } from "~/features/dashboard/facilityManagement/hooks/useReports"
import { ErrorMessage } from "~/components/ErrorMessage";
import { ProgressSpinner } from "primereact/progressspinner";

export default function VehicleLog() {
   const [rowSelection, setRowSelection] = useState({});
   const inDateFilter = useRef(null);
   const outDateFilter = useRef(null);
   const companyFilterRef = useRef(null);

   const [{ pageIndex, pageSize }, setPagination] = useState({ pageIndex: 0, pageSize: 10 })

   const { status, data, error } = useReports({ name: 'vehicles', pageSize, page: pageIndex })

   const viewLoading = (
      <div className="vh-center">
         <ProgressSpinner strokeWidth={3} />
      </div>
   )

   const viewError = <ErrorMessage className="vh-center" error={error} />

   const viewSuccess = (
      <VehicleLogTable
         data={data?.vehicles}
         rowSelection={rowSelection}
         setRowSelection={setRowSelection}
         pageIndex={pageIndex}
         pageSize={pageSize}
         setPagination={setPagination}
         pageCount={data?.vehicles?.last_page}
         from={data?.vehicles?.from}
         to={data?.vehicles?.to}
      />
   )

   const view = {
      loading: viewLoading,
      success: viewSuccess,
      error: viewError
   }

   return (
      <>
         <AppTopbar
            left={<h1 className="top-bar-title mr-2">Vehicle Log</h1>}
            right={
               <span className="p-input-icon-left search-client search">
                  <i className="pi pi-search" />
                  <InputText placeholder="Search everything about vehicle log here" />
               </span>
            }
         />
         <div className="layout-content">
            <Toolbar
               className="mb-4 overflow-x-auto"
               right={
                  <div className="flex gap-4">
                     <Button
                        icon={<IconCalendar className="mr-2" />}
                        label="In Date Filter"
                        className="mr-4 p-button-outlined client-filter-btn whitespace-pre"
                        onClick={(e) => inDateFilter.current.toggle(e)}
                        aria-haspopup
                        aria-controls="in-date-filter-panel"
                     />
                     <Button
                        icon={<IconCalendar className="mr-2" />}
                        label="Out Date Filter"
                        className="mr-4 p-button-outlined client-filter-btn whitespace-pre"
                        onClick={(e) => outDateFilter.current.toggle(e)}
                        aria-haspopup
                        aria-controls="out-date-filter-panel"
                     />
                     <Button
                        icon={<IconInbox className="mr-2" />}
                        label="Company Filter"
                        className="mr-4 p-button-outlined client-filter-btn whitespace-pre"
                        onClick={(e) => companyFilterRef.current.toggle(e)}
                        aria-haspopup
                        aria-controls="company-filter-panel"
                     />
                  </div>
               }
            />
            {view[status]}
         </div>
         <DueDateCalendarPopup ref={inDateFilter} id="in-date-filter-panel" />
         <DueDateCalendarPopup ref={outDateFilter} id="out-date-filter-panel" />
         <MenuFilter
            ref={companyFilterRef}
            id="company-filter-panel"
            listData={[]}
         />
      </>
   );
}
