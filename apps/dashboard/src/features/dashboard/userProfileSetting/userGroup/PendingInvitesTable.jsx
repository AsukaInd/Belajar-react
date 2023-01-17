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
import { IconSendFill } from '~/components/icons/IconSendFill'
import { CancelInvitation } from './CancelInvitation'

export function PendingInvitesTable(props) {
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

   const [isDelete, setIsDelete] = useState(false)
   const selected = useRef(null);

   const columns = [
      {
         header: "Email",
         accessorKey: "email",
         enableSorting: false,
      },
      {
         header: "Date Invited",
         enableSorting: false,
         accessorFn: (row) => formatDate(row.created_at)
      },
      {
         header: "Status",
         accessorKey: "status",
         enableSorting: false,
      },
      {
         header: "Action",
         id: "action-button",
         cell: ({ row }) => (
            <div className="flex items-center gap-[16px]">
               <button 
                  className="border-none text-[#2854F6] bg-[#F4F6FE] flex items-center text-[12px] rounded-[4px] py-[6px] cursor-pointer px-[8.5px] hover:brightness-[90%]"
               >
                  <IconSendFill className="mr-[6px]" />
                  Send Invitation Again
               </button>
               <button 
                  className="border-none bg-[#F6E6E6] text-[#EB4646] flex items-center text-[12px] rounded-[4px] py-[6px] cursor-pointer px-[8.5px] hover:brightness-[90%]"
                  onClick={() => {
                     selected.current = null;
                     selected.current = row.original;
                     openDeleteDialog()
                  }}
               >
                  <IconDelete className="mr-[6px] h-[12px] w-[12px]" />
                  Cancel
               </button>
            </div>
         ),
      },
   ];

   function openDeleteDialog() {
      setIsDelete(true);
   }

   function closeDeleteDialog() {
      setIsDelete(false);
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
               "--nth2Width": "230px",
               "--totalColumn": "4",
            }}
         />
         <CancelInvitation
            isOpen={isDelete}
            onClose={closeDeleteDialog}
            id={selected.current?.id}
         />
      </>
   );
}
