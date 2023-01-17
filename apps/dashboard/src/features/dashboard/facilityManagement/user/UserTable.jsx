import { useState } from "react";
import { Button } from "primereact/button";
import { EditUserDialog } from "./EditUserDialog";
import { ResetPasswordDialog } from "./ResetPasswordDialog";
import { DeleteUser } from "./DeleteUser";
import { useTranslation } from "react-i18next";
import { Table, IndeterminateCheckbox } from "~/components/Table";
import { IconEdit } from "~/components/icons/IconEdit";
import { IconDelete2 } from "~/components/icons/IconDelete2";
import { IconKey } from "~/components/icons/IconKey";

export function UserTable(props) {
   const {
      clientId,
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
   const [editUserDialog, setEditUserDialog] = useState(false);
   const [resetPasswordDialog, setResetPasswordDialog] = useState(false);
   const [deleteDialog, setDeleteDialog] = useState(false);
   const [selected, setSelected] = useState(null);

   function closeResetPasswordDialog() {
      setSelected(null);
      setResetPasswordDialog(false);
   }

   function openResetPasswordDialog(data) {
      setSelected(data);
      setResetPasswordDialog(true);
   }

   function closeEditUserDialog() {
      setSelected(null);
      setEditUserDialog(false);
   }

   function openEditUserDialog(data) {
      setSelected(data);
      setEditUserDialog(true);
   }

   function openDeleteDialog(data) {
      setSelected(data);
      setDeleteDialog(true);
   }

   function closeDeleteDialog() {
      setSelected(null);
      setDeleteDialog(false);
   }

   const columns = [
      {
         id: "select",
         header: ({ table }) => (
            <IndeterminateCheckbox
               {...{
                  checked: table.getIsAllRowsSelected(),
                  indeterminate: table.getIsSomeRowsSelected(),
                  onChange: table.getToggleAllRowsSelectedHandler(),
               }}
            />
         ),
         cell: ({ row }) => (
            <div>
               <IndeterminateCheckbox
                  {...{
                     checked: row.getIsSelected(),
                     indeterminate: row.getIsSomeSelected(),
                     onChange: row.getToggleSelectedHandler(),
                  }}
               />
            </div>
         ),
      },
      {
         header: "First Name",
         accessorKey: "first_name",
         enableSorting: false,
      },
      {
         header: "Last Name",
         accessorKey: "last_name",
         enableSorting: false,
      },
      {
         accessorKey: "type",
         header: "Type",
         enableSorting: false,
      },
      {
         accessorKey: "city",
         header: "City",
         enableSorting: false,
      },
      {
         accessorKey: "country",
         header: "Country",
         enableSorting: false,
      },
      {
         accessorKey: "phone",
         header: "Phone",
         enableSorting: false,
      },
      {
         accessorKey: "email",
         header: "Email",
         enableSorting: false,
      },
      {
         header: "Action",
         id: "action-button",
         cell: ({ row }) => (
            <div className="user-table-btn">
               <Button
                  icon={<IconEdit className="mr-2" />}
                  className="btn-edit"
                  label="Edit"
                  onClick={() => openEditUserDialog(row.original)}
               />
               <Button
                  icon={<IconDelete2 className="mr-2" />}
                  className="mx-3 btn-delete"
                  label="Delete"
                  onClick={() => openDeleteDialog(row.original)}
               />
               <Button
                  icon={<IconKey className="mr-2" />}
                  className="btn-reset-password"
                  label="Reset Password"
                  onClick={() => openResetPasswordDialog(row.original)}
               />
            </div>
         ),
      },
   ];

   return (
      <>
         <Table
            tableName="User"
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
            style={{
               "--nth1Width": "50px",
               "--nth2Width": "100px",
               "--nth2-font-weight": "normal",
               "--totalColumn": "9",
            }}
         />
         <EditUserDialog
            isOpen={editUserDialog}
            onClose={closeEditUserDialog}
            editUserData={selected}
            userId={selected?.id}
            clientId={clientId}
         />
         <ResetPasswordDialog
            isOpen={resetPasswordDialog}
            onClose={closeResetPasswordDialog}
            userId={selected?.id}
            clientId={clientId}
         />
         <DeleteUser
            isOpen={deleteDialog}
            onClose={closeDeleteDialog}
            userId={selected?.id}
            clientId={clientId}
         />
      </>
   );
}
