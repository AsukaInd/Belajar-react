import { useTranslation } from "react-i18next";
import { Table, IndeterminateCheckbox } from "~/components/Table";
import { formatDate } from '~/utils/formatDate'
import { Button } from "primereact/button";
import { IconPrintLight } from '~/components/icons/IconPrintLight'
import { Dropdown } from 'primereact/dropdown';
import { useState } from 'react'
import { usePermissions } from '~/features/dashboard/userProfileSetting/hooks/usePermissions'

export function PermissionTable(props) {
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

   const permissionsQuery = usePermissions()

   const [permission, setPermission] = useState("")

   const permissionOptions = [
      {label: 'Admin', value: 'admin'},
      {label: 'Billing Management', value: 'billing-management'},
   ];

   const columns = [
      {
         header: "Name",
         accessorKey: "name",
         enableSorting: false,
      },
      {
         header: "Company Name",
         accessorKey: "company_name",
         enableSorting: false,
      },
      {
         header: "Group",
         accessorKey: "group",
         enableSorting: false,
      },
      {
         header: "Status",
         accessorKey: "status",
         enableSorting: false,
      },
      {
         header: "Set Permission",
         id: "action-button",
         cell: () => (
            <div>
               <Dropdown 
                  disabled={permissionsQuery.isLoading}
                  value={permission} 
                  options={permissionsQuery?.data?.data} 
                  onChange={(e) => setPermission(e.value)} 
                  placeholder="Select Permission"
               />
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
               "--nth2Width": "200px",
               "--totalColumn": "5",
            }}
         />
      </>
   );
}
