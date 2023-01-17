import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import { formatDate } from "~/utils/formatDate";

export function VehicleLogDetail(props) {
   const { isOpen, onClose, vehicleData } = props;
   const { t } = useTranslation();

   return vehicleData ? (
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
               View Vehicle Details
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
                  src={vehicleData.image}
                  height="72"
                  width="72"
               />
            </div>
            <div className="px-2 mb-4">
               <div className="grid grid-cols-2 border-solid border-x-0 border-t-0 border-bottom-1 border-[#f4f4f4]">
                  <div className="col p-0">
                     <div className="visitor-item">
                        <span className="visitor-title">ID</span>
                        <span className="visitor-value">{vehicleData.id}</span>
                     </div>
                     <div className="visitor-item">
                        <span className="visitor-title">In Date</span>
                        <span className="visitor-value">
                           {vehicleData.in_date}
                        </span>
                     </div>
                     <div className="visitor-item">
                        <span className="visitor-title">Out Date</span>
                        <span className="visitor-value">
                           {vehicleData.out_date}
                        </span>
                     </div>
                     <div className="visitor-item">
                        <span className="visitor-title">Company</span>
                        <span className="visitor-value">
                           {vehicleData.company}
                        </span>
                     </div>
                     <div className="visitor-item">
                        <span className="visitor-title">In Mileage</span>
                        <span className="visitor-value">{vehicleData.in_mileage ?? 0}</span>
                     </div>
                     <div className="visitor-item">
                        <span className="visitor-title">Signed In By</span>
                        <span className="text-[#005AA6]">
                           {vehicleData.signed_in_by}
                        </span>
                     </div>
                  </div>
                  <div className="col p-0">
                     <div className="visitor-item">
                        <span className="visitor-title">In Driver</span>
                        <span className="visitor-value">
                           {vehicleData.in_driver}
                        </span>
                     </div>
                     <div className="visitor-item">
                        <span className="visitor-title">Out Driver</span>
                        <span className="visitor-value">
                           {vehicleData.out_driver}
                        </span>
                     </div>
                     <div className="visitor-item">
                        <span className="visitor-title">Site</span>
                        <span className="visitor-value">{vehicleData.site}</span>
                     </div>
                     <div className="visitor-item">
                        <span className="visitor-title">License Plate</span>
                        <span className="visitor-value">{vehicleData.license_plate}</span>
                     </div>
                     <div className="visitor-item">
                        <span className="visitor-title">Out Mileage</span>
                        <span className="visitor-value">{vehicleData.out_mileage ?? 0}</span>
                     </div>
                     <div className="visitor-item">
                        <span className="visitor-title">Signed Out By</span>
                        <span className="text-[#005AA6]">
                           {vehicleData.signed_out_by}
                        </span>
                     </div>
                  </div>
               </div>
            </div>
            <div className="px-2 grid grid-cols-2">
               <div className="col p-0 pr-4">
                  <div className="visitor-item">
                     <span className="visitor-title">In Notes</span>
                     <span className="visitor-value">
                        {vehicleData.in_notes}
                     </span>
                  </div>
               </div>
               <div className="col p-0">
                  <div className="visitor-item">
                     <span className="visitor-title">Out Notes</span>
                     <span className="visitor-value">
                        {vehicleData.out_notes}
                     </span>
                  </div>
               </div>
            </div>
         </div>
      </Dialog>
   ) : null;
}
