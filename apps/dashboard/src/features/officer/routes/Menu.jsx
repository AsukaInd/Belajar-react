import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Officers() {
   const { t } = useTranslation();

   return (
      <div className="pages-body flex flex-column">
         <div className="align-self-center mt-auto mb-auto">
            <div className="pages-panel flex flex-column select-menu">
               <h3>{t("common.menu")}</h3>
               <Link
                  className="menu-item mb-4 p-button"
                  to={`maintenance-request`}
               >
                  {t("common.maintenance-request")}
               </Link>
               <Link className="menu-item mb-4 p-button" to={`daily-activity`}>
                  {t("common.daily-activity")}
               </Link>
               <Link
                  className="menu-item mb-4 p-button"
                  to={`preregister-visitor`}
               >
                  Preregister visitor
               </Link>
               <Link className="menu-item mb-4 p-button" to={`visitor-in`}>
                  {t("visitor.visitor-in")}
               </Link>
               <Link className="menu-item mb-4 p-button" to={`visitor-out`}>
                  {t("visitor.visitor-out")}
               </Link>
               <Link className="menu-item mb-4 p-button" to={`vehicle-in`}>
                  {t("truck.truck-in")}
               </Link>
               <Link className="menu-item p-button mb-4" to={`vehicle-out`}>
                  {t("truck.truck-out")}
               </Link>
               <Link className="menu-item p-button" to={`/officer/inspection`}>
                  Product Inspection
               </Link>
            </div>
         </div>
      </div>
   );
}
