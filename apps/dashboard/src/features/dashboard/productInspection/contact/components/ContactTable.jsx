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

export default function ContactTable(props) {
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
         header: "Contact Name",
         cell: ({ row }) => (
            <div className="flex gap-4 font-medium">
               <img
                  className="rounded-full h-8"
                  src={`https://internal.inspxt.com/assets/images/${row.original.image}`}
                  />
               <span className="my-auto">
                  {row.original.contact_name}
               </span>
            </div>
         ),
         enableSorting: false,
      },
      {
         header: "First Name",
         cell: ({ row }) => <span>{row.original.first_name}</span>,
      },
      {
         header: "Last Name",
         cell: ({ row }) => <span>{row.original.last_name}</span>,
      },
      // {
      //    header: "Position",
      //    cell: ({ row }) => <span>Team Owner</span>,
      //    enableSorting: true,
      // },
      {
         header: "Phone Number",
         cell: ({ row }) => <span>{row.original.phone_number}</span>,
      },
      // {
      //    header: "Mobile Number",
      //    cell: ({ row }) => <span>(+33) 6 55 51 3035</span>,
      // },
      {
         header: "Email",
         cell: ({ row }) => <span>{row.original.email}</span>,
      },
      // {
      //    header: "Status",
      //    cell: ({ row }) => {
      //       const test = row.original.id % 2;
      //       return (
      //          <>
      //             {test === 0 ? (
      //                <span className="text-green-500 bg-green-100 font-medium p-2 rounded-lg">
      //                   Active{" "}
      //                </span>
      //             ) : (
      //                <span className="text-gray-600 bg-gray-100 font-medium p-2 rounded-lg">
      //                   Not Active{" "}
      //                </span>
      //             )}
      //          </>
      //       );
      //    },
      // },
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
         <TableInspxt
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
         <DeleteContact
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
