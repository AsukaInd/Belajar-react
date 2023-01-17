import { BulkActionOptionTemplate } from "~/components/BulkActionOptionTemplate";
import { IconDelete } from "~/components/icons/IconDelete";
import { AppTopbar } from "~/features/dashboard/layout/AppTopbar";
import { Toolbar } from "primereact/toolbar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { IconLocation } from "~/components/icons/IconLocation";
import { IconInbox } from "~/components/icons/IconInbox";
import { IconHardHat } from "~/components/icons/IconHardHat";
import { Dropdown } from "primereact/dropdown";
import { useRef, useState } from "react";
import { MenuFilter } from "~/components/MenuFilter";
import { DeleteVendor } from "~/features/dashboard/facilityManagement/vendor/DeleteVendor";
import { AddVendorDialog } from "~/features/dashboard/facilityManagement/vendor/AddVendorDialog";
import { VendorTable } from "~/features/dashboard/facilityManagement/vendor/VendorTable";
import { useVendors } from '~/features/dashboard/facilityManagement/hooks/vendor/useVendors'
import { ErrorMessage } from "~/components/ErrorMessage";
import { ProgressSpinner } from "primereact/progressspinner";
import { Divider } from 'primereact/divider';
import { useAPIParams } from "../hooks/useAPIParams";
import { useSearchFilter } from "../hooks/useSearchFilter";
import { transformToDropdownOptions } from "../../../../utils/transformToDropdownOptions";

export default function Vendor() {
   const assetFilterRef = useRef(null);
   const locationFilterRef = useRef(null);
   const [rowSelection, setRowSelection] = useState({});
   const [deleteDialog, setDeleteDialog] = useState(false);
   const [newVendorDialog, setNewVendorDialog] = useState(false);
   const [sorting, setSorting] = useState([])

   const { filterSearch, filterSearchRef, resetFilterSearch } = useSearchFilter()
   const filterVendorQuery = useVendors({
      perPage: 999,
      search: filterSearchRef.current?.value
   })

   const { params, setParams, setSearch, searchRef, resetSearch } = useAPIParams()

   const { status, data, error } = useVendors({
      perPage: params.pageSize,
      page: params.pageIndex,
      sort_by: sorting.length > 0 ? sorting[0].id : null,
      sort_order: sorting.length > 0 ? sorting[0].desc ? 'desc' : 'asc' : null,
      search: params.search,
      filter: params.filter,
      filter_by: params.filter_by
   })

   function openNewVendorDialog() {
      setNewVendorDialog(true);
   }

   function closeNewVendorDialog() {
      setNewVendorDialog(false);
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
            left={<h1 className="top-bar-title">Vendor Setup</h1>}
            right={
               <span className="p-input-icon-left search-client search">
                  <i className="pi pi-search" />
                  <InputText
                     ref={searchRef}
                     placeholder="Search your vendor here"
                     onKeyUp={(event) => setSearch(event)}
                     onChange={(event) => resetSearch(event)}
                  />
               </span>
            }
         />
         <div className="layout-content">
            <div>
               <Toolbar
                  left={
                     <h1 className="mb-0" style={{ fontSize: "18px" }}>
                        List of Vendors
                     </h1>
                  }
                  right={
                     <div>
                        <Button
                           icon={<IconHardHat className="mr-2" />}
                           label="Add New Vendor"
                           onClick={openNewVendorDialog}
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
                           className="p-button-outlined client-filter-btn"
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
                           <VendorTable
                              data={data}
                              rowSelection={rowSelection}
                              setRowSelection={setRowSelection}
                              pageIndex={params.pageIndex}
                              pageSize={params.pageSize}
                              setPagination={setParams}
                              pageCount={data?.last_page}
                              from={data?.from}
                              to={data?.to}
                              sorting={sorting}
                              setSorting={setSorting}
                           />
                        )
                        : <ErrorMessage className="vh-center" error={error} />
               }
            </div>
         </div>
         <MenuFilter
            ref={assetFilterRef}
            id="asset-filter-panel"
            listData={["tenetur quidem laborum similique aut et", "animi odit rerum", "similique aut et"]}
         />
         <MenuFilter
            ref={locationFilterRef}
            id="location-filter-panel"
            listData={transformToDropdownOptions(
               filterVendorQuery.data?.data,
               { label: 'location', value: 'location' }
            )}
            onApplyFilter={(filterName) => {
               setParams(prev => ({ ...prev, filter: filterName, filter_by: 'location' }))
               locationFilterRef.current.hide()
            }}
            searchRef={filterSearchRef}
            onKeyUp={(event) => filterSearch(event, filterVendorQuery.refetch)}
            onChange={(event) => resetFilterSearch(event, filterVendorQuery.refetch)}
            isSearchLoading={filterVendorQuery.isLoading}
         />
         <DeleteVendor
            bulkDelete
            isOpen={deleteDialog}
            onClose={closeDeleteDialog}
            ids={rowSelection}
         />
         <AddVendorDialog
            isOpen={newVendorDialog}
            onClose={closeNewVendorDialog}
         />
      </>
   );
}
