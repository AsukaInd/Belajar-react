import { useRef } from "react";
import { DueDateCalendarPopup } from "~/features/dashboard/facilityManagement/workOrder/DueDateCalendarPopup";
import { IconLocation } from "~/components/icons/IconLocation";
import { IconInbox } from "~/components/icons/IconInbox";
import { IconCalendar } from "~/components/icons/IconCalendar";
import { Button } from "primereact/button";
import { MenuFilter } from "~/components/MenuFilter";
import { Toolbar } from "primereact/toolbar";

export function VisitorLogFilter() {
   const inDateFilter = useRef(null);
   const outDateFilter = useRef(null);
   const locationFilterRef = useRef(null);
   const statusFilterRef = useRef(null);
   const categoryFilterRef = useRef(null);

   return (
      <>
         <Toolbar
            className="overflow-x-auto"
            right={
               <div className="flex items-center gap-4">
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
                     label="Category Filter"
                     className="mr-4 p-button-outlined client-filter-btn whitespace-pre"
                     onClick={(e) => categoryFilterRef.current.toggle(e)}
                     aria-haspopup
                     aria-controls="category-filter-panel"
                  />
                  <Button
                     icon={<IconInbox className="mr-2" />}
                     label="Statue Filter"
                     className="mr-4 p-button-outlined client-filter-btn whitespace-pre"
                     onClick={(e) => statusFilterRef.current.toggle(e)}
                     aria-haspopup
                     aria-controls="status-filter-panel"
                  />
                  <Button
                     className="p-button-outlined client-filter-btn whitespace-pre"
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
         <DueDateCalendarPopup ref={inDateFilter} id="in-date-filter-panel" />
         <DueDateCalendarPopup ref={outDateFilter} id="out-date-filter-panel" />
         <MenuFilter
            ref={categoryFilterRef}
            id="category-filter-panel"
            listData={[]}
         />
         <MenuFilter
            ref={statusFilterRef}
            id="status-filter-panel"
            listData={[]}
         />
         <MenuFilter
            ref={locationFilterRef}
            id="location-filter-panel"
            listData={[]}
         />
      </>
   );
}
