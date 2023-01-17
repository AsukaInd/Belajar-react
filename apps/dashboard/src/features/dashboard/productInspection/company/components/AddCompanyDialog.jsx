import { useTranslation } from "react-i18next";
import { useAssetForm } from "~/features/dashboard/facilityManagement/hooks/asset/useAssetForm";
import { useCompanyForm } from "../../api/services/company.services";
import { CompanyFormDialog } from "./CompanyFormDialog";

export function AddCompanyDialog({ isOpen, onClose }) {
   const { t } = useTranslation();

   const companyForm = useCompanyForm({
      handleSuccess() {
         onClose();
      },
   });

   function save(newData) {
      console.log(newData)
      companyForm.mutate(newData);
   }

   return (
      <CompanyFormDialog
         isOpen={isOpen} 
         onClose={() => {
            onClose()
            companyForm.reset();
         }} 
         save={save}
         loading={companyForm.isLoading}
         error={companyForm.error}
         status={companyForm.status}
      />
   );
}
