import { useState } from "react";
import { CompanyFormDialog } from "./CompanyFormDialog";
import { useTranslation } from "react-i18next";
import { useCompanyForm } from "../../api/services/company.services";

export function EditCompanyDialog({ isOpen, onClose, editData }) {
   const { t } = useTranslation();
   console.log(editData)
   const companyForm = useCompanyForm({
      isEdit: true,
      handleSuccess() {
         onClose();
      },
   });

   function save(newData) {
      companyForm.mutate({ ...newData, id: editData.id });
   }

   return (
      <CompanyFormDialog
         editData={editData}
         isOpen={isOpen}
         onClose={onClose}
         save={save}
         error={companyForm.error}
         loading={companyForm.isLoading}
      />
   );
}
