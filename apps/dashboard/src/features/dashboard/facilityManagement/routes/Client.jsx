import { ClientTable } from "../client/ClientTable";
import { useTranslation } from "react-i18next";
import { Toolbar } from "primereact/toolbar";
import { InputText } from "primereact/inputtext";
import { AddClientDialog } from "../client/AddClientDialog";
import { useState, useRef } from "react";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { AppTopbar } from "~/features/dashboard/layout/AppTopbar";
import { MenuFilter } from "~/components/MenuFilter";
import { IconLocation } from "~/components/icons/IconLocation";
import { IconUserPlus } from "~/components/icons/IconUserPlus";
import { IconBuildingOne } from "~/components/icons/IconBuildingOne";
import { IconDelete } from "~/components/icons/IconDelete";
import { DeleteClient } from "~/features/dashboard/facilityManagement/client/DeleteClient";
import { ProgressSpinner } from "primereact/progressspinner";
import { useClients } from "../hooks/client/useClients";
import { BulkActionOptionTemplate } from "~/components/BulkActionOptionTemplate";
import { ErrorMessage } from "~/components/ErrorMessage";
import { Divider } from 'primereact/divider';

export default function ClientPage() {
   const { t } = useTranslation();
   const countryFilterRef = useRef(null);
   const industryFilterRef = useRef(null);
   const [newClientDialog, setNewClientDialog] = useState(false);
   const [deleteDialog, setDeleteDialog] = useState(false);
   const [rowSelection, setRowSelection] = useState({});

   const [{ pageIndex, pageSize }, setPagination] = useState({ pageIndex: 0, pageSize: 10 })

   const { status, data, error } = useClients({perPage: pageSize, page: pageIndex});

   function closeNewClientDialog() {
      setNewClientDialog(false);
   }

   function openNewClientDialog() {
      setNewClientDialog(true);
   }

   function openDeleteDialog() {
      setDeleteDialog(true);
   }

   function closeDeleteDialog() {
      setDeleteDialog(false);
   }

   function onBulkActionChange(event) {
      if (event.value === "delete") {
         openDeleteDialog();
      }
   }

   return (
      <>
         <AppTopbar
            left={<h1 className="top-bar-title">Client Setup</h1>}
            right={
               <span className="p-input-icon-left search-client search">
                  <i className="pi pi-search" />
                  <InputText placeholder="Search your client or company name here" />
               </span>
            }
         />
         <div className="layout-content">
            <div>
               <Toolbar
                  left={
                     <h1 className="mb-0" style={{ fontSize: "18px" }}>
                        List of clients
                     </h1>
                  }
                  right={
                     <div>
                        <Button
                           icon={<IconUserPlus className="mr-2" />}
                           label="New Client"
                           onClick={openNewClientDialog}
                        />
                     </div>
                  }
               />
               <Toolbar
                  left={
                     <Dropdown
                        options={[
                           {
                              label: "Delete",
                              value: "delete",
                              icon: <IconDelete />,
                           },
                        ]}
                        onChange={onBulkActionChange}
                        placeholder="Bulk Action"
                        dropdownIcon="fa-solid fa-caret-down"
                        itemTemplate={BulkActionOptionTemplate}
                     />
                  }
                  right={
                     <div>
                        <Button
                           icon={<IconLocation className="mr-2" />}
                           label="Country Filter"
                           className="mr-4 p-button-outlined client-filter-btn"
                           onClick={(e) =>
                              countryFilterRef.current.toggle(e)
                           }
                           aria-haspopup
                           aria-controls="country-filter-panel"
                        />
                        <Button
                           className="p-button-outlined client-filter-btn"
                           icon={<IconBuildingOne className="mr-2" />}
                           label="Industry Filter"
                           onClick={(event) =>
                              industryFilterRef.current.toggle(event)
                           }
                           aria-haspopup
                           aria-controls="industry-filter-panel"
                        />
                     </div>
                  }
               />
               <Divider className="mt-2" />
               {
                  status === 'loading'
                     ? (
                        <div className="vh-center">
                           <ProgressSpinner strokeWidth={3} />
                        </div>
                     )
                     : status === 'success'
                     ? (
                        <ClientTable
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
                     )
                     : <ErrorMessage className="vh-center" error={error} />
               }
            </div>
         </div>
         <AddClientDialog
            isOpen={newClientDialog}
            onClose={closeNewClientDialog}
         />
         <MenuFilter
            ref={countryFilterRef}
            id="country-filter-panel"
            listData={[]}
         />
         <MenuFilter
            ref={industryFilterRef}
            id="industry-filter-panel"
            listData={[]}
         />
         <DeleteClient
            bulkDelete
            isOpen={deleteDialog}
            onClose={closeDeleteDialog}
            ids={rowSelection}
         />
      </>
   );
}
