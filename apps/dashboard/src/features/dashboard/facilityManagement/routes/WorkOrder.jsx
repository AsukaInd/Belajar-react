import { Dropdown } from "primereact/dropdown";
import { useRef, useState } from "react";
import { MenuFilter } from "~/components/MenuFilter";
import { AppTopbar } from "~/features/dashboard/layout/AppTopbar";
import { Toolbar } from "primereact/toolbar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { IconLocation } from "~/components/icons/IconLocation";
import { IconInbox } from "~/components/icons/IconInbox";
import { IconFolders } from "~/components/icons/IconFolders";
import { AddWorkOrderDialog } from "~/features/dashboard/facilityManagement/workOrder/AddWorkOrderDialog";
import { WorkOrderMain } from "~/features/dashboard/facilityManagement/workOrder/WorkOrderMain";
import { DueDateCalendarPopup } from "~/features/dashboard/facilityManagement/workOrder/DueDateCalendarPopup";
import { useWorkOrders } from '~/features/dashboard/facilityManagement/hooks/workOrder/useWorkOrders'
import { ProgressSpinner } from "primereact/progressspinner";
import { ErrorMessage } from "~/components/ErrorMessage";
import { formatDueDate } from '~/utils/formatDate'
import { useNavigate } from 'react-router-dom'
import dayjs from "dayjs";

export default function WorkOrder() {
   const dueDateFilterRef = useRef(null);
   const locationFilterRef = useRef(null);
   const statusFilterRef = useRef(null);
   const categoryFilterRef = useRef(null);
   const navigate = useNavigate()
   const [addWorkOrder, setAddWorkOrder] = useState(false);

   const [{ dueDateFilter, statusFilter }, setFilter] = useState({
      dueDate: null,
      statusFilter: null
   })

   const [{ pageIndex, pageSize }, setPagination] = useState({ pageIndex: 0, pageSize: 10 })

   const { status, data, error } = useWorkOrders({
      page: pageIndex,
      dueDateFilter: dueDateFilter ? formatDueDate(dueDateFilter) : null,
      pageSize,
      statusFilter
   })

   const sortOptions = [
      "Created Date",
      "Earliest Due Date",
      "Latest Due Date",
      "Highest Priority",
      "Lowest Priority",
      "Fixed",
   ]

   const statusOptions = [
      {
         label: "Open",
         value: 'open'
      },
      {
         label: "On Hold",
         value: 'on-hold'
      },
      {
         label: "In Progress",
         value: 'in-progress'
      },
      {
         label: "Done",
         value: 'done'
      }
   ]

   const categoryOptions = [
      "Critical",
      "Medium",
      "Work",
      "Fixed"
   ]

   function openWorkOrder() {
      setAddWorkOrder(true);
   }

   function closeWorkOrder() {
      setAddWorkOrder(false);
   }

   function updateFilter(key, value) {
      navigate('/facility-management/reports/work-order/')

      setFilter(prev => {
         return {
            ...prev,
            [key]: key === 'dueDateFilter' && dayjs(value).isSame(dayjs(dueDateFilter))
               ? null /* remove dueDateFilter */
               : value,
         }
      })

   }

   return (
      <>
         <AppTopbar
            left={
               <h1 className="top-bar-title hidden md:block">Work Orders</h1>
            }
            right={
               <div className="flex items-center">
                  <span className="p-input-icon-left search-client search">
                     <i className="pi pi-search" />
                     <InputText placeholder="Search your work here" />
                  </span>
                  <Button
                     icon={<IconFolders className="mr-2 hidden md:block" />}
                     className="ml-4 p-3"
                     label="Add New Work Order"
                     onClick={openWorkOrder}
                  />
               </div>
            }
         />
         <div className="layout-content my-4">
            <div>
               <Toolbar
                  className="overflow-x-auto"
                  left={
                     <Dropdown
                        options={sortOptions}
                        placeholder="Sort By"
                        dropdownIcon="fa-solid fa-caret-down"
                     />
                  }
                  right={
                     <div className="flex md:block gap-4">
                        <Button
                           icon={<IconInbox className="mr-2" />}
                           label="Due Date Filter"
                           className="mr-4 p-button-outlined client-filter-btn  whitespace-pre "
                           onClick={(e) => dueDateFilterRef.current.toggle(e)}
                           aria-haspopup
                           aria-controls="due-date-filter-panel"
                        />
                        <Button
                           icon={<IconInbox className="mr-2" />}
                           label="Category Filter"
                           className="mr-4 p-button-outlined client-filter-btn  whitespace-pre"
                           onClick={(e) => categoryFilterRef.current.toggle(e)}
                           aria-haspopup
                           aria-controls="category-filter-panel"
                        />
                        <Button
                           icon={<IconInbox className="mr-2" />}
                           label="Status Filter"
                           className="mr-4 p-button-outlined client-filter-btn  whitespace-pre"
                           onClick={(e) => statusFilterRef.current.toggle(e)}
                           aria-haspopup
                           aria-controls="status-filter-panel"
                        />
                        <Button
                           className="p-button-outlined client-filter-btn  whitespace-pre"
                           icon={<IconLocation className="mr-2" />}
                           label="Location Filter"
                           onClick={(event) =>
                              locationFilterRef.current.toggle(event)
                           }
                           aria-haspopup
                           aria-controls="location-filter-panel"
                        />
                     </div>
                  }
               />
            </div>
         </div>
         {
            status === 'loading'
               ? (
                  <div className="vh-center">
                     <ProgressSpinner strokeWidth={3} />
                  </div>
               )
               : status === 'success'
                  ? (
                     <WorkOrderMain setPagination={setPagination} data={data} />
                  )
                  : <ErrorMessage className="vh-center" error={error} />
         }
         <DueDateCalendarPopup
            ref={dueDateFilterRef}
            id="due-date-filter-panel"
            value={dueDateFilter}
            onChange={(event) => {
               dueDateFilterRef.current.hide()
               updateFilter('dueDateFilter', event.value)
            }}
         />
         <MenuFilter
            ref={categoryFilterRef}
            id="category-filter-panel"
            listData={categoryOptions}
         />
         <MenuFilter
            ref={statusFilterRef}
            id="status-filter-panel"
            listData={statusOptions}
            onApplyFilter={(value) => {
               statusFilterRef.current.hide()
               updateFilter('statusFilter', value)
            }}
         />
         <MenuFilter
            ref={locationFilterRef}
            id="location-filter-panel"
            listData={[
               "460 Grayce Spur O'Connellville, WI 11818",
               "730 Tromp Vista Lake Gerry, WI 44085",
               "28064 Gerda Ford Jessside, KY 76985"
            ]}
         />
         <AddWorkOrderDialog isOpen={addWorkOrder} onClose={closeWorkOrder} />
      </>
   );
}
