import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import { formatDate } from "~/utils/formatDate";
import { VisitorStatus } from "../visitors/VisitorStatus";

export function VehicleEndDetail(props) {
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
                  <div className="visitor-item">
                     <span className="visitor-title">Status</span>
                     <VisitorStatus status="in" />
                  </div>
                  <div className="visitor-item">
                     <span className="visitor-title">Host</span>
                     <span className="visitor-value">John Doe</span>
                  </div>
                  <div className="visitor-item">
                     <span className="visitor-title">Start Date</span>
                     <span className="visitor-value">
                        {formatDate("2022-08-22T05:25:47.000000Z")}
                     </span>
                  </div>
               </div>
               <div className="col">
                  <div className="visitor-item">
                     <span className="visitor-title">Visitor</span>
                     <span className="visitor-value">
                        John Doe
                     </span>
                  </div>
                  <div className="visitor-item">
                     <span className="visitor-title">Site</span>
                     <span className="visitor-value">Surabaya Site</span>
                  </div>
                  <div className="visitor-item">
                     <span className="visitor-title">End Date</span>
                     <span className="visitor-value">
                        {formatDate("2022-08-22T05:25:47.000000Z")}
                     </span>
                  </div>
               </div>
            </div>
         </div>
      </Dialog>
   );
}
