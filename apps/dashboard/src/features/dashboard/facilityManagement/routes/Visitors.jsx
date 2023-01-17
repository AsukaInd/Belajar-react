import { AppTopbar } from "~/features/dashboard/layout/AppTopbar";
import { InputText } from "primereact/inputtext";
import { Toolbar } from "primereact/toolbar";
import { Dropdown } from "primereact/dropdown";
import { useState, useRef } from "react";
import { IconDelete } from "~/components/icons/IconDelete";
import { BulkActionOptionTemplate } from "~/components/BulkActionOptionTemplate";
import { Button } from "primereact/button";
import { IconBuildingOne } from "~/components/icons/IconBuildingOne";
import { MenuFilter } from "~/components/MenuFilter";
import { DeleteVisitor } from "~/features/dashboard/facilityManagement/visitors/DeleteVisitor";
import { VisitorsTable } from "~/features/dashboard/facilityManagement/visitors/VisitorsTable";
import { Divider } from 'primereact/divider';
import { AddPreregisterDialog } from '~/features/dashboard/facilityManagement/visitors/AddPreregisterDialog'
import { IconUsers } from '~/components/icons/IconUsers'
import { usePreregisterVisitors } from "~/features/dashboard/facilityManagement//hooks/preregisterVisitor/usePreregisterVisitors";
import { ErrorMessage } from "~/components/ErrorMessage";
import { ProgressSpinner } from "primereact/progressspinner";
import { BsGrid1X2 } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";
import { PreregisterVisitorGridViewMain } from "../visitors/GridView/PreregisterVisitorGridViewMain";
import { useSearchFilter } from "../hooks/useSearchFilter";
import { useHosts } from "../hooks/preregisterVisitor/useHosts";
import { transformToDropdownOptions } from "../../../../utils/transformToDropdownOptions";
import { useAPIParams } from "../hooks/useAPIParams";

export default function Visitors() {
   const hostFilterRef = useRef(null);
   const [deleteDialog, setDeleteDialog] = useState(false);
   const [rowSelection, setRowSelection] = useState({});
   const [newPreregisterDialog, setNewPreregisterDialog] = useState(false);
   const [isGridView, setIsGridView] = useState(false)
   const [sorting, setSorting] = useState([])
   const [isSearch, setIsSearch] = useState(false)

   const { filterSearch, filterSearchRef, resetFilterSearch } = useSearchFilter()
   const hostQuery = useHosts()
   const searchHost = hostQuery?.data?.data.filter(host => {
      const searchValue = filterSearchRef.current?.value.toLowerCase()
      return host.first_name.toLowerCase().includes(searchValue) || host.last_name.toLowerCase().includes(searchValue)
   })

   const { params, setParams, setSearch, searchRef, resetSearch } = useAPIParams()

   const { status, data, error } = usePreregisterVisitors({
      perPage: params.pageSize,
      page: params.pageIndex,
      sort_by: sorting.length > 0 ? sorting[0].id : null,
      sort_order: sorting.length > 0 ? sorting[0].desc ? 'desc' : 'asc' : null,
      search: params.search,
      filter: params.filter,
      filter_by: params.filter_by
   })

   function openNewPreregisterDialog() {
      setNewPreregisterDialog(true);
   }

   function closeNewPreregisterDialog() {
      setNewPreregisterDialog(false);
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
            left={
               <h1 className="top-bar-title">Visitor <span className="hidden md:inline">(Pre Register)</span> Setup</h1>
            }
            right={
               <span className="p-input-icon-left search-client search">
                  <i className="pi pi-search" />
                  <InputText
                     ref={searchRef}
                     placeholder="Search your visitor here"
                     onKeyUp={(event) => setSearch(event)}
                     onChange={(event) => resetSearch(event)}
                  />
               </span>
            }
         />
         <div className="layout-content mb-0">
            <div>
               <AppTopbar
                  className="!px-0"
                  left={
                     <h1 className="mb-0" style={{ fontSize: "18px" }}>
                        List of Visitor (Pre Register)
                     </h1>
                  }
                  right={
                     <Button
                        icon={<IconUsers className="mr-2" />}
                        label="Add New Visitor"
                        onClick={openNewPreregisterDialog}
                     />
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
                           onChange={onBulkActionChange}
                           placeholder="Bulk Action"
                           dropdownIcon="fa-solid fa-caret-down"
                           itemTemplate={BulkActionOptionTemplate}
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
                           icon={<IconBuildingOne className="mr-2" />}
                           label="Host Filter"
                           className="p-button-outlined client-filter-btn"
                           onClick={(e) => hostFilterRef.current.toggle(e)}
                           aria-haspopup
                           aria-controls="host-filter-panel"
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
                              ? <PreregisterVisitorGridViewMain data={data} />
                              : (
                                 <div className="layout-content mt-0">
                                    <VisitorsTable
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
            ref={hostFilterRef}
            id="host-filter-panel"
            listData={transformToDropdownOptions(
               isSearch ? searchHost : hostQuery.data?.data,
               (item) => ({ label: `${item.first_name} ${item.last_name}`, value: item.id })
            )}
            onApplyFilter={(filterName) => {
               setParams(prev => ({ ...prev, filter: filterName, filter_by: 'host_id' }))
               hostFilterRef.current.hide()
            }}
            searchRef={filterSearchRef}
            onKeyUp={(event) => filterSearch(event, () => setIsSearch(true))}
            onChange={(event) => resetFilterSearch(event, () => setIsSearch(false))}
         />
         <DeleteVisitor
            bulkDelete
            isOpen={deleteDialog}
            onClose={closeDeleteDialog}
            ids={rowSelection}
         />
         <AddPreregisterDialog
            isOpen={newPreregisterDialog}
            onClose={closeNewPreregisterDialog}
         />
      </>
   );
}
