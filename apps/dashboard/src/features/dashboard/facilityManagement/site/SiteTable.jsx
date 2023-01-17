import { useRef, useState, useEffect } from "react";
import { Button } from "primereact/button";
import { EditSiteDialog } from "./EditSiteDialog";
import { DeleteSite } from "./DeleteSite";
import { useTranslation } from "react-i18next";
import { formatDate } from "~/utils/formatDate";
import { Menu } from "primereact/menu";
import { Table, IndeterminateCheckbox } from "~/components/Table";
import { IconEdit } from "~/components/icons/IconEdit";
import { IconDelete } from "~/components/icons/IconDelete";
import { Link } from "react-router-dom";
import { IconLocation } from "~/components/icons/IconLocation";

export function SiteTable(props) {
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
   const [editSiteDialog, setEditSiteDialog] = useState(false);
   const [deleteDialog, setDeleteDialog] = useState(false);

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
            openEditSiteDialog();
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

   function openEditSiteDialog() {
      setEditSiteDialog(true);
      setReactiveSelected(selected.current);
   }

   function closeEditSiteDialog() {
      selected.current = null;
      setEditSiteDialog(false);
      setReactiveSelected(null);
   }

   function openDeleteDialog() {
      setDeleteDialog(true);
   }

   function closeDeleteDialog() {
      selected.current = null;
      setReactiveSelected(null);
      setDeleteDialog(false);
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
         header: "Name",
         accessorKey: "site_name",
         cell: ({ row }) => {
            const value = row.original;
            return (
               <div className="flex align-items-center">
                  <img
                     className="rounded-full object-cover mr-3 h-[24px] w-[24px]"
                     src={value.image}
                  />
                  <span>{value.site_name}</span>
               </div>
            );
         },
      },
      {
         header: "ID",
         accessorKey: "id",
         enableSorting: false
      },
      {
         header: "Tour Stops",
         accessorKey: "tour_stops",
         enableSorting: false,
         cell: ({ row }) => {
            const total = row?.original?.tour_stops.length;
            return (
               <div className="flex align-items-center">
                  <span className="mr-3">{total ?? 0}</span>
                  <Link
                     to={`tour-stops?siteId=${row?.original?.id}`}
                     className="total-user-view-button"
                  >
                     <IconLocation className="mr-1" />
                     Add Tour Stop
                  </Link>
               </div>
            );
         },
      },
      {
         header: "City",
         accessorKey: "city",
         enableSorting: false,
      },
      {
         header: "Country",
         accessorKey: "country",
         enableSorting: false,
      },
      {
         header: "Date Created",
         accessorKey: "created_at",
         enableSorting: false,
         accessorFn: (row) => formatDate(row.created_at),
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
            tableName="Site"
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
         <EditSiteDialog
            isOpen={editSiteDialog}
            onClose={closeEditSiteDialog}
            editData={reactiveSelected}
         />
         <DeleteSite
            isOpen={deleteDialog}
            onClose={closeDeleteDialog}
            id={selected?.current?.id}
         />
      </>
   );
}
