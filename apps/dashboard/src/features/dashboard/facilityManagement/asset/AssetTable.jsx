import { useRef, useState, useEffect } from "react";
import { Button } from "primereact/button";
import { EditAssetDialog } from "./EditAssetDialog";
import { DeleteAsset } from "./DeleteAsset";
import { useTranslation } from "react-i18next";
import { Table, IndeterminateCheckbox } from "~/components/Table";
import { IconPreviewOpen } from "~/components/icons/IconPreviewOpen";
import { IconDelete } from "~/components/icons/IconDelete";
import { IconEdit } from "~/components/icons/IconEdit";
import { Menu } from "primereact/menu";
import { formatDate } from "~/utils/formatDate";
import { sliceText } from "~/utils/sliceText";
import { classNames } from "primereact/utils";
import { AssetFormDialog } from "./AssetFormDialog";
import { useChangeAssetStatus } from '~/features/dashboard/facilityManagement/hooks/asset/useChangeAssetStatus'
import { Toast } from "primereact/toast";
import { FaChevronDown } from "react-icons/fa";

export function AssetTable(props) {

   const {
      rowSelection,
      setRowSelection,
      data,
      setPagination,
      pageIndex,
      pageSize,
      pageCount,
      from,
      to
   } = props

   const toast = useRef(null);
   const { t } = useTranslation();
   const [editAsset, setEditAsset] = useState(false);
   const [deleteDialog, setDeleteDialog] = useState(false);
   const [isView, setIsView] = useState(false);
   const selected = useRef(null);
   const statusMenuRef = useRef(null);
   const menu = useRef(null);

   const changeStatus = useChangeAssetStatus({
      onError() {
         toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "Unknown error",
            life: 3000,
         });
      }
   })

   const items = [
      {
         label: "Detail",
         icon: <IconPreviewOpen className="ml-auto flex-order-1" />,
         command() {
            toggleIsView();
         },
      },
      {
         label: "Edit",
         icon: <IconEdit className="ml-auto flex-order-1" />,
         command() {
            openEditAssetDialog();
         },
      },
      {
         label: "Delete",
         icon: <IconDelete className="ml-auto flex-order-1" />,
         command() {
            openDeleteDialog();
         },
      },
   ];

   function openEditAssetDialog() {
      setEditAsset(true);
   }

   function closeEditAssetDialog() {
      setEditAsset(false);
   }

   function openDeleteDialog() {
      setDeleteDialog(true);
   }

   function closeDeleteDialog() {
      setDeleteDialog(false);
   }

   function toggleIsView() {
      setIsView((prev) => !prev);
   }

   const columns = [
      {
         id: "select",
         header: ({ table }) => (
            <IndeterminateCheckbox
               {...{
                  checked: table.getIsAllRowsSelected(),
                  indeterminate: table.getIsSomeRowsSelected(),
                  onChange: table.getToggleAllRowsSelectedHandler(),
               }}
            />
         ),
         cell: ({ row }) => (
            <div>
               <IndeterminateCheckbox
                  {...{
                     checked: row.getIsSelected(),
                     indeterminate: row.getIsSomeSelected(),
                     onChange: row.getToggleSelectedHandler(),
                  }}
               />
            </div>
         ),
      },
      {
         header: "ID",
         accessorKey: "id",
         enableSorting: false,
      },
      {
         header: "Image",
         enableSorting: false,
         cell: ({ row }) => <img className="image" src={row.original.image} />,
      },
      {
         header: "QR Code",
         enableSorting: false,
         cell: ({ row }) => <img className="image" src={row.original.qr_code} />,
      },
      {
         header: "Name",
         cell: ({ row }) => <span>{sliceText({ text: row.original.name, limit: 10 })}</span>,
         enableSorting: false,
      },
      {
         header: "Status",
         accessorKey: "status",
         cell: ({ row }) => {
            const status = row.original.status;
            return (
               <div className="asset-status">
                  <span
                     className={classNames(
                        "asset-status-value",
                        status === "enable" ? "status-enable" : "status-disable"
                     )}
                  >
                     {status}
                  </span>
                  <Button
                     className="asset-status-button"
                     icon={
                        changeStatus.isLoading && changeStatus.variables.id === row.original.id
                           ? <i className="pi pi-spin pi-spinner"></i>
                           : <FaChevronDown />}
                     onClick={(event) => {
                        selected.current = null;
                        selected.current = row.original;
                        statusMenuRef.current?.toggle(event)
                     }}
                     aria-controls="status-menu"
                     aria-haspopup
                  />
               </div>
            );
         },
      },
      {
         header: "Type",
         accessorKey: "type",
      },
      {
         header: "Assigne To",
         accessorFn: (row) => `${row?.assignee?.first_name} ${row?.assignee?.last_name}`,
      },
      {
         header: "Location",
         accessorKey: "location",
      },
      {
         header: "Vendor",
         accessorFn: (row) => row?.vendor?.name,
      },
      {
         header: "Date Created",
         accessorFn: (row) => formatDate(row.created_at),
      },
      {
         header: "Date Updated",
         accessorFn: (row) => formatDate(row.updated_at),
      },
      {
         header: "Action",
         id: "action-button",
         cell: ({ row }) => (
            <Button
               icon={
                  <i
                     className="fa-solid fa-ellipsis"
                     style={{ color: "var(--secondary-menu-text-color)" }}
                  ></i>
               }
               className="p-button-rounded p-button-text"
               aria-label="Options"
               tooltip="More"
               onClick={(event) => {
                  selected.current = null;
                  selected.current = row.original;
                  menu.current.toggle(event);
               }}
               aria-haspopup
               aria-controls="more-options"
            />
         ),
      },
   ];

   const statusModel = [
      {
         label: "Set Enable",
         className: "set-enable",
         command: (data) => {
            if (selected.current) {
               changeStatus.mutate({ id: selected.current.id, status: 'enable' })
            }
         },
      },
      {
         label: "Set Disable",
         className: "set-disable",
         command: () => {
            if (selected.current) {
               changeStatus.mutate({ id: selected.current.id, status: 'disable' })
            }
         },
      },
   ];

   return (
      <>
         <Table
            tableName="Asset"
            data={data?.data}
            columns={columns}
            pageIndex={pageIndex}
            pageSize={pageSize}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            setPagination={setPagination}
            pageCount={pageCount}
            from={from}
            to={to}
            className="asset-table"
            totalStickyCol="sticky-col-4"
            style={{
               "--nth1Width": "50px",
               "--nth2Width": "70px",
               "--nth3Width": "110px",
               "--totalColumn": "12",
            }}
         />
         <Toast ref={toast} position="top-right" />
         <Menu
            style={{
               maxWidth: "125px",
            }}
            model={items}
            popup
            ref={menu}
            id="more-options"
         />
         <Menu
            popup
            model={statusModel}
            ref={statusMenuRef}
            id="status-menu"
            className="asset-status-menu"
         />
         <DeleteAsset
            isOpen={deleteDialog}
            onClose={closeDeleteDialog}
            id={selected.current?.id}
         />
         <AssetFormDialog
            isView
            isOpen={isView}
            onClose={toggleIsView}
            editData={selected?.current}
         />
         <EditAssetDialog
            isOpen={editAsset}
            onClose={closeEditAssetDialog}
            editData={selected?.current}
         />
      </>
   );
}
