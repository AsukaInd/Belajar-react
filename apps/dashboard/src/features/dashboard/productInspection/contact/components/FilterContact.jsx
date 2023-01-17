import React, { useState, useRef } from "react";

import { MenuFilter } from "~/components/MenuFilter";
import { Dropdown } from "primereact/dropdown";
import { BulkActionOptionTemplate } from "~/components/BulkActionOptionTemplate";
import { Button } from "primereact/button";
import { IoFilter } from "react-icons/io5";
import { Toolbar } from "primereact/toolbar";
import { IconDelete } from "~/components/icons/IconDelete";

function FilterContact() {
   const positionFilterRef = useRef(null);
   const [sort, setSort] = useState("");

   function onBulkActionChange(event) {
      setSort(event.value);
   }
   return (
      <section className="my-4">
         <Toolbar
            left={
               <div className="flex gap-4">
                  <Dropdown
                     options={[
                        {
                           label: "Delete",
                           value: "delete",
                           icon: <IconDelete />,
                        },
                     ]}
                     placeholder="Bulk Action"
                     dropdownIcon="fa-solid fa-caret-down"
                     itemTemplate={BulkActionOptionTemplate}
                     onChange={onBulkActionChange}
                  />
                  <Dropdown
                     options={[
                        {
                           label: "Date Created",
                           value: "date_created",
                        },
                        {
                           label: "Status",
                           value: "status",
                        },
                     ]}
                     onChange={onBulkActionChange}
                     value={sort}
                     placeholder="Sort Item"
                     dropdownIcon="fa-solid fa-caret-down"
                     itemTemplate={BulkActionOptionTemplate}
                  />
               </div>
            }
            right={
               <div className="flex gap-4">
               <Dropdown
                  options={[
                     {
                        label: "Set Active",
                        value: "set_active",
                     },
                     {
                        label: "Set Not Active",
                        value: "set_not_active",
                     },
                  ]}
                  onChange={onBulkActionChange}
                  value={sort}
                  placeholder="Status"
                  dropdownIcon="fa-solid fa-caret-down"
                  itemTemplate={BulkActionOptionTemplate}
               />               
               <Button
                  className="p-button-outlined client-filter-btn border-gray-200"
                  icon={<IoFilter className="mr-2" />}
                  label="Position Filter"
                  onClick={(event) => positionFilterRef.current.toggle(event)}
                  aria-haspopup
                  aria-controls="position-filter-panel"
               />
               </div>
            }
         />
         <MenuFilter
            ref={positionFilterRef}
            id="position-filter-panel"
            listData={["Position A", "Position B", "Position C"]}
         />
      </section>
   );
}

export default FilterContact
