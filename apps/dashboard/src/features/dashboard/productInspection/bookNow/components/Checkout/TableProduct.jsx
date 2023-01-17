import { Table } from "./Table";

export default function TableProduct(props) {
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
         header: "Description",
         cell: ({ row }) => <span>Product Inspection (PM) Product A</span>,
         enableSorting: true,
      },
      {
         header: "Quantity",
         cell: ({ row }) => <span>1 man day</span>,
      },
      {
         header: "Unit Price",
         cell: ({ row }) => <span>USD 309</span>,
      },
      {
         header: "Total Price",
         cell: ({ row }) => <span className="font-bold">USD 309</span>,
      },
   ];

   return (
      <>
         <Table
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
            totalStickyCol="sticky-col-2"
            style={{
               "--nth1Width": "240px",
               "--totalColumn": "4",
            }}
         />
      </>
   );
}
