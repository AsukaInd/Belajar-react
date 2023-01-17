import { useTranslation } from "react-i18next";
import { Table, IndeterminateCheckbox } from "~/components/Table";
import { formatDate } from '~/utils/formatDate'
import { Button } from "primereact/button";
import { IconPrintLight } from '~/components/icons/IconPrintLight'

export function PaymentHistoryTable(props) {
   const { 
      data, 
      setPagination, 
      pageIndex, 
      pageSize, 
      pageCount,
      from,
      to
   } = props

   const { t } = useTranslation();

   const columns = [
      {
         header: "Order ID",
         accessorKey: "id",
         enableSorting: false,
      },
      {
         header: "Item",
         accessorKey: "item",
         enableSorting: false,
      },
      {
         header: "Date",
         accessorFn: (row) => formatDate(row.created_at),
         enableSorting: false,
      },
      {
         header: "Payment Method",
         accessorKey: "payment_method",
         enableSorting: false,
      },
      {
         header: "Order Total",
         cell: ({ row }) => (
            <div>
               <span className="text-[12px] text-[#61B15A] bg-[#F5FBF4] font-bold py-[3.5px] px-[8.5px] rounded-[6px]">
                  ${row.original.order_total}
               </span>
            </div>
         )
      },
      {
         header: "Action",
         id: "action-button",
         cell: () => (
            <div>
               <button 
                  className="border-none flex items-center text-[12px] rounded-[4px] py-[6px] cursor-pointer px-[8.5px] hover:brightness-[90%]"
               >
                  <IconPrintLight className="mr-[6px]" />
                  Print
               </button>
            </div>
         ),
      },
   ];

   return (
      <>
         <Table
            data={data?.data}
            columns={columns}
            pageIndex={pageIndex}
            pageSize={pageSize}
            setPagination={setPagination}
            pageCount={pageCount}
            from={from}
            to={to}
            style={{
               "--totalColumn": "6",
            }}
         />
      </>
   );
}
