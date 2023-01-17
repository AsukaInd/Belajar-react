import { MaintenanceRequestTable } from "../maintenanceRequest/MaintenanceRequestTable";
import { useTranslation } from "react-i18next";

export default function MaintenanceRequest() {
   const { t } = useTranslation();

   return (
      <div className="layout-content">
         <h1>{t("common.maintenance-request")}</h1>
         <MaintenanceRequestTable />
      </div>
   );
}
