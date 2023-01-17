import { useRef, useState, useEffect } from "react";
import { Button } from "primereact/button";
import { EditClientDialog } from "./EditClientDialog";
import { DeleteClient } from "./DeleteClient";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Table, IndeterminateCheckbox } from "~/components/Table";
import { IconPreviewOpen } from "~/components/icons/IconPreviewOpen";
import { IconDelete } from "~/components/icons/IconDelete";
import { IconEdit } from "~/components/icons/IconEdit";
import { Menu } from "primereact/menu";

export function ClientTable(props) {
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

   const { t } = useTranslation();
   const [editClientDialog, setEditClientDialog] = useState(false);
   const [deleteDialog, setDeleteDialog] = useState(false);
   const [isView, setIsView] = useState(false);
   const selected = useRef(null);
   const [reactiveSelected, setReactiveSelected] = useState(null);
   const menu = useRef(null);

   useEffect(() => {
      if (reactiveSelected) {
         setReactiveSelected(
            data.data.filter(
               (updatedData) => updatedData.id === reactiveSelected?.id
            )[0]
         );
      }
   }, [data]);

   const items = [
      {
         label: "Edit",
         icon: <IconEdit className="ml-auto flex-order-1" />,
         command() {
            openEditClientDialog();
         },
      },
      {
         label: "View",
         icon: <IconPreviewOpen className="ml-auto flex-order-1" />,
         command() {
            openEditClientDialog();
            setIsView(true);
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

   function openEditClientDialog() {
      setEditClientDialog(true);
      setReactiveSelected(selected.current);
   }

   function closeEditClientDialog() {
      selected.current = null;
      setReactiveSelected(null);
      setEditClientDialog(false);
      setIsView(false);
   }

   function openDeleteDialog() {
      setDeleteDialog(true);
   }

   function closeDeleteDialog() {
      selected.current = null;
      setReactiveSelected(null);
      setDeleteDialog(false);
   }

   function updateIsView() {
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
         header: "Company Name",
         cell: ({ row }) => {
            const value = row.original;
            return (
               <div className="flex align-items-center">
                  <img
                     className="border-circle mr-3"
                     width="24"
                     height="24"
                     src={value.profile_image}
                  />
                  <span>{value.company_name}</span>
               </div>
            );
         },
      },
      {
         header: "ID",
         accessorFn: (row) => row.id,
         enableSorting: false,
      },
      {
         header: "Industry",
         accessorKey: "industry_type",
      },
      {
         accessorKey: "city",
         header: "City",
      },
      {
         accessorKey: "country",
         header: "Country",
      },
      {
         header: "Site Count",
         accessorFn: (row) => row.sites?.length ?? 0,
      },
      {
         accessorKey: "phone",
         header: "Phone No",
         enableSorting: false,
      },
      {
         accessorKey: "email",
         header: "Email",
         enableSorting: false,
      },
      {
         header: "Total Users",
         cell: ({ row }) => {
            const total = row?.original?.total_users;
            return (
               <div className="flex align-items-center">
                  <span className="mr-3">{total ?? 0}</span>
                  <Link
                     to={`users?clientId=${row?.original?.id}`}
                     className="total-user-view-button"
                  >
                     <IconPreviewOpen className="mr-1" />
                     View
                  </Link>
               </div>
            );
         },
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
            tableName="Client"
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
            className="client-table"
            style={{
               "--nth1Width": "50px",
               "--nth2Width": "225px",
               "--totalColumn": "11",
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
         <DeleteClient
            isOpen={deleteDialog}
            onClose={closeDeleteDialog}
            id={selected.current?.id}
         />
         <EditClientDialog
            isOpen={editClientDialog}
            onClose={closeEditClientDialog}
            editClientData={reactiveSelected}
            isView={isView}
            editForm={updateIsView}
         />
      </>
   );
}
