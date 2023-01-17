import { UserFormDialog } from "./UserFormDialog";
import { useTranslation } from "react-i18next";
import { useUserForm } from "../hooks/user/useUserForm";

export function EditUserDialog(props) {
   const { isOpen, onClose, editUserData, clientId } = props;
   const { t } = useTranslation();
   const updateUser = useUserForm({
      clientId,
      isUpdate: true,
      handleSuccess() {
         onClose();
      },
   });

   function save(newData) {
      updateUser.mutate({ ...newData, clientId });
   }

   return (
      <UserFormDialog
         isOpen={isOpen}
         onClose={() => {
            onClose();
            updateUser.reset();
         }}
         save={save}
         editData={editUserData}
         loading={updateUser.isLoading}
         error={updateUser.error}
         status={updateUser.status}
      />
   );
}
