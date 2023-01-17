import React, { useState, useRef } from "react";

import { MenuFilter } from "~/components/MenuFilter";
import { Dropdown } from "primereact/dropdown";
import { BulkActionOptionTemplate } from "~/components/BulkActionOptionTemplate";
import { Button } from "primereact/button";
import { IoFilter } from "react-icons/io5";
import { Toolbar } from "primereact/toolbar";

function FilterOrder() {
   const typeFilterRef = useRef(null);
   const [sort, setSort] = useState("");

   function onBulkActionChange(event) {
      setSort(event.value);
   }
   return (
      <section className="my-4">
         <Toolbar
            left={
               <div className="flex gap-4">
                  <div className="my-auto text-gray-600 font-bold">
                     Active Orders
                  </div>
                  <Dropdown
                     options={[
                        {
                           label: "Date Created",
                           value: "date_created",
                        },
                        {
                           label: "Project Name",
                           value: "project_name",
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
               <Button
                  className="p-button-outlined client-filter-btn border-gray-200"
                  icon={<IoFilter className="mr-2" />}
                  label="Type Filter"
                  onClick={(event) => typeFilterRef.current.toggle(event)}
                  aria-haspopup
                  aria-controls="type-filter-panel"
               />
            }
         />

         <MenuFilter
            ref={typeFilterRef}
            id="type-filter-panel"
            listData={["Inspecion A", "Inspection B", "Inspection C"]}
         />
      </section>
   );
}

export default FilterOrder;
