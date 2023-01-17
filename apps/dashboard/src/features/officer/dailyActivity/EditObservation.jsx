import { ObservationFormDialog } from "./ObservationFormDialog";
import { useTranslation } from "react-i18next";

export function EditObservation(props) {
   const { isOpen, onClose, editData, saveObservation, name, siteId } = props;
   const { t } = useTranslation();
   function onSave(data) {
      saveObservation(data);
      onClose();
   }

   return (
      <ObservationFormDialog
         title={t("daily-activity.edit-observation")}
         isOpen={isOpen}
         onClose={onClose}
         editData={editData}
         save={onSave}
         name={name}
         siteId={siteId}
      />
   );
}
