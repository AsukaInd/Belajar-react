import { UserFormDialog } from "./UserFormDialog";
import { useTranslation } from "react-i18next";
import { useUserForm } from "../hooks/user/useUserForm";

export function AddUserDialog({ isOpen, onClose, clientId, type }) {
   const { t } = useTranslation();
   const userForm = useUserForm({
      type,
      clientId,
      handleSuccess() {
         onClose();
      },
   });

   function save(newData) {
      userForm.mutate(newData);
   }

   function close() {
      onClose();
      userForm.reset();
   }

   return (
      <UserFormDialog
         passwordRequired
         isOpen={isOpen}
         onClose={close}
         save={save}
         loading={userForm.isLoading}
         error={userForm.error}
         status={userForm.status}
      />
   );
}
