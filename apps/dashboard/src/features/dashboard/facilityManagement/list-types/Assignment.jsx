import { TabView, TabPanel } from "primereact/tabview";
import { TypeAssignment } from "./TypeAssignment";
import { SiteAssignment } from "./SiteAssignment";
import { useTranslation } from "react-i18next";

export function Assignment({ selectedList, name }) {
   const { t } = useTranslation();

   return (
      <TabView scrollable={false}>
         <TabPanel header={t("dashboard.type-list.type-assignment")}>
            <TypeAssignment name={name} selectedList={selectedList} />
         </TabPanel>
         <TabPanel header={t("dashboard.type-list.site-assignment")}>
            <SiteAssignment name={name} selectedList={selectedList} />
         </TabPanel>
      </TabView>
   );
}
