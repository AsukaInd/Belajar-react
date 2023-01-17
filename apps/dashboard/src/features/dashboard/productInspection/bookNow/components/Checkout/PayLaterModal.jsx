import { Dialog } from "primereact/dialog";
import { useTranslation } from "react-i18next";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const DATA = [
   {
      id: "1",
      title: "Product(s)",
      description: "Down jacket",
   },
   {
      id: "1",
      title: "Service",
      description: "DUPRO",
   },
   {
      id: "1",
      title: "Date",
      description: "26-May-2021",
   },
   {
      id: "1",
      title: "Inspxt Ref No",
      description: "JIANGU SAINTY HANTANG TRADING CO",
   },
   {
      id: "1",
      title: "Booking Ref",
      description: "None",
   },
   {
      id: "1",
      title: "Attachment",
      description: "None",
   },
];
export function PayLaterModal({ isOpen, onClose }) {
   const { t } = useTranslation();
   const toast = useRef(null);

   return (
      <>
         <Dialog
            modal
            showHeader={false}
            closable={false}
            visible={isOpen}
            className="p-dialog-delete"
            style={{ minWidth: "480px" }}
            onHide={onClose}
            transitionOptions={{
               timeout: 500,
            }}
         >
            <div className="flex justify-between">
               <h1 className="text-lg">Confirm and Pay Later</h1>
               <div className="text-right cursor-pointer" onClick={onClose}>
                  X
               </div>
            </div>
            <p className="text-[#a7a7a7] -mt-2">
               You can ses your order summary here
            </p>
            <div className="bg-[#f5fbf4] w-full p-4 rounded flex gap-2">
               <FaCheckCircle className="text-[#41b92a]" />{" "}
               <b className="text-[#41b92a]">Thank you for your order</b>
            </div>
            <div className="p-4 border-1 rounded-lg mt-4 border-white-e9">
               <h1 className="text-base">Order Summary</h1>
               <DataTable value={DATA} responsiveLayout="scroll">
                  <Column field="title" header="Title" className="font-bold"></Column>
                  <Column field="description" header="Description"></Column>
               </DataTable>
            </div>
            <div className="flex flex-row-reverse mt-4 gap-2">
               <button className=" cursor-pointer text-white bg-blue-2 border-1 border-blue-2 rounded-md p-2 font-semibold">
                  Book Another Order
               </button>
               <button className=" cursor-pointer text-blue-2 bg-white border-1 border-blue-2 rounded-md p-2 font-semibold">
                  Generate Invoice
               </button>
               <button className=" cursor-pointer text-blue-2 bg-white border-1 border-blue-2 rounded-md p-2 font-semibold">
                  View or Update Your Order
               </button>
            </div>
         </Dialog>
         <Toast ref={toast} position="top-right" />
      </>
   );
}
