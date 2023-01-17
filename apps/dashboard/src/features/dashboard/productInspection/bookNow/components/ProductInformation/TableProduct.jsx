import { useRef, useState, useEffect } from "react";
import { Button } from "primereact/button";
import { EditContactDialog } from "./EditContactDialog";
import { DeleteContact } from "./DeleteContact";
import { useTranslation } from "react-i18next";
import { IndeterminateCheckbox } from "~/components/Table";
import { IconPreviewOpen } from "~/components/icons/IconPreviewOpen";
import { IconDelete } from "~/components/icons/IconDelete";
import { IconEdit } from "~/components/icons/IconEdit";
import { Menu } from "primereact/menu";
import { formatDate } from "~/utils/formatDate";
import { sliceText } from "~/utils/sliceText";
import { classNames } from "primereact/utils";
import { ContactFormDialog } from "./ContactFormDialog";
import { useChangeAssetStatus } from "~/features/dashboard/facilityManagement/hooks/asset/useChangeAssetStatus";
import { Toast } from "primereact/toast";
import { FaChevronDown } from "react-icons/fa";
import { TableInspxt } from "~/components/product-inspection/TableInspxt";
import { Link } from "react-router-dom";
import { Table } from "./Table";
import { DeleteProduct } from "./DeleteProduct";

export default function TableProduct(props) {
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
   } = props;

   const toast = useRef(null);
   const { t } = useTranslation();
   const [editContact, setEditContact] = useState(false);
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
      },
   });

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
      setEditContact(true);
   }

   function closeEditAssetDialog() {
      setEditContact(false);
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
         header: "Picture",
         cell: ({ row }) => (
            <div className="flex gap-4 font-medium">
               <img
                  className="rounded h-8 mx-auto"
                  src="https://picsum.photos/id/17/50/50"
               />
            </div>
         ),
         enableSorting: false,
      },
      {
         header: "PO Number",
         cell: ({ row }) => <span>{row?.original?.po}</span>,
         enableSorting: true,
      },
      {
         header: "Product Name",
         cell: ({ row }) => <span>{row?.original?.product_name}</span>,
      },
      {
         header: "Quantity",
         cell: ({ row }) => <span>{row?.original?.qty_name}</span>,
      },
      {
         header: "Units",
         cell: ({ row }) => <span>{row?.original?.units}</span>,
      },
      {
         header: "Style No",
         cell: ({ row }) => <span>{row?.original?.style_no}</span>,
      },
      {
         header: "Action",
         id: "action-button",
         cell: ({ row }) => (
            <div className="flex gap-2">
               <div className="flex gap-2 p-2 rounded bg-gray-100 text-blue-500 cursor-pointer">
                  <img src="/icons/edit.svg" alt="pencil" className="my-auto" />
                  <span className="my-auto">Edit</span>
               </div>
               <div className="flex gap-2 p-2 rounded bg-gray-100 text-gray-900 cursor-pointer">
                  <img
                     src="/icons/Copy.svg"
                     alt="document"
                     className="my-auto"
                  />
                  <span className="my-auto">Duplicate</span>
               </div>
               <div
                  className="flex gap-2 p-2  rounded bg-red-100 text-red-500 cursor-pointer"
                  onClick={(event) => {
                     selected.current = null;
                     selected.current = row?.original;
                     menu.current.toggle(event);
                     openDeleteDialog()
                  }}
               >
                  <img
                     src="/icons/delete.svg"
                     alt="trash"
                     className="my-auto"
                  />
                  <span className="my-auto">Delete</span>
               </div>
            </div>
         ),
      },
   ];

   const statusModel = [
      {
         label: "Set Enable",
         className: "set-enable",
         command: (data) => {
            if (selected.current) {
               changeStatus.mutate({
                  id: selected.current.id,
                  status: "enable",
               });
            }
         },
      },
      {
         label: "Set Disable",
         className: "set-disable",
         command: () => {
            if (selected.current) {
               changeStatus.mutate({
                  id: selected.current.id,
                  status: "disable",
               });
            }
         },
      },
   ];

   return (
      <>
         <Table
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
            totalStickyCol="sticky-col-2"
            style={{
               "--nth1Width": "50px",
               "--nth2Width": "90px",
               "--nth3Width": "75px",
               "--nth4Width": "200px",
               "--totalColumn": "9",
            }}
         />
         <div className="w-full bg-white-fa p-4 mt-4 rounded">
            Total Quantity <b>32.841</b>
         </div>
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
         <DeleteProduct
            isOpen={deleteDialog}
            onClose={closeDeleteDialog}
            id={selected.current?.id}
         />
         <ContactFormDialog
            isView
            isOpen={isView}
            onClose={toggleIsView}
            editData={selected?.current}
         />
         <EditContactDialog
            isOpen={editContact}
            onClose={closeEditAssetDialog}
            editData={selected?.current}
         />
      </>
   );
}
