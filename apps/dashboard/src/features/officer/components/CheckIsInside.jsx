import { Outlet, Navigate, useParams, Link } from "react-router-dom";
import { useSites } from "../hooks/useSites";
import { isInsidePolygon } from "~/utils/isInsidePolygon";
import { useGeolocation } from "../hooks/useGeolocation";
import { useTranslation } from "react-i18next";
import { ErrorMessage } from "~/components/ErrorMessage";
import { ProgressSpinner } from "primereact/progressspinner";

export function CheckIsInside({ children }) {
   const { data, status, error } = useSites();
   const { siteId } = useParams();
   const { coords, isError } = useGeolocation();
   const { t } = useTranslation();

   if (status === "error" && !data) {
      return (
         <div className="pages-body flex align-items-center justify-content-center">
            <ErrorMessage error={error} />
         </div>
      );
   }

   const siteData = data?.data.find(
      (site) => Number(site.id) === Number(siteId)
   );

   if (isError) {
      return <Navigate to="/officer" replace />;
   }

   if (status === 'loading') {
      return (
         <div className="h-screen grid place-content-center">
            <ProgressSpinner strokeWidth={3} />
         </div>
      )
   }

   if (status === 'success' && !siteData) {
      return <p className="h-screen grid place-content-center">Site Not Found</p>
   }

   if (!isError && siteData && !isInsidePolygon(siteData?.geo_data, coords)) {
      return (
         <div className="pages-body flex align-items-center justify-content-center flex-column">
            <p>{t("officer-common.invalid-location")}</p>
            <Link className="p-button" to="/officer">
               Select Site
            </Link>
         </div>
      );
   }

   return children || <Outlet />;
}
