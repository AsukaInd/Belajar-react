import { useRef, useState, useEffect } from "react";
import { Button } from "primereact/button";
import { EditTourStopDialog } from "./EditTourStopDialog";
import { DeleteTourStop } from "./DeleteTourStop";
import { useTranslation } from "react-i18next";
import { Table, IndeterminateCheckbox } from "~/components/Table";
import { IconPreviewOpen } from "~/components/icons/IconPreviewOpen";
import { IconDelete } from "~/components/icons/IconDelete";
import { IconEdit } from "~/components/icons/IconEdit";
import { IconQRCodeScan } from "~/components/icons/IconQRCodeScan";
import { Menu } from "primereact/menu";
import { TourStopQRDialog } from "./TourStopQRDialog";
import { sliceText } from "../../../../utils/sliceText";

export function TourStopTable(props) {
   const {
      siteId,
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
   const [editTourStopDialog, setEditTourStopDialog] = useState(false);
   const [deleteDialog, setDeleteDialog] = useState(false);
   const [tourStopQR, setTourStopQR] = useState(false);
   const [isView, setIsView] = useState(false);
   const selected = useRef(null);
   const menu = useRef(null);

   const items = [
      {
         label: "Edit",
         icon: <IconEdit className="ml-auto flex-order-1" />,
         command() {
            setIsView(false);
            openEditTourStopDialog();
         },
      },
      {
         label: "View",
         icon: <IconPreviewOpen className="ml-auto flex-order-1" />,
         command() {
            openEditTourStopDialog();
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

   function openEditTourStopDialog() {
      setEditTourStopDialog(true);
   }

   function closeEditTourStopDialog() {
      setEditTourStopDialog(false);
   }

   function openTourStopQR() {
      setTourStopQR(true);
   }

   function closeTourStopQR() {
      setTourStopQR(false);
   }

   function openDeleteDialog() {
      setDeleteDialog(true);
   }

   function closeDeleteDialog() {
      selected.current = null;
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
                     onChange: row.getToggleSelectedHandler(row.id),
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
         cell: ({ row }) => (
            <img
               onClick={() => {
                  selected.current = null;
                  selected.current = row.original;
                  openTourStopQR()
               }}
               className="image cursor-pointer"
               src={row.original.qr_code}
            />
         ),
      },
      {
         header: "Name",
         accessorKey: "name",
         enableSorting: false,
      },
      {
         header: "Description",
         accessorFn: (tourStop) => sliceText({ text: tourStop.description, limit: 30 }),
         enableSorting: false,
      },
      {
         header: "Placement",
         accessorFn: (tourStop) => sliceText({ text: tourStop.placement, limit: 30 }),
         enableSorting: false,
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
         {
            Array.isArray(data?.data)
               ? (
                  <Table
                     tableName="Tour stop"
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
                     className="tour-stop"
                     totalStickyCol="sticky-col-4"
                     style={{
                        "--nth1Width": "50px",
                        "--nth2Width": "50px",
                        "--nth3Width": "70px",
                        "--totalColumn": "8",
                     }}
                  />

               )
               : <p className="text-center">Unknown Error</p>
         }
         <Menu
            style={{
               maxWidth: "125px",
            }}
            model={items}
            popup
            ref={menu}
            id="more-options"
         />
         <DeleteTourStop
            siteId={siteId}
            isOpen={deleteDialog}
            onClose={closeDeleteDialog}
            id={selected.current?.id}
         />
         <EditTourStopDialog
            siteId={siteId}
            isOpen={editTourStopDialog}
            onClose={closeEditTourStopDialog}
            editData={selected?.current}
            isView={isView}
         />
         <TourStopQRDialog
            isOpen={tourStopQR}
            onClose={closeTourStopQR}
            QRData={selected?.current}
         />
      </>
   );
}
