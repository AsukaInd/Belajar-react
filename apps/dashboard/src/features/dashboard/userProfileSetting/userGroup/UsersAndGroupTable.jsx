import { useTranslation } from "react-i18next";
import { Table, IndeterminateCheckbox } from "~/components/Table";
import { formatDate } from '~/utils/formatDate'
import { IconPrintLight } from '~/components/icons/IconPrintLight'
import { Dropdown } from 'primereact/dropdown';
import { useState, useRef } from 'react'
import { usePermissions } from '~/features/dashboard/userProfileSetting/hooks/usePermissions'
import { Button } from "primereact/button";
import { EditGroup } from './EditGroup'
import { UserStatus } from './UserStatus'
import { Menu } from "primereact/menu";
import { IconDelete } from "~/components/icons/IconDelete";
import { IconRemoteLight } from '~/components/icons/IconRemoteLight'
import { DeleteUser } from './DeleteUser'

export function UsersAndGroupTable(props) {
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
   const [isCancel, setIsCancel] = useState(false)

   const selected = useRef(null);
   const menuRef = useRef(null);

   const permissionOptions = [
      {label: 'Admin', value: 'admin'},
      {label: 'Billing Management', value: 'billing-management'},
   ];

   const menuItems = [
      {
         label: "Edit Group",
         icon: <IconRemoteLight className="ml-auto flex-order-1 w-[18px] h-[18px]" />,
         command() {},
      },
      {
         label: "Delete",
         icon: <IconDelete className="ml-auto flex-order-1" />,
         command() {
            openCancelDialog()
         },
      },
   ];

   const columns = [
      {
         header: "Name",
         accessorKey: "name",
         enableSorting: false,
      },
      {
         header: "Email",
         accessorKey: "email",
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
         cell: ({row}) => (
            <EditGroup group={row.original.group} />
         )
      },
      {
         header: "Status",
         accessorKey: "status",
         enableSorting: false,
         cell: ({row}) => (
            <UserStatus status={row.original.status} />
         )
      },
      {
         header: "Action",
         id: "action-button",
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
               aria-haspopup
               aria-controls="more-options"
               onClick={(event) => {
                  selected.current = null;
                  selected.current = row.original;
                  menuRef.current.toggle(event);
               }}
            />
         ),
      },
   ];

   function openCancelDialog() {
      setIsCancel(true);
   }

   function closeCancelDialog() {
      setIsCancel(false);
   }

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
               "--totalColumn": "6",
            }}
         />
         <Menu
            style={{
               maxWidth: "125px",
            }}
            model={menuItems}
            popup
            ref={menuRef}
            id="more-options"
         />
         <DeleteUser
            isOpen={isCancel}
            onClose={closeCancelDialog}
            id={selected.current?.id}
         />
      </>
   );
}
