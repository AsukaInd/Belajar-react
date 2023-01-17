import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import { Checkbox } from "primereact/checkbox";
import { useAssignListToSite } from "~/features/dashboard/facilityManagement/hooks/list/useAssignListToSite";

export function AssignSiteDialog(props) {
   const { isOpen, onClose, sites, listId, name } = props;
   const { t } = useTranslation();
   const [selected, setSelected] = useState([]);
   const assignList = useAssignListToSite({
      name,
      dataUpdate: { site_id: selected, list_id: listId },
      handleSuccess() {
         onClose();
         setSelected([]);
      },
   });

   function isSelected(id) {
      return selected.includes(id);
   }

   function handleSelect(id) {
      if (isSelected(id)) {
         setSelected((prev) => prev.filter((prevId) => prevId !== id));
      } else {
         setSelected((prev) => [...prev, id]);
      }
   }

   function onSubmit() {
      assignList.mutate();
   }

   function closeDialog() {
      onClose();
      setSelected([]);
   }

   return (
      <Dialog
         visible={isOpen}
         style={{ width: "450px" }}
         header={t("dashboard.type-list.assign-sites")}
         modal
         className="p-fluid"
         onHide={closeDialog}
         footer={
            <>
               <Button
                  onClick={closeDialog}
                  label={t("common.cancel")}
                  icon="pi pi-times"
                  className="p-button-text"
               />
               <Button
                  onClick={onSubmit}
                  loading={assignList.isLoading}
                  label={t("common.save")}
                  icon="pi pi-check"
                  className="p-button-text"
               />
            </>
         }
      >
         <ul className="list-none pl-0 pt-2">
            {sites.length > 0 ? (
               sites.map((site) => {
                  return (
                     <li key={site.id} className="field flex">
                        <Checkbox
                           checked={isSelected(site.id)}
                           onChange={() => {
                              handleSelect(site.id);
                           }}
                           inputId={`site-${site.id}`}
                        />
                        <label htmlFor={`site-${site.id}`} className="ml-2">
                           {site.site_name}
                        </label>
                     </li>
                  );
               })
            ) : (
               <span>{t("common.no-data")}</span>
            )}
         </ul>
      </Dialog>
   );
}
