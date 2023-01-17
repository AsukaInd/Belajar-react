import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import { formatDate } from "~/utils/formatDate";
import { VisitorStatus } from "./VisitorStatus";

export function VisitorDetailDialog(props) {
   const { isOpen, onClose, visitorData } = props;
   const { t } = useTranslation();

   return (
      <Dialog
         modal
         visible={isOpen}
         style={{ width: "470px" }}
         showHeader={false}
         closable={false}
         className="p-fluid client-form-dialog"
         onHide={onClose}
         transitionOptions={{
            timeout: 500,
         }}
      >
         <div
            className="flex align-items-center justify-content-between border-bottom-1 pb-2 mb-4"
            style={{ borderColor: "var(--gray-50)" }}
         >
            <span className="text-xl font-bold">View Visitor Details</span>
            <Button
               icon="pi pi-times"
               className="p-button-rounded p-button-text"
               style={{ color: "var(--accent-text-color)" }}
               onClick={onClose}
            />
         </div>
         <div>
            <div className="grid grid-cols-2 px-2">
               <div className="col">
                  {/* <div className="visitor-item">
                     <span className="visitor-title">Status</span>
                     <VisitorStatus status={visitorData?.status} />
                  </div> */}
                  <div className="visitor-item">
                     <span className="visitor-title">Host</span>
                     <span className="visitor-value">{visitorData?.host?.first_name} {visitorData?.host?.last_name}</span>
                  </div>
                  <div className="visitor-item">
                     <span className="visitor-title">Company</span>
                     <span className="visitor-value">{visitorData?.company}</span>
                  </div>
                  <div className="visitor-item">
                     <span className="visitor-title">Start Date</span>
                     <span className="visitor-value">
                        {formatDate(visitorData?.start_date)}
                     </span>
                  </div>
               </div>
               <div className="col">
                  <div className="visitor-item">
                     <span className="visitor-title">Visitor</span>
                     <span className="visitor-value">
                        {visitorData?.first_name} {visitorData?.last_name}
                     </span>
                  </div>
                  <div className="visitor-item">
                     <span className="visitor-title">End Date</span>
                     <span className="visitor-value">
                        {formatDate(visitorData?.end_date)}
                     </span>
                  </div>
               </div>
            </div>
         </div>
      </Dialog>
   );
}
