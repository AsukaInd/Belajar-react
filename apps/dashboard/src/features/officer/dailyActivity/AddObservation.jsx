import { ObservationFormDialog } from "./ObservationFormDialog";
import { useTranslation } from "react-i18next";

export function AddObservation({
   isOpen,
   onClose,
   saveObservation,
   name,
   siteId,
}) {
   const { t } = useTranslation();

   function onSave(data) {
      saveObservation({
         ...data,
         datetime: new Date(),
         id: new Date().getTime(),
      });
      onClose();
   }

   return (
      <ObservationFormDialog
         title={t("daily-activity.add-observation")}
         isOpen={isOpen}
         onClose={onClose}
         save={onSave}
         name={name}
         siteId={siteId}
      />
   );
}
