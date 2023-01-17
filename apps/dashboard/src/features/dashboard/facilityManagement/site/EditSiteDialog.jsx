import { SiteFormDialog } from "./SiteFormDialog";
import { useTranslation } from "react-i18next";
import { useSiteForm } from "../hooks/site/useSiteForm";

export function EditSiteDialog({ isOpen, onClose, editData }) {
   const { t } = useTranslation();
   const updateSite = useSiteForm({
      isUpdate: true,
      handleSuccess() {
         onClose({ isUpdateSuccess: true });
      },
   });

   function save(newData) {
      updateSite.mutate({ editData: newData });
   }

   function close() {
      onClose();
      updateSite.reset();
   }

   return (
      <SiteFormDialog
         title={t("dashboard.site.edit-site")}
         isOpen={isOpen}
         onClose={close}
         save={save}
         editData={editData}
         loading={updateSite.isLoading}
         error={updateSite.error}
         status={updateSite.status}
      />
   );
}
