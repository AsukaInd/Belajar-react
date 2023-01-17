import { useState } from "react";
import { WorkOrderFormDialog } from "./WorkOrderFormDialog";
import { useTranslation } from "react-i18next";
import { useWorkOrderForm } from '~/features/dashboard/facilityManagement/hooks/workOrder/useWorkOrderForm'

export function EditWorkOrderDialog({ isOpen, onClose, editData }) {
   const { t } = useTranslation();
   const workOrderForm = useWorkOrderForm({
      isEdit: true,
      handleSuccess() {
         onClose();
      },
   })

   function save(newData) {
      workOrderForm.mutate({...newData, id: editData.id})
   }

   return (
      <WorkOrderFormDialog
         editData={editData}
         isOpen={isOpen} 
         onClose={() => {
            onClose()
            workOrderForm.reset()
         }} 
         save={save}
         loading={workOrderForm.isLoading}
         error={workOrderForm.error}
         status={workOrderForm.status}
      />
   );
}
