import { useTranslation } from "react-i18next";
import { Table } from "~/components/Table";
import { API_BASE_URL } from "../../../config/apiConfig";
import { sliceText } from "../../../utils/sliceText";

export function GigTable(props) {

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
         header: "Name",
         accessorKey: "name",
         enableSorting: false,
         cell: ({ row }) => {
            const value = row.original;
            return (
               <div className="flex align-items-center">
                  <img
                     className="border-circle mr-3"
                     width="24"
                     height="24"
                     src={`${API_BASE_URL}/${value.user.photo}`}
                  />
                  <span style={{ color: "var(--primary-color)" }}>
                     {value.user.first_name} {value.user.last_name}
                  </span>
               </div>
            );
         },
      },
      {
         header: "Email",
         accessorKey: "user.email",
         enableSorting: false,
      },
      {
         header: "Title",
         accessorKey: "title",
         enableSorting: false,
      },
      {
         header: "Description",
         accessorFn: (row) => sliceText({ text: row.description }),
         enableSorting: false,
      },
      {
         header: "Price",
         accessorFn: (row) => row.package_gig?.price_package ? `$${row.package_gig?.price_package}` : '-',
         enableSorting: false,
      },
   ];

   return (
      <>
         <Table
            tableName="Gigs"
            data={data?.data?.data}
            columns={columns}
            pageIndex={pageIndex}
            pageSize={pageSize}
            setPagination={setPagination}
            pageCount={pageCount}
            from={from}
            to={to}
            style={{
               "--nth1Width": "50px",
               "--nth2Width": "225px",
               "--totalColumn": "5",
            }}
         />
      </>
   );
}
