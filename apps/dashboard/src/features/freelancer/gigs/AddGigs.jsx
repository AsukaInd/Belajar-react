import { GigsForm } from "./GigsForm";
import { useTranslation } from "react-i18next";
import { useGigsForm } from "../hooks/gigs/useGigsForm";

export function AddGigs({ isOpen, onClose }) {
   const { t } = useTranslation();
   const gigsForm = useGigsForm({
      handleSuccess() {
         onClose();
      },
   });

   function save(newData) {
      gigsForm.mutate(newData);
   }

   return (
      <GigsForm
         title="Add new gigs"
         isOpen={isOpen}
         onClose={() => {
            onClose();
            gigsForm.reset();
         }}
         save={save}
         loading={gigsForm.isLoading}
         error={gigsForm.error}
         status={gigsForm.status}
      />
   );
}