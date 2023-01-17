import { TourStopFormDialog } from "./TourStopFormDialog";
import { useTranslation } from "react-i18next";
import { useTourStopForm } from "../hooks/tourStop/useTourStopForm";

export function EditTourStopDialog(props) {
   const { isOpen, onClose, editData, isView } = props;
   const { t } = useTranslation();

   const tourStopForm = useTourStopForm({
      isUpdate: true,
      handleSuccess() {
         onClose();
      },
   });

   function save(newData) {
      tourStopForm.mutate({ ...newData });
   }

   function close() {
      onClose();
      tourStopForm.reset()
   }

   return (
      <TourStopFormDialog
         isView={isView}
         isOpen={isOpen}
         onClose={close}
         save={save}
         editData={editData}
         loading={tourStopForm.isLoading}
         error={tourStopForm.error}
         status={tourStopForm.status}
      />
   );
}
