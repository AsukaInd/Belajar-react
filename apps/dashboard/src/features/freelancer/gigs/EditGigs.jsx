import { useState } from "react";
import { GigsForm } from "./GigsForm";
import { useTranslation } from "react-i18next";
import { useGigsForm } from "../hooks/gigs/useGigsForm";

export function EditGigs({
   isOpen,
   onClose,
   editGigsData,
   isView,
   editForm,
}) {
   const { t } = useTranslation();
   const [error, setError] = useState(null);
   const gigsForm = useGigsForm({
      isEdit: true,
      handleSuccess() {
         setError(null);
         onClose();
      },
      config: {
         onError(error) {
            if (error.status >= 500) {
               setError(error.statusText);
            } else {
               setError(error.data.message);
            }
         },
      },
   });
   function save(newData) {
      gigsForm.mutate({ ...newData, id: editGigsData.id });
   }

   return (
      <GigsForm
         isView={isView}
         title={
            isView
               ? "View Gigs"
               : t("freelancer.gigs.dialog-edit-gigs-title")
         }
         isOpen={isOpen}
         onClose={onClose}
         save={save}
         editData={editGigsData}
         error={error}
         editForm={editForm}
         loading={gigsForm.isLoading}
      />
   );
}
