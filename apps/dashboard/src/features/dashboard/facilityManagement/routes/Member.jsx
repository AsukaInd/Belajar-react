import { useState } from "react";
import { MemberTable } from "~/features/dashboard/facilityManagement/members/MemberTable";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { AddMemberDialog } from "~/features/dashboard/facilityManagement/members/AddMemberDialog";
import { useTranslation } from "react-i18next";
import { useMembers } from "~/features/dashboard/facilityManagement/hooks/members/useMembers";

export default function Member() {
   const { t } = useTranslation();
   const [newMemberDialog, setNewMemberDialog] = useState(false);
   const { status, data, error } = useMembers();

   function closeNewMemberDialog() {
      setNewMemberDialog(false);
   }

   function openNewMemberDialog() {
      setNewMemberDialog(true);
   }

   return (
      <>
         <div className="layout-content">
            <Toolbar
               className="mb-4"
               left={
                  <div className="my-2">
                     <Button
                        label="Add member"
                        className="mr-2"
                        onClick={openNewMemberDialog}
                     />
                  </div>
               }
            />
            <MemberTable status={status} data={data?.data} error={error} />
         </div>
         <AddMemberDialog
            isOpen={newMemberDialog}
            onClose={closeNewMemberDialog}
         />
      </>
   );
}
