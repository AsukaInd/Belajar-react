import { UserFormDialog } from "~/features/dashboard/facilityManagement/user/UserFormDialog";
import { useTranslation } from "react-i18next";
import { useMemberForm } from "~/features/dashboard/facilityManagement/hooks/members/useMemberForm";

export function EditMemberDialog({ isOpen, onClose, editMemberData }) {
   const { t } = useTranslation();
   const memberForm = useMemberForm({
      handleSuccess() {
         onClose();
      },
      isUpdate: true,
   });

   function save(newMemberData) {
      memberForm.mutate({ updateMemberData: newMemberData });
   }

   return (
      <UserFormDialog
         title="Edit member"
         editData={editMemberData}
         isOpen={isOpen}
         onClose={onClose}
         save={save}
         loading={memberForm.isLoading}
         error={memberForm.error}
         status={memberForm.status}
      />
   );
}
