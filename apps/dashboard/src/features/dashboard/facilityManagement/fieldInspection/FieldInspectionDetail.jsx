import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import { formatDate } from "~/utils/formatDate";
import {ViewQuestions} from './ViewQuestions'

export function FieldInspectionDetail(props) {
   const { isOpen, onClose, inspectionData } = props;
   const { t } = useTranslation();

   return inspectionData ? (
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
               View Inspection Details
            </span>
            <Button
               icon="pi pi-times"
               className="p-button-rounded p-button-text"
               style={{ color: "var(--accent-text-color)" }}
               onClick={onClose}
            />
         </div>
         <div>
            <div className="px-2 mb-4">
               <div className="grid grid-cols-2 border-solid border-x-0 border-t-0 border-bottom-1 border-[#f4f4f4]">
                  <div className="col p-0">
                     <div className="visitor-item">
                        <span className="visitor-title">Data Entered</span>
                        <span className="visitor-value">{formatDate(inspectionData.created_at)}</span>
                     </div>
                     <div className="visitor-item">
                        <span className="visitor-title">Assignee</span>
                        <span className="text-[#005AA6]">
                           {inspectionData.assignee.name}
                        </span>
                     </div>
                     <div className="visitor-item">
                        <span className="visitor-title">Site</span>
                        <span className="visitor-value">{inspectionData.site}</span>
                     </div>
                     <div className="visitor-item">
                        <span className="visitor-title">Total Question</span>
                        <span className="visitor-value">
                           {inspectionData.questions.length}
                        </span>
                     </div>
                  </div>
                  <div className="col p-0">
                     <div className="visitor-item">
                        <span className="visitor-title">Task Name</span>
                        <span className="visitor-value">
                           {inspectionData.task_name}
                        </span>
                     </div>
                     <div className="visitor-item">
                        <span className="visitor-title">Inspector</span>
                        <span className="text-[#005AA6]">
                           {inspectionData.inspected_officer.name}
                        </span>
                     </div>
                     <div className="visitor-item">
                        <span className="visitor-title">Asset</span>
                        <span className="visitor-value">{inspectionData.asset}</span>
                     </div>
                  </div>
               </div>
            </div>
            <div className="visitor-item pb-4 mb-0 border-solid border-x-0 border-t-0 border-bottom-1 border-[#f4f4f4]">
               <span className="visitor-title">Comments</span>
               <span className="visitor-value">
                  {inspectionData.comments}
               </span>
            </div>
            <ViewQuestions questions={inspectionData.questions} />
         </div>
      </Dialog>
   ) : null;
}
