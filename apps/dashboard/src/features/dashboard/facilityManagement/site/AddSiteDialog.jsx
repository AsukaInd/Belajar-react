import { SiteFormDialog } from "./SiteFormDialog";
import { useTranslation } from "react-i18next";
import { useSiteForm } from "../hooks/site/useSiteForm";

export function AddSiteDialog({ isOpen, onClose }) {
   const { t } = useTranslation();
   const siteForm = useSiteForm({
      handleSuccess() {
         onClose();
      },
   });

   function save(newData) {
      siteForm.mutate(newData);
   }

   function close() {
      onClose();
      siteForm.reset();
   }

   return (
      <SiteFormDialog
         title="Add New Site"
         isOpen={isOpen}
         onClose={close}
         save={save}
         loading={siteForm.isLoading}
         error={siteForm.error}
         status={siteForm.status}
      />
   );
}
