import { Button } from "primereact/button";
import { AssignSiteDialog } from "./AssignSiteDialog";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function SiteAssignment({ selectedList, name }) {
   const [assignSite, setAssignSite] = useState(false);
   const { t } = useTranslation();

   function openAssignSite() {
      setAssignSite(true);
   }

   function closeAssignSite() {
      setAssignSite(false);
   }

   return (
      <>
         {selectedList && (
            <div className="flex justify-content-between align-items-center">
               <span>{t("dashboard.type-list.site-currently-assigned")}</span>
               <Button
                  onClick={openAssignSite}
                  label={t("dashboard.type-list.assign-sites")}
               />
            </div>
         )}
         <ul className="list-none pl-0" style={{ height: 369 }}>
            {selectedList?.assigned_sites?.length > 0 ? (
               selectedList?.assigned_sites?.map((site) => {
                  return (
                     <li className="py-3" key={site.id}>
                        {site.site_name}
                     </li>
                  );
               })
            ) : (
               <span>{t("common.no-data")}</span>
            )}
         </ul>
         <AssignSiteDialog
            name={name}
            onClose={closeAssignSite}
            isOpen={assignSite}
            listId={selectedList?.id}
            sites={
               selectedList?.unassigned_sites.length > 0
                  ? selectedList?.unassigned_sites
                  : []
            }
         />
      </>
   );
}
