import { useRef, useState } from "react";
import { Button } from "primereact/button";
import { DeleteVisitor } from "./DeleteVisitor";
import { EditPreregisterDialog } from "./EditPreregisterDialog";
import { Table, IndeterminateCheckbox } from "~/components/Table";
import { IconPreviewOpen } from "~/components/icons/IconPreviewOpen";
import { IconDelete } from "~/components/icons/IconDelete";
import { Menu } from "primereact/menu";
import { formatDate } from "~/utils/formatDate";
import { VisitorDetailDialog } from "./VisitorDetailDialog";
import { IconEdit } from "~/components/icons/IconEdit";

export function VisitorsTable(props) {
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
   const [deleteDialog, setDeleteDialog] = useState(false);
   const [editDialog, setEditDialog] = useState(false);
   const [detailVisitor, setDetailVisitor] = useState(false);
   const selected = useRef(null);
   const menu = useRef(null);

   const items = [
      {
         label: "Detail",
         icon: <IconPreviewOpen className="ml-auto flex-order-1" />,
         command() {
            openDetailVisitor();
         },
      },
      {
         label: "Edit",
         icon: <IconEdit className="ml-auto flex-order-1" />,
         command() {
            openEditDialog();
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

   function openEditDialog() {
      setEditDialog(true);
   }

   function closeEditDialog() {
      setEditDialog(false);
   }

   function openDetailVisitor() {
      setDetailVisitor(true);
   }

   function closeDetailDialog() {
      setDetailVisitor(false);
   }

   function openDeleteDialog() {
      setDeleteDialog(true);
   }

   function closeDeleteDialog() {
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
         header: "Start Date",
         accessorKey: 'created_at',
         accessorFn: (row) => formatDate(row.start_date),
      },
      {
         header: "End Date",
         accessorFn: (row) => formatDate(row.end_date),
      },
      {
         header: "Host",
         accessorKey: "host_id",
         accessorFn: (row) => `${row.host?.first_name ?? ''} ${row.host?.last_name ?? ''}`
      },
      {
         header: "Site",
         accessorFn: (row) => row.site?.site_name,
         enableSorting: false,
      },
      {
         header: "Visitor",
         accessorKey: 'first_name',
         accessorFn: (row) => row?.first_name + " " + row?.last_name
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
            tableName="Visitor"
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
               "--nth2Width": "200px",
               "--totalColumn": "7",
            }}
         />
         <Menu
            style={{ maxWidth: "125px" }}
            model={items}
            popup
            ref={menu}
            id="more-options"
         />
         <DeleteVisitor
            isOpen={deleteDialog}
            onClose={closeDeleteDialog}
            id={selected.current?.id}
         />
         <VisitorDetailDialog
            isOpen={detailVisitor}
            onClose={closeDetailDialog}
            visitorData={selected?.current}
         />
         <EditPreregisterDialog
            isOpen={editDialog}
            onClose={closeEditDialog}
            editData={selected?.current}
         />
      </>
   );
}
