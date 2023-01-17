import { useRef, useState } from "react";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import { Table } from "~/components/Table";
import { IconPreviewOpen } from "~/components/icons/IconPreviewOpen";
import { IconDelete } from "~/components/icons/IconDelete";
import { Menu } from "primereact/menu";
import { DeleteVisitorLog } from "./DeleteVisitorLog";
import { VisitorLogDetail } from "./VisitorLogDetail";
import { sliceText } from "~/utils/sliceText";
import { WalkInsVisitorDetail } from "./WalkInsVisitorDetail";
import { CheckoutDialog } from "./CheckoutDialog";
import { formatDate } from "~/utils/formatDate";

export function VisitorLogTable(props) {

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
   const [deleteDialog, setDeleteDialog] = useState(false);
   const [endDetailVisitor, setEndDetailVisitor] = useState(false);
   const [startDetailVisitor, setStartDetailVisitor] = useState(false);
   const [isOpenCheckoutDialog, setIsOpenCheckoutDialog] = useState(false)
   const selected = useRef(null);
   const end_menu = useRef(null);
   const start_menu = useRef(null);

   const start_items = [
      {
         label: "Detail",
         icon: <IconPreviewOpen className="ml-auto flex-order-1" />,
         command() {
            openStartDetailVisitor();
         },
      },
      // {
      //    label: "Checkout",
      //    icon: <FaCheckCircle className="ml-auto text-blue-2 flex-order-1" />,
      //    command() {
      //       openCheckoutDialog()
      //    },
      // },
   ];

   const end_items = [
      {
         label: "Detail",
         icon: <IconPreviewOpen className="ml-auto flex-order-1" />,
         command() {
            openEndDetailVisitor();
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

   function openCheckoutDialog() {
      setIsOpenCheckoutDialog(true)
   }

   function closeCheckoutDialog() {
      setIsOpenCheckoutDialog(false)
   }

   function openStartDetailVisitor() {
      setStartDetailVisitor(true);
   }

   function closeStartDetailDialog() {
      setStartDetailVisitor(false);
   }

   function openEndDetailVisitor() {
      setEndDetailVisitor(true);
   }

   function closeEndDetailDialog() {
      setEndDetailVisitor(false);
   }

   function openDeleteDialog() {
      setDeleteDialog(true);
   }

   function closeDeleteDialog() {
      setDeleteDialog(false);
   }

   const columns = [
      {
         header: "Action",
         id: "action-button-1",
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
                  start_menu.current.toggle(event);
               }}
               aria-haspopup
               aria-controls="start-more-options"
            />
         ),
      },
      {
         header: "ID",
         accessorKey: "id",
         enableSorting: false,
      },
      {
         header: "Image",
         cell: ({ row }) => (
            <img
               className="rounded-md h-[32px] w-[32px] object-cover"
               src={row.original.files[0]}
            />
         ),
         enableSorting: false,
      },
      {
         header: "First Name",
         accessorKey: "first_name",
         enableSorting: false,
      },
      {
         header: "Last Name",
         accessorKey: "last_name",
         enableSorting: false,
      },
      {
         header: "In Date",
         accessorFn: (row) => row?.date_in ? formatDate(row?.date_in) : '',
      },
      {
         header: "Company",
         accessorKey: "company",
      },
      {
         header: "ID Type",
         accessorFn: (row) => row.type.name
      },
      {
         header: "Destination",
         accessorKey: "destination",
      },
      // {
      //    header: "Host",
      //    accessorKey: "host",
      // },
      // {
      //    header: "Host Company",
      //    accessorKey: "host_company",
      // },
      {
         header: "Signed In By",
         cell: ({ row }) => {
            const value = row.original;
            return (
               <div className="flex align-items-center">
                  <img
                     className="rounded-full mr-3"
                     width="24"
                     height="24"
                     src={value.officer?.picture}
                  />
                  <span className="text-[#005AA6]">
                     {value.officer?.first_name} {value.officer?.last_name}
                  </span>
               </div>
            );
         },
      },
      {
         header: "In Notes",
         accessorFn: (row) => sliceText({ text: row.notes }),
      },
   ];

   return (
      <>
         <Table
            tableName="Visitor log"
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
            totalStickyCol="sticky-col-5"
            style={{
               "--nth1Width": "73px",
               "--nth2Width": "50px",
               "--nth3Width": "70px",
               "--nth4Width": "100px",
               "--totalColumn": "12",
            }}
         />
         <Menu
            style={{
               maxWidth: "125px",
            }}
            model={start_items}
            popup
            ref={start_menu}
            id="start-more-options"
         />
         <Menu
            style={{
               maxWidth: "125px",
            }}
            model={end_items}
            popup
            ref={end_menu}
            id="end-more-options"
         />
         <DeleteVisitorLog
            isOpen={deleteDialog}
            onClose={closeDeleteDialog}
            id={selected.current?.id}
         />
         <VisitorLogDetail
            isOpen={endDetailVisitor}
            onClose={closeEndDetailDialog}
            visitorData={selected?.current}
         />
         <WalkInsVisitorDetail
            isOpen={startDetailVisitor}
            onClose={closeStartDetailDialog}
            visitorData={selected?.current}
         />
         <CheckoutDialog
            isOpen={isOpenCheckoutDialog}
            onClose={closeCheckoutDialog}
         />
      </>
   );
}
