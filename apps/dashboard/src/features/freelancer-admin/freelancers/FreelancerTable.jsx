import { useTranslation } from "react-i18next";
import { Table } from "~/components/Table";
import { API_BASE_URL } from "../../../config/apiConfig";

export function FreelancerTable(props) {

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
                     src={`${API_BASE_URL}/${value.photo}`}
                  />
                  <span style={{ color: "var(--primary-color)" }}>
                     {value.first_name} {value.last_name}
                  </span>
               </div>
            );
         },
      },
      {
         header: "Username",
         accessorKey: "username",
         enableSorting: false,
      },
      {
         header: "Email",
         accessorKey: "email",
         enableSorting: false,
      },
      {
         header: "Phone Number",
         accessorKey: "phone_number",
         enableSorting: false,
      },
      {
         header: "Mobile Number",
         accessorKey: "mobile_number",
         enableSorting: false,
      },
   ];

   return (
      <>
         <Table
            tableName="Freelancers"
            data={data?.data}
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
