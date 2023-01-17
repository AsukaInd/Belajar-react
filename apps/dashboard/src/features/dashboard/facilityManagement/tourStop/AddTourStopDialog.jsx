import { TourStopFormDialog } from "./TourStopFormDialog";
import { useTranslation } from "react-i18next";
import { useTourStopForm } from "~/features/dashboard/facilityManagement/hooks/tourStop/useTourStopForm";

export function AddTourStopDialog({ isOpen, onClose }) {
   const { t } = useTranslation();
   const tourStopForm = useTourStopForm({
      handleSuccess() {
         onClose();
      },
   });

   function save(newData) {
      tourStopForm.mutate(newData);
   }

   return (
      <TourStopFormDialog
         isOpen={isOpen}
         onClose={() => {
            onClose();
            tourStopForm.reset();
         }}
         save={save}
         loading={tourStopForm.isLoading}
         error={tourStopForm.error}
         status={tourStopForm.status}
      />);
}
