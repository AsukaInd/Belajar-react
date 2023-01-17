import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import { formatDate } from "~/utils/formatDate";

export function MaintenanceRequestDetails(props) {
   const { isOpen, onClose, detailsData } = props;
   const { t } = useTranslation();

   return (
      <Dialog
         visible={isOpen}
         style={{ width: "450px" }}
         header={t("common.report-details")}
         modal
         className="p-fluid print"
         onHide={onClose}
         footer={
            <Button
               className="hide-print"
               label={t("common.print")}
               onClick={() => window.print()}
            />
         }
      >
         <div className="mb-5">
            <h4>
               {t("common.date")} & {t("common.site")}
            </h4>
            <p>
               <b>{t("common.date-entered")}: </b>{" "}
               {detailsData && formatDate(detailsData?.created_at)}
            </p>
            <p>
               <b>{t("common.site")}:</b> {detailsData?.sites?.site_name}
            </p>
         </div>
         <div className="mb-5">
            <h4>{t("common.officer-information")}</h4>
            <p>
               <b>{t("common.name")}:</b>{" "}
               {`${detailsData?.officer?.first_name} ${detailsData?.officer?.last_name}`}
            </p>
         </div>
         <div className="mb-5">
            <h4>{t("common.maintenance-request")}</h4>
            <p>
               <b>{t("maintenance-request.type")}:</b> {detailsData?.type.name}
            </p>
            <p>
               <b>{t("officer-common.other-type")}:</b>{" "}
               {detailsData?.other_type}
            </p>
            <p>
               <b>{t("common.details")}:</b> {detailsData?.details}
            </p>
         </div>
         <div className="mb-5">
            <h4>{t("maintenance-request.notification")}</h4>
            <p>
               <b>{t("maintenance-request.notification")}:</b>{" "}
               {detailsData?.who_notified}
            </p>
            <p>
               <b>{t("maintenance-request.email-client")}:</b>{" "}
               {detailsData?.email_client ? "Yes" : "No"}
            </p>
         </div>
         <div className="mb-5">
            <h4>{t("common.photo")}</h4>
            <p className="img-wrapper">
               {detailsData?.files.map((file, index) => {
                  return <img key={index} src={file} height="200" />;
               })}
            </p>
         </div>
      </Dialog>
   );
}
