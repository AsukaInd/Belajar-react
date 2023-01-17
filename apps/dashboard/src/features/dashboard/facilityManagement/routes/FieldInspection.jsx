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
import { IconLocation } from "~/components/icons/IconLocation";
import { FieldInspectionTable } from '~/features/dashboard/facilityManagement/fieldInspection/FieldInspectionTable'

export default function FieldInspection() {
   const [rowSelection, setRowSelection] = useState({});
   const dateEnteredFilter = useRef(null);
   const assigneeFilterRef = useRef(null);
   const inspectedFilterRef = useRef(null);
   const siteFilterRef = useRef(null);

   const data = {
      data: [
         {
            id: 1,
            task_name: "Talk to Harry",
            created_at: "2022-08-22T05:25:47.000000Z",
            comments:
               "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
            assignee: { id: 1, name: "Robert Fox", image: "/dummy-profile.png" },
            site: 'Surabaya Site',
            inspected_officer: { id: 1, name: "Robert Fox", image: "/dummy-profile.png" },
            asset: 'Homes',
            questions: [
               { id: 1, question: 'Is there any broken vehicle?', answer: 'yes' },
               { id: 2, question: 'Is there any broken vehicle?', answer: 'yes' },
               { id: 3, question: 'Is there any broken vehicle?', answer: 'yes' },
               { id: 4, question: 'Is there any broken vehicle?', answer: 'yes' }
            ]
         },
         {
            id: 11,
            task_name: "Talk to Harry",
            created_at: "2022-08-22T05:25:47.000000Z",
            comments:
               "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
            assignee: { id: 1, name: "Robert Fox", image: "/dummy-profile.png" },
            site: 'Surabaya Site',
            inspected_officer: { id: 1, name: "Robert Fox", image: "/dummy-profile.png" },
            asset: 'Homes',
            questions: []
         },
      ],
   };

   return (
      <>
         <AppTopbar
            left={<h1 className="top-bar-title">Field Inspection</h1>}
            right={
               <span className="p-input-icon-left search-client search">
                  <i className="pi pi-search" />
                  <InputText placeholder="Search all of result inspection here" />
               </span>
            }
         />
         <div className="layout-content">
            <Toolbar
               className="mb-4 overflow-x-auto"
               left={
                  <Dropdown
                     options={[]}
                     placeholder="Sort By"
                     dropdownIcon="fa-solid fa-caret-down"
                  />
               }
               right={
                  <div className="flex gap-4">
                     <Button
                        icon={<IconCalendar className="mr-2" />}
                        label="Date Entered Filter"
                        className="mr-4 p-button-outlined client-filter-btn whitespace-pre"
                        onClick={(e) => dateEnteredFilter.current.toggle(e)}
                        aria-haspopup
                        aria-controls="in-date-filter-panel"
                     />
                     <Button
                        icon={<IconInbox className="mr-2" />}
                        label="Assignee Filter"
                        className="mr-4 p-button-outlined client-filter-btn whitespace-pre"
                        onClick={(e) => assigneeFilterRef.current.toggle(e)}
                        aria-haspopup
                        aria-controls="assignee-filter-panel"
                     />
                     <Button
                        icon={<IconInbox className="mr-2" />}
                        label="Inspected Filter"
                        className="mr-4 p-button-outlined client-filter-btn whitespace-pre"
                        onClick={(e) => inspectedFilterRef.current.toggle(e)}
                        aria-haspopup
                        aria-controls="inspected-filter-panel"
                     />
                     <Button
                        icon={<IconLocation className="mr-2" />}
                        label="Site Filter"
                        className="mr-4 p-button-outlined client-filter-btn whitespace-pre"
                        onClick={(e) => siteFilterRef.current.toggle(e)}
                        aria-haspopup
                        aria-controls="site-filter-panel"
                     />
                  </div>
               }
            />
            <FieldInspectionTable
               data={data}
               rowSelection={rowSelection}
               setRowSelection={setRowSelection}
            />
         </div>
         <DueDateCalendarPopup ref={dateEnteredFilter} id="in-date-filter-panel" />
         <MenuFilter
            ref={assigneeFilterRef}
            id="assignee-filter-panel"
            listData={[]}
         />
         <MenuFilter
            ref={inspectedFilterRef}
            id="inspected-filter-panel"
            listData={[]}
         />
         <MenuFilter
            ref={siteFilterRef}
            id="site-filter-panel"
            listData={[]}
         />
      </>
   );
}
