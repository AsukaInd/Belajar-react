import { useRef, useState } from "react";
import { Button } from "primereact/button";
import { DeleteVisitor } from "../../dashboard/visitors/DeleteVisitor";
import { useTranslation } from "react-i18next";
import { Table, IndeterminateCheckbox } from "~/components/Table";
import { IconPreviewOpen } from "~/components/icons/IconPreviewOpen";
import { IconDelete } from "~/components/icons/IconDelete";
import { Menu } from "primereact/menu";
import { formatDate } from "~/utils/formatDate";
import { VisitorDetailDialog } from "../../dashboard/visitors/VisitorDetailDialog";
import { VisitorStatus } from "../../dashboard/visitors/VisitorStatus";
import { Link } from "react-router-dom";

export function InspectionChapterTable({
   rowSelection,
   setRowSelection,
   data,
}) {
   const { t } = useTranslation();
   const [deleteDialog, setDeleteDialog] = useState(false);
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
         label: "Delete",
         icon: <IconDelete className="ml-auto flex-order-1" />,
         command() {
            openDeleteDialog();
         },
      },
   ];

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
         header: "ID",
         cell: ({ row }) => {
            return (
               <div className="flex align-items-center">
                  <Link
                     to={`${row?.id}`}
                     className="total-user-view-button"
                  >
                     {row.id}
                  </Link>
               </div>
            );
         },
      },
      {
         header: "Inspection",
         accessorKey: "inspection",
      },
      {
         header: "Name",
         accessorKey: "name",
      },
      {
         header: "type",
         accessorKey: "type",
      },
      {
         header: "description",
         accessorKey: "description",
      },
   ];

   return (
      <>
         <Table
            data={data?.data}
            columns={columns}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            style={{
               "--nth1Width": "50px",
               "--nth2Width": "50px",
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
      </>
   );
}
