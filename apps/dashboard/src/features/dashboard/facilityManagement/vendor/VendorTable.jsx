import { useRef, useState, useEffect } from "react";
import { Button } from "primereact/button";
import { EditVendorDialog } from "./EditVendorDialog";
import { DeleteVendor } from "./DeleteVendor";
import { useTranslation } from "react-i18next";
import { Table, IndeterminateCheckbox } from "~/components/Table";
import { IconPreviewOpen } from "~/components/icons/IconPreviewOpen";
import { IconDelete } from "~/components/icons/IconDelete";
import { IconEdit } from "~/components/icons/IconEdit";
import { Menu } from "primereact/menu";
import { formatDate } from "~/utils/formatDate";
import { classNames } from "primereact/utils";
import { VendorFormDialog } from "./VendorFormDialog";

export function VendorTable(props) {

   const {
      rowSelection,
      setRowSelection,
      data,
      setPagination,
      pageIndex,
      pageSize,
      pageCount,
      from,
      to,
      sorting,
      setSorting
   } = props

   const { t } = useTranslation();
   const [editVendor, setEditVendor] = useState(false);
   const [deleteDialog, setDeleteDialog] = useState(false);
   const [isView, setIsView] = useState(false);
   const selected = useRef(null);
   const menu = useRef(null);

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
            openEditVendorDialog();
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

   function openEditVendorDialog() {
      setEditVendor(true);
   }

   function closeEditVendorDialog() {
      setEditVendor(false);
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
         header: "Vendor Name",
         accessorKey: "name",
         cell: ({ row }) => {
            const value = row.original;
            return (
               <div className="flex align-items-center">
                  <img
                     className="border-circle mr-3 w-[24px] h-[24px]"
                     src={value.image}
                  />
                  <span style={{ color: "var(--primary-color)" }}>
                     {value.name}
                  </span>
               </div>
            );
         },
      },
      {
         header: "Vendor ID",
         accessorKey: "id",
         enableSorting: false,
      },
      {
         header: "Asset",
         accessorFn: (row) => {
            if (row.assets?.length === 0) return null

            return row.assets[0].name
         },
         enableSorting: false,
      },
      {
         header: "Location",
         accessorKey: "location",
         cell: ({ getValue }) => {
            const value = getValue();
            return (
               <span style={{ color: "var(--primary-color)" }}>{value}</span>
            );
         },
      },
      {
         header: "Date Created",
         enableSorting: false,
         accessorFn: (row) => formatDate(row.created_at),
      },
      {
         header: "Date Updated",
         enableSorting: false,
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

   return (
      <>
         <Table
            tableName="Vendor"
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
            sorting={sorting}
            setSorting={setSorting}
            style={{
               "--nth1Width": "50px",
               "--nth2Width": "225px",
               "--totalColumn": "8",
            }}
         />
         <Menu
            style={{
               maxWidth: "125px",
            }}
            model={items}
            popup
            ref={menu}
            id="more-options"
         />
         <DeleteVendor
            isOpen={deleteDialog}
            onClose={closeDeleteDialog}
            id={selected.current?.id}
         />
         <VendorFormDialog
            isView
            isOpen={isView}
            onClose={toggleIsView}
            editData={selected?.current}
         />
         <EditVendorDialog
            isOpen={editVendor}
            onClose={closeEditVendorDialog}
            editData={selected?.current}
         />
      </>
   );
}
