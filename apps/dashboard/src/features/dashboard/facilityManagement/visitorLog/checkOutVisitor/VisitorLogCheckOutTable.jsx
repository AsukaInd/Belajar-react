import { useRef, useState } from "react";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import { Table } from "~/components/Table";
import { IconPreviewOpen } from "~/components/icons/IconPreviewOpen";
import { Menu } from "primereact/menu";
import { sliceText } from "~/utils/sliceText";
import { formatDate } from "~/utils/formatDate";
import { CheckOutVisitorDetail } from "./CheckOutVisitorDetail";

export function VisitorLogCheckOutTable(props) {

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
   const [startDetailVisitor, setStartDetailVisitor] = useState(false);
   const selected = useRef(null);
   const start_menu = useRef(null);

   const start_items = [
      {
         label: "Detail",
         icon: <IconPreviewOpen className="ml-auto flex-order-1" />,
         command() {
            openStartDetailVisitor();
         },
      },
   ];

   function openStartDetailVisitor() {
      setStartDetailVisitor(true);
   }

   function closeStartDetailDialog() {
      setStartDetailVisitor(false);
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
         header: "Out Date",
         accessorFn: (row) => row?.date_out ? formatDate(row?.date_out) : '',
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
         header: "Signed Out By",
         cell: ({ row }) => {
            const value = row.original;
            return (
               <div className="flex align-items-center">
                  <img
                     className="rounded-full mr-3"
                     width="24"
                     height="24"
                     src={value.signed_out?.picture}
                  />
                  <span className="text-[#005AA6]">
                     {value.signed_out?.first_name} {value.signed_out?.last_name}
                  </span>
               </div>
            );
         },
      },
      {
         header: "Out Notes",
         accessorFn: (row) => sliceText({ text: row.exit_notes }),
      },
   ];

   return (
      <>
         <Table
            tableName="Visitor log Checkout"
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
         <CheckOutVisitorDetail
            isOpen={startDetailVisitor}
            onClose={closeStartDetailDialog}
            visitorData={selected?.current}
         />
      </>
   );
}
