import { useLocation, useParams, Navigate } from "react-router-dom";
import { formatDate } from "~/utils/formatDate";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useState } from "react";

export default function PreregisterVisitorDetails() {
   const location = useLocation();
   const { siteId } = useParams();
   const [isOpen, setIsOpen] = useState(false);

   if (!location.state) {
      return <Navigate to={`/officer/menu/${siteId}/preregister-visitor`} />;
   }

   return (
      <>
         <div className="pages-body flex flex-column my-4">
            <div className="align-self-center mt-auto mb-auto">
               <div className="flex flex-column mb-4">
                  <div className="flex flex-column">
                     <h1>Review and Sign in</h1>
                     <p>
                        <b>Visitor:</b> {location.state.first_name}{" "}
                        {location.state.last_name}
                     </p>
                     <p>
                        <b>Host:</b> {location.state.host.first_name}{" "}
                        {location.state.host.last_name}
                     </p>
                     <p>
                        <b>Time:</b> {formatDate(location.state.end_date)}
                     </p>
                     <Button onClick={() => setIsOpen(true)} label="Sign in" />
                  </div>
               </div>
            </div>
         </div>
         <Dialog
            visible={isOpen}
            style={{ width: "450px" }}
            modal
            className="p-fluid"
            onHide={() => setIsOpen(false)}
         >
            <h1 className="text-center">Sign in complete</h1>
         </Dialog>
      </>
   );
}
