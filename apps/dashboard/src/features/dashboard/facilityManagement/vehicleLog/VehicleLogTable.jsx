import { useRef, useState } from "react";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import { Table, IndeterminateCheckbox } from "~/components/Table";
import { IconPreviewOpen } from "~/components/icons/IconPreviewOpen";
import { IconDelete } from "~/components/icons/IconDelete";
import { Menu } from "primereact/menu";
import { formatDate } from "~/utils/formatDate";
import { DeleteVehicleLog } from "./DeleteVehicleLog";
import { sliceText } from "~/utils/sliceText";
import { VehicleLogDetail } from "./VehicleLogDetail";
import { VehicleEndDetail } from "./VehicleEndDetail";

export function VehicleLogTable(props) {
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
   const [endDetailVehicle, setEndDetailVehicle] = useState(false);
   const [startDetailVehicle, setStartDetailVehicle] = useState(false);
   const selected = useRef(null);
   const end_menu = useRef(null);
   const start_menu = useRef(null);

   const start_items = [
      {
         label: "Detail",
         icon: <IconPreviewOpen className="ml-auto flex-order-1" />,
         command() {
            openStartDetailVehicle();
         },
      },
   ];

   const end_items = [
      {
         label: "Detail",
         icon: <IconPreviewOpen className="ml-auto flex-order-1" />,
         command() {
            openEndDetailVehicle();
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

   function openStartDetailVehicle() {
      setStartDetailVehicle(true);
   }

   function closeStartDetailDialog() {
      setStartDetailVehicle(false);
   }

   function openEndDetailVehicle() {
      setEndDetailVehicle(true);
   }

   function closeEndDetailDialog() {
      setEndDetailVehicle(false);
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
         cell: ({ row }) => {
            if (row.original.files?.length === 0) return null

            return (
               <img
                  className="rounded-md object-cover h-[32px] w-[32px]"
                  src={row.original.files[0]}
               />
            )
         },
         enableSorting: false,
      },
      {
         header: "In Driver",
         accessorKey: "in_driver",
         enableSorting: false,
      },
      {
         header: "Out Driver",
         accessorKey: "out_driver",
         enableSorting: false,
      },
      {
         header: "In Date",
         accessorFn: (row) => row?.in_date ? formatDate(row?.in_date) : '',
      },
      {
         header: "Out Date",
         accessorFn: (row) => row?.out_date ? formatDate(row?.out_date) : '',
      },
      {
         header: "Company",
         accessorKey: "company",
      },
      {
         header: "Site",
         accessorKey: "site",
      },
      {
         header: "License Plate",
         accessorKey: "license_plate",
      },
      {
         header: "In Mileage",
         accessorKey: "in_mileage",
      },
      {
         header: "Out Mileage",
         accessorKey: "out_mileage",
      },
      {
         header: "Signed In By",
         accessorKey: "signed_in_by",
         // cell: ({ row }) => {
         //    const value = row.original;
         //    return (
         //       <div className="flex align-items-center">
         //          <img
         //             className="rounded-full mr-3"
         //             width="24"
         //             height="24"
         //             src={value.signed_in?.image}
         //          />
         //          <span className="text-[#005AA6]">{value.signed_in?.name}</span>
         //       </div>
         //    );
         // },
      },
      {
         header: "Signed Out By",
         accessorKey: "signed_out_by",
         // cell: ({ row }) => {
         //    const value = row.original;
         //    return (
         //       <div className="flex align-items-center">
         //          <img
         //             className="border-circle mr-3"
         //             width="24"
         //             height="24"
         //             src={value.signed_out?.image}
         //          />
         //          <span className="text-[#005AA6]">
         //             {value.signed_out?.name}
         //          </span>
         //       </div>
         //    );
         // },
      },
      {
         header: "In Notes",
         accessorFn: (row) => sliceText({ text: row?.in_notes }),
      },
      {
         header: "Out Notes",
         accessorFn: (row) => sliceText({ text: row?.out_notes }),
      },
      // {
      //    header: "Action",
      //    id: "action-button-2",
      //    cell: ({ row }) => (
      //       <Button
      //          icon={
      //             <i
      //                className="fa-solid fa-ellipsis"
      //                style={{ color: "var(--secondary-menu-text-color)" }}
      //             ></i>
      //          }
      //          className="p-button-rounded p-button-text"
      //          aria-label="Options"
      //          tooltip="More"
      //          onClick={(event) => {
      //             selected.current = null;
      //             selected.current = row.original;
      //             end_menu.current.toggle(event);
      //          }}
      //          aria-haspopup
      //          aria-controls="end-more-options"
      //       />
      //    ),
      // },
   ];

   return (
      <>
         <Table
            tableName="Vehicle log"
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
         <DeleteVehicleLog
            isOpen={deleteDialog}
            onClose={closeDeleteDialog}
            id={selected.current?.id}
         />
         <VehicleEndDetail
            isOpen={endDetailVehicle}
            onClose={closeEndDetailDialog}
            vehicleData={selected?.current}
         />
         <VehicleLogDetail
            isOpen={startDetailVehicle}
            onClose={closeStartDetailDialog}
            vehicleData={selected?.current}
         />
      </>
   );
}
