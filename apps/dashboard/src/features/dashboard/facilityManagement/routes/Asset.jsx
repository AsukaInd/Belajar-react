import { BulkActionOptionTemplate } from "~/components/BulkActionOptionTemplate";
import { IconDelete } from "~/components/icons/IconDelete";
import { AppTopbar } from "~/features/dashboard/layout/AppTopbar";
import { Toolbar } from "primereact/toolbar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { IconLocation } from "~/components/icons/IconLocation";
import { IconBuildingOne } from "~/components/icons/IconBuildingOne";
import { IconInbox } from "~/components/icons/IconInbox";
import { Dropdown } from "primereact/dropdown";
import { useRef, useState } from "react";
import { MenuFilter } from "~/components/MenuFilter";
import { DeleteAsset } from "~/features/dashboard/facilityManagement/asset/DeleteAsset";
import { AddAssetDialog } from "~/features/dashboard/facilityManagement/asset/AddAssetDialog";
import { AssetTable } from "~/features/dashboard/facilityManagement/asset/AssetTable";
import { useAssets } from '~/features/dashboard/facilityManagement/hooks/asset/useAssets'
import { ErrorMessage } from "~/components/ErrorMessage";
import { ProgressSpinner } from "primereact/progressspinner";
import { Divider } from 'primereact/divider';

export default function Asset() {
   const vendorFilterRef = useRef(null);
   const locationFilterRef = useRef(null);
   const [rowSelection, setRowSelection] = useState({});
   const [deleteDialog, setDeleteDialog] = useState(false);
   const [newAssetDialog, setNewAssetDialog] = useState(false);

   const [{ pageIndex, pageSize }, setPagination] = useState({ pageIndex: 0, pageSize: 10 })

   const {status, data, error} = useAssets({perPage: pageSize, page: pageIndex})

   function openNewAssetDialog() {
      setNewAssetDialog(true);
   }

   function closeNewAssetDialog() {
      setNewAssetDialog(false);
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
            left={<h1 className="top-bar-title">Assets Setup</h1>}
            right={
               <span className="p-input-icon-left search-client search">
                  <i className="pi pi-search" />
                  <InputText placeholder="Search your asset here" />
               </span>
            }
         />
         <div className="layout-content asset-page">
            <div>
               <Toolbar
                  left={
                     <h1 className="mb-0" style={{ fontSize: "18px" }}>
                        List of assets
                     </h1>
                  }
                  right={
                     <Button
                        icon={<IconInbox className="mr-2" />}
                        label="Add New Asset"
                        onClick={openNewAssetDialog}
                     />
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
                     <>
                        <Button
                           icon={<IconBuildingOne className="mr-2" />}
                           label="Vendor Filter"
                           className="mr-4 p-button-outlined client-filter-btn"
                           onClick={(e) => vendorFilterRef.current.toggle(e)}
                           aria-haspopup
                           aria-controls="vendor-filter-panel"
                        />
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
                     </>
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
                     <AssetTable
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
                  ) : <ErrorMessage className="vh-center" error={error} />
               }
            </div>
         </div>
         <MenuFilter
            ref={vendorFilterRef}
            id="vendor-filter-panel"
            listData={[
               "Stiedemann, Krajcik and Klocko",
               "Skiles PLC",
               "Russel, Koch and Muller"
            ]}
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
         <DeleteAsset
            bulkDelete
            isOpen={deleteDialog}
            onClose={closeDeleteDialog}
            ids={rowSelection}
         />
         <AddAssetDialog
            isOpen={newAssetDialog}
            onClose={closeNewAssetDialog}
         />
      </>
   );
}
