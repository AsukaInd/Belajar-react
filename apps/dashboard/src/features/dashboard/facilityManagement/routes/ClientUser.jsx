import { useState } from "react";
import { UserTable } from "../user/UserTable";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { AddUserDialog } from "../user/AddUserDialog";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUsers } from "../hooks/user/useUsers";
import { useClientUsers } from "../hooks/user/useClientUsers";
import { BulkActionOptionTemplate } from "~/components/BulkActionOptionTemplate";
import { Dropdown } from "primereact/dropdown";
import { IconDelete } from "~/components/icons/IconDelete";
import { AppTopbar } from "~/features/dashboard/layout/AppTopbar";
import { useClients } from "~/features/dashboard/facilityManagement/hooks/client/useClients";
import { IconUserPlus } from "~/components/icons/IconUserPlus";
import { DeleteUser } from "~/features/dashboard/facilityManagement/user/DeleteUser";
import { ProgressSpinner } from "primereact/progressspinner";
import { ErrorMessage } from "~/components/ErrorMessage";
import { Divider } from 'primereact/divider';
import { FaChevronLeft } from "react-icons/fa";

export default function ClientUserPage() {
   const { t } = useTranslation();
   const navigate = useNavigate();
   const [searchParams] = useSearchParams();
   const [newUserDialog, setNewUserDialog] = useState(false);
   const [deleteDialog, setDeleteDialog] = useState(false);
   const [rowSelection, setRowSelection] = useState({});
   const clientId = searchParams.get("clientId");

   const [{ pageIndex, pageSize }, setPagination] = useState({ pageIndex: 0, pageSize: 10 })

   const fullUsers = useUsers({ pageSize, page: pageIndex, config: { enabled: !clientId } });
   const userByClientId = useClientUsers({ clientId, config: { enabled: Boolean(clientId) } });

   const userQuery = clientId ? userByClientId : fullUsers

   const client = useClients({ id: clientId });

   function closeNewUserDialog() {
      setNewUserDialog(false);
   }

   function openNewUserDialog() {
      setNewUserDialog(true);
   }

   function openDeleteDialog() {
      setDeleteDialog(true);
   }

   function closeDeleteDialog() {
      setDeleteDialog(false);
   }

   function onBulkActionChange(event) {
      if (event.value === "delete") {
         openDeleteDialog();
      }
   }

   return (
      <>
         <AppTopbar
            left={
               <Button
                  style={{
                     background: "var(--secondary-lightest-color)",
                     color: "var(--primary-color)",
                  }}
                  icon={<FaChevronLeft className="mr-2" />}
                  label="Back to client list"
                  onClick={() => navigate("/dashboard/facilityManagement/client")}
               />
            }
            right={<h1 className="top-bar-title">Setup Users</h1>}
         />
         <div className="layout-content">
            <Toolbar
               left={
                  <div className="flex align-items-center">
                     {clientId && (
                        <>
                           <span className="mr-3 font-bold text-xl">
                              User for client:
                           </span>
                           <Button
                              loading={client.isLoading}
                              label={client.data?.data?.company_name}
                              className="p-button-outlined mr-3"
                              style={{
                                 background:
                                    "var(--secondary-lightest-color)",
                              }}
                           />
                        </>
                     )}
                     <Dropdown
                        options={[
                           {
                              label: "Delete",
                              value: "delete",
                              icon: <IconDelete />,
                           },
                        ]}
                        placeholder="Bulk Action"
                        dropdownIcon="fa-solid fa-caret-down"
                        itemTemplate={BulkActionOptionTemplate}
                        onChange={onBulkActionChange}
                     />
                  </div>
               }
               right={
                  <div className="my-2">
                     <Button
                        label="New User"
                        className="mr-2"
                        icon={<IconUserPlus className="mr-2" />}
                        onClick={openNewUserDialog}
                     />
                  </div>
               }
            />
            <Divider className="mt-2" />
            {
               userQuery.status === 'loading'
                  ? (
                     <div className="vh-center">
                        <ProgressSpinner strokeWidth={3} />
                     </div>
                  )
                  : userQuery.status === 'success'
                  ? (
                     <UserTable
                        clientId={clientId}
                        data={userQuery?.data}
                        rowSelection={rowSelection}
                        setRowSelection={setRowSelection}
                        pageIndex={pageIndex}
                        pageSize={pageSize}
                        setPagination={setPagination}
                        pageCount={userQuery?.data?.last_page}
                        from={userQuery?.data?.from}
                        to={userQuery?.data?.to}
                     />
                  )
                  : <ErrorMessage className="vh-center" error={userQuery.error} /> 
            }
         </div>

         <AddUserDialog
            clientId={clientId}
            isOpen={newUserDialog}
            onClose={closeNewUserDialog}
         />
         <DeleteUser
            bulkDelete
            isOpen={deleteDialog}
            onClose={closeDeleteDialog}
            ids={rowSelection}
            clientId={clientId}
         />
      </>
   );
}
