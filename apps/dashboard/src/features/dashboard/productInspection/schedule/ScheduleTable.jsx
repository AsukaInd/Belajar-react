import { Link } from "react-router-dom";
import { formatDate } from "~/utils/formatDate";
import { TableInspxt } from "~/components/product-inspection/TableInspxt";

export default function ScheduleTable(props) {
   console.log(props);
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

   const columns = [
      {
         header: "ID",
         accessorKey: "id",
         enableSorting: false,
      },
      {
         header: "Service Type",
         cell: ({ row }) => {
            return <span>Amazon FBA Inspection</span>;
         },
      },
      {
         header: "PO",
         // accessorKey: "project_name",
         cell: ({ row }) => {
            return <span>PO-00081</span>;
         },
      },
      {
         header: "Supplier",
         // accessorKey: "expeted_earning",
         cell: ({ row }) => {
            return <span>Supplier A</span>;
         },
      },
      {
         header: "Product Name",
         // accessorKey: "net_income",
         cell: ({ row }) => {
            return <span>Down Jacket - North Face</span>;
         },
      },
      {
         header: "Quantity",
         // accessorKey: "net_income",
         cell: ({ row }) => {
            return <span>8.109</span>;
         },
      },
      {
         header: "Inspector",
         cell: ({ row }) => (
            <div className="flex gap-4 font-medium">
               <img
                  className="rounded-full h-8"
                  src="https://picsum.photos/seed/picsum/50/50"
               />
               <span className="my-auto">Tyson Foods</span>
               {/* {sliceText({ text: row.original.name, limit: 16 })} */}
            </div>
         ),
         enableSorting: false,
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
            totalStickyCol="sticky-col-7"
            style={{
               "--nth3Width": "110px",
               "--totalColumn": "7",
            }}
         />
      </>
   );
}
