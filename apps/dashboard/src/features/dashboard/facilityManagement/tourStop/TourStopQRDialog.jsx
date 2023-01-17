import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useTranslation } from "react-i18next";

export function TourStopQRDialog({ isOpen, onClose, QRData }) {
   const { t } = useTranslation();

   return (
      <Dialog
         modal
         showHeader={false}
         closable={false}
         visible={isOpen}
         style={{ width: "388px" }}
         onHide={onClose}
         transitionOptions={{
            timeout: 500,
         }}
      >
         <div
            className="flex align-items-center justify-content-between border-bottom-1 pb-2 mt-2 mb-4"
            style={{ borderColor: "var(--gray-50)" }}
         >
            <span className="text-xl font-bold">Tour Stop QR</span>
            <Button
               icon="pi pi-times"
               className="p-button-rounded p-button-text"
               style={{ color: "var(--accent-text-color)" }}
               onClick={onClose}
            />
         </div>
         <div className="mb-4">
            <h1 className="text-xl">
               QR Code{" "}
               <span style={{ color: "var(--primary-color)" }}>
                  {QRData?.name}
               </span>
            </h1>
            <span>Scan to see the unique number</span>
         </div>
         <div className="qr-wrapper">
            <img src={QRData?.qr_code} />
         </div>
      </Dialog>
   );
}
