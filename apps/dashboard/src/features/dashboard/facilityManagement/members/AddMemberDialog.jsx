import { UserFormDialog } from "~/features/dashboard/facilityManagement/user/UserFormDialog";
import { useTranslation } from "react-i18next";
import { useMemberForm } from "~/features/dashboard/facilityManagement/hooks/members/useMemberForm";

export function AddMemberDialog({ isOpen, onClose }) {
   const { t } = useTranslation();
   const memberForm = useMemberForm({
      handleSuccess() {
         onClose();
      },
   });

   function save(newMemberData) {
      memberForm.mutate({ newMemberData });
   }

   return (
      <UserFormDialog
         title="Add member"
         isOpen={isOpen}
         onClose={onClose}
         save={save}
         loading={memberForm.isLoading}
         error={memberForm.error}
         status={memberForm.status}
      />
   );
}
