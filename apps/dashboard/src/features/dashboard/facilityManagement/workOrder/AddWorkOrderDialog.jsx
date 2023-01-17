import { useState } from "react";
import { WorkOrderFormDialog } from "./WorkOrderFormDialog";
import { useTranslation } from "react-i18next";
import { useWorkOrderForm } from '~/features/dashboard/facilityManagement/hooks/workOrder/useWorkOrderForm'

export function AddWorkOrderDialog({ isOpen, onClose }) {
   const { t } = useTranslation();
   const workOrderForm = useWorkOrderForm({
      handleSuccess() {
         onClose();
      },
   })

   function save(newData) {
      workOrderForm.mutate(newData)
   }

   return (
      <WorkOrderFormDialog 
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
