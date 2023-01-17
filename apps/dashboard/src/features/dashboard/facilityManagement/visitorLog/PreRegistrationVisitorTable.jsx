import { useRef, useState } from "react";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import { Table } from "~/components/Table";
import { IconPreviewOpen } from "~/components/icons/IconPreviewOpen";
import { Menu } from "primereact/menu";
import { formatDate } from "~/utils/formatDate";
import { sliceText } from "~/utils/sliceText";

export function PreRegistrationVisitorTable({
   rowSelection,
   setRowSelection,
   data,
}) {
   const { t } = useTranslation();
   const selected = useRef(null);

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
               width="32"
               height="32"
               className="image rounded"
               src={row.original.image}
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
         accessorFn: (row) => formatDate(row.date_in),
      },
      {
         header: "Out Date",
         accessorFn: (row) => formatDate(row.out_date),
      },
      {
         header: "Company",
         accessorKey: "company",
      },
      {
         header: "ID Type",
         accessorKey: "id_type",
      },
      {
         header: "Destination",
         accessorKey: "destination",
      },
      {
         header: "Host",
         accessorKey: "host",
      },
      {
         header: "Host Company",
         accessorKey: "host_company",
      },
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
                     src={value.signed_in.image}
                  />
                  <span className="text-[#005AA6]">{value.signed_in.name}</span>
               </div>
            );
         },
      },
      {
         header: "Signed Out By",
         cell: ({ row }) => {
            const value = row.original;
            return (
               <div className="flex align-items-center">
                  <img
                     className="border-circle mr-3"
                     width="24"
                     height="24"
                     src={value.signed_out.image}
                  />
                  <span className="text-[#005AA6]">
                     {value.signed_out.name}
                  </span>
               </div>
            );
         },
      },
      {
         header: "In Notes",
         accessorFn: (row) => sliceText({ text: row.in_notes }),
      },
      {
         header: "Out Notes",
         accessorFn: (row) => sliceText({ text: row.out_notes }),
      },
      {
         header: "Action",
         id: "action-button-2",
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
                  end_menu.current.toggle(event);
               }}
               aria-haspopup
               aria-controls="end-more-options"
            />
         ),
      },
   ];

   return (
      <>
         <Table
            tableName="Pre-register visitor"
            data={data?.data}
            columns={columns}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            totalStickyCol="sticky-col-5"
            style={{
               "--nth1Width": "73px",
               "--nth2Width": "50px",
               "--nth3Width": "70px",
               "--nth4Width": "100px",
               "--totalColumn": "17",
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
      </>
   );
}
