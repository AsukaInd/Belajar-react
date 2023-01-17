import { Link } from "react-router-dom";
import { formatDate } from "~/utils/formatDate";
import { TableInspxt } from "~/components/product-inspection/TableInspxt";

export default function ActiveOrdersTable(props) {
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
            return (
               <div className="flex align-items-center font-bold">
                  <Link to={`#`} className="total-user-view-button">
                     {/* {row?.original?.name} */}
                     Inspection
                  </Link>
               </div>
            );
         },
      },
      {
         header: "Project Name",
         // accessorKey: "project_name",
         cell: ({ row }) => {
            return <span>Black Stone Inspection</span>;
         },
         enableSorting: false,
      },
      {
         header: "Expeted Earning",
         // accessorKey: "expeted_earning",
         cell: ({ row }) => {
            return <span>$24.000</span>;
         },
         enableSorting: false,
      },
      {
         header: "Net Income",
         // accessorKey: "net_income",
         cell: ({ row }) => {
            return <span>$24.000</span>;
         },
         enableSorting: false,
      },
      {
         header: "Deposit Date",
         accessorFn: (row) => formatDate(row.created_at),
      },
      {
         header: "Withdrawn",
         accessorFn: (row) => formatDate(row.updated_at),
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
