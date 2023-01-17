import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import { formatDate } from "~/utils/formatDate";

export function CheckOutVisitorDetail(props) {
   const { isOpen, onClose, visitorData } = props;
   const { t } = useTranslation();

   return visitorData ? (
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
            <span className="text-xl font-bold">
               View Check Out Visitor Details
            </span>
            <Button
               icon="pi pi-times"
               className="p-button-rounded p-button-text"
               style={{ color: "var(--accent-text-color)" }}
               onClick={onClose}
            />
         </div>
         <div>
            <div className="mb-4 pb-4 border-solid border-x-0 border-t-0 border-bottom-1 border-[#f4f4f4]">
               <img
                  className="rounded-lg"
                  src={visitorData.files?.length > 0 ? visitorData.files[0] : ''}
                  height="72"
                  width="72"
               />
            </div>
            <div className="px-2 mb-4">

               <div className="grid grid-cols-2 border-solid border-x-0 border-t-0 border-bottom-1 border-[#f4f4f4]">
                  <div className="col p-0">
                     <div className="visitor-item">
                        <span className="visitor-title">ID</span>
                        <span className="visitor-value">{visitorData.id}</span>
                     </div>
                     <div className="visitor-item">
                        <span className="visitor-title">Out Date</span>
                        <span className="visitor-value">
                           {formatDate(visitorData.date_out)}
                        </span>
                     </div>
                     <div className="visitor-item">
                        <span className="visitor-title">Company</span>
                        <span className="visitor-value">
                           {visitorData.company}
                        </span>
                     </div>
                     <div className="visitor-item">
                        <span className="visitor-title">Signed Out By</span>
                        <span className="text-[#005AA6]">
                           {visitorData.officer?.first_name} {visitorData.officer?.last_name}
                        </span>
                     </div>
                  </div>
                  <div className="col p-0">
                     <div className="visitor-item">
                        <span className="visitor-title">Full name</span>
                        <span className="visitor-value">
                           {`${visitorData.first_name ?? ""} ${visitorData.last_name ?? ""}`}
                        </span>
                     </div>
                     <div className="visitor-item">
                        <span className="visitor-title">Sites</span>
                        <span className="visitor-value">{visitorData.site?.site_name}</span>
                     </div>
                     <div className="visitor-item">
                        <span className="visitor-title">Destination</span>
                        <span className="visitor-value">
                           {visitorData.destination}
                        </span>
                     </div>
                  </div>
               </div>
            </div>
            <div className="px-2 grid grid-cols-2">
               <div className="col p-0 pr-4">
                  <div className="visitor-item">
                     <span className="visitor-title">Out Notes</span>
                     <span className="visitor-value">
                        {visitorData.exit_notes}
                     </span>
                  </div>
               </div>
            </div>
         </div>
      </Dialog>
   ) : null;
}
