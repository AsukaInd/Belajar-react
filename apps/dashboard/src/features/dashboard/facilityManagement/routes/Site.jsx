import { useState, useRef } from "react";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { AddSiteDialog } from "~/features/dashboard/facilityManagement/site/AddSiteDialog";
import { SiteTable } from "~/features/dashboard/facilityManagement/site/SiteTable";
import { useTranslation } from "react-i18next";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { IconDelete } from "~/components/icons/IconDelete";
import { BulkActionOptionTemplate } from "~/components/BulkActionOptionTemplate";
import { IconBuildingOne } from "~/components/icons/IconBuildingOne";
import { AppTopbar } from "~/features/dashboard/layout/AppTopbar";
import { IconLocalPin } from "~/components/icons/IconLocalPin";
import { useSites } from "~/features/dashboard/facilityManagement/hooks/site/useSites";
import { MenuFilter } from "~/components/MenuFilter";
import { DeleteSite } from "~/features/dashboard/facilityManagement/site/DeleteSite";
import { ProgressSpinner } from "primereact/progressspinner";
import { ErrorMessage } from "~/components/ErrorMessage";
import { Divider } from 'primereact/divider';
import { SiteGridViewMain } from "../site/GridView/SiteGridView";
import { BsGrid1X2 } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";
import { useSearchFilter } from "../hooks/useSearchFilter";
import { useAPIParams } from "../hooks/useAPIParams";
import { transformToDropdownOptions } from "../../../../utils/transformToDropdownOptions";

export default function SitePage() {
   const { t } = useTranslation();
   const [newSiteDialog, setNewSiteDialog] = useState(false);
   const [deleteDialog, setDeleteDialog] = useState(false);
   const [rowSelection, setRowSelection] = useState({});
   const companyNameFilter = useRef(null);
   const [sorting, setSorting] = useState([])
   const [isGridView, setIsGridView] = useState(false)

   const { params, setParams, setSearch, searchRef, resetSearch } = useAPIParams()

   const { status, data, error } = useSites({
      perPage: params.pageSize,
      page: params.pageIndex,
      sort_by: sorting.length > 0 ? sorting[0].id : null,
      sort_order: sorting.length > 0 ? sorting[0].desc ? 'desc' : 'asc' : null,
      search: params.search,
      filter: params.filter,
      filter_by: params.filter_by
   });

   const { filterSearch, filterSearchRef, resetFilterSearch } = useSearchFilter()

   const sitesForFilter = useSites({ perPage: 999, search: filterSearchRef.current?.value })

   function closeNewSiteDialog() {
      setNewSiteDialog(false);
   }

   function openNewSiteDialog() {
      setNewSiteDialog(true);
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
            left={<h1 className="top-bar-title">Site Setup</h1>}
            right={
               <span className="p-input-icon-left search-client search">
                  <i className="pi pi-search" />
                  <InputText
                     ref={searchRef}
                     placeholder="Search your site here"
                     onKeyUp={(event) => setSearch(event)}
                     onChange={(event) => resetSearch(event)}
                  />
               </span>
            }
         />
         <div className="layout-content mb-0">
            <div>
               <Toolbar
                  left={
                     <h1 className="mb-0" style={{ fontSize: "18px" }}>
                        List of Sites
                     </h1>
                  }
                  right={
                     <div>
                        <Button
                           icon={<IconLocalPin className="mr-3" />}
                           label="New Site"
                           onClick={openNewSiteDialog}
                        />
                     </div>
                  }
               />
               <Toolbar
                  left={
                     <>
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
                        {/* <div>
                           <Button
                              icon={<BsGrid1X2 />}
                              className="p-button-rounded p-button-text mx-2"
                              onClick={() => setIsGridView(true)}
                           />
                           <Button
                              icon={<FaListUl />}
                              className="p-button-rounded p-button-text"
                              onClick={() => setIsGridView(false)}
                           />
                        </div> */}
                     </>
                  }
                  right={
                     <div>
                        <Button
                           aria-haspopup
                           className="p-button-outlined client-filter-btn"
                           icon={<IconBuildingOne className="mr-2" />}
                           label="Company Name Filter"
                           aria-controls="company-name-filter-panel"
                           onClick={(event) => {
                              companyNameFilter.current.toggle(event)
                              sitesForFilter.refetch()
                           }}
                        />
                     </div>
                  }
               />
               <Divider className="mt-2" />
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
                     <>
                        {
                           isGridView
                              ? (
                                 <SiteGridViewMain
                                    data={data}
                                    hasNextPage={data?.next_page_url}
                                    setPagination={setPagination}
                                    pageIndex={pageIndex}
                                 />
                              )
                              : (
                                 <div className="layout-content mt-0">
                                    <SiteTable
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
                                 </div>
                              )
                        }
                     </>
                  )
                  : <ErrorMessage className="vh-center" error={error} />
         }
         <MenuFilter
            ref={companyNameFilter}
            id="company-name-filter-panel"
            listData={transformToDropdownOptions(
               sitesForFilter.data?.data,
               { label: 'site_name', value: 'site_name' }
            )}
            onApplyFilter={(filterName) => {
               setParams(prev => ({ ...prev, filter: filterName, filter_by: 'name' }))
               companyNameFilter.current.hide()
            }}
            searchRef={filterSearchRef}
            onKeyUp={(event) => { filterSearch(event, sitesForFilter.refetch) }}
            onChange={(event) => { resetFilterSearch(event, sitesForFilter.refetch) }}
            isSearchLoading={sitesForFilter.isLoading}
         />
         <AddSiteDialog isOpen={newSiteDialog} onClose={closeNewSiteDialog} />
         <DeleteSite
            bulkDelete
            isOpen={deleteDialog}
            onClose={closeDeleteDialog}
            ids={rowSelection}
         />
      </>
   );
}
