import { Dialog } from "primereact/dialog";
import { useTranslation } from "react-i18next";
import { formatDate } from "~/utils/formatDate";
import { Button } from "primereact/button";

export function DailyActivityDetails(props) {
   const { isOpen, onClose, detailsData } = props;
   const { t } = useTranslation();

   return (
      <Dialog
         visible={isOpen}
         style={{ width: "450px" }}
         header="Report details"
         modal
         className="p-fluid print"
         onHide={onClose}
         footer={
            <Button
               className="hide-print"
               label="Print"
               onClick={() => window.print()}
            />
         }
      >
         <div className="mb-5">
            <h4>Date & Site</h4>
            <p>
               <b>Date entered:</b>{" "}
               {detailsData && formatDate(detailsData?.created_at)}
            </p>
            <p>
               <b>Site:</b> {detailsData?.sites?.site_name}
            </p>
         </div>
         <div className="mb-5">
            <h4>Officer information</h4>
            <p>
               <b>Officer name:</b>{" "}
               {`${detailsData?.officer?.first_name} ${detailsData?.officer?.last_name}`}
            </p>
         </div>
         <div className="mb-5">
            <h4>Shift start notes</h4>
            <p>
               <b>Post/Shoft</b>: {detailsData?.post_shift}
            </p>
            <p>
               <b>Special instructions</b>: {detailsData?.special_instruction}
            </p>
            <p>
               <b>Post item received</b>: {detailsData?.post_item_received}
            </p>
         </div>
         <div className="mb-5">
            <h4>Observations</h4>
            {detailsData?.observations.map((observation, index) => {
               return (
                  <div className="mb-5" key={index}>
                     <p>
                        <b>Type:</b> {observation.type.name}
                     </p>
                     <p>
                        <b>Time:</b> {observation.datetime}
                     </p>
                     <p>
                        <b>Comments:</b> {observation.comments}
                     </p>
                  </div>
               );
            })}
         </div>
         <div className="mb-5">
            <h4>Relieving officer information</h4>
            <p>
               <b>First name</b>: {detailsData?.relieving_officer_first_name}
            </p>
            <p>
               <b>Last name</b>: {detailsData?.relieving_officer_last_name}
            </p>
         </div>
         <div className="mb-5">
            <h4>Additional notes</h4>
            <p>
               <b>Additional notes</b>: {detailsData?.additional_notes}
            </p>
         </div>
         <div className="mb-5">
            <h4>Photo</h4>
            <p className="img-wrapper">
               {detailsData?.files.map((file, index) => {
                  return <img key={index} src={file} height="200" />;
               })}
            </p>
         </div>
      </Dialog>
   );
}
