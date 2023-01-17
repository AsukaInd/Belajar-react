import { useParams, useNavigate } from "react-router-dom";
import { usePreregisterVisitors } from "~/features/officer/hooks/usePreregisterVisitors";
import { Button } from "primereact/button";
import { formatDate } from "~/utils/formatDate";
import { ErrorMessage } from "~/components/ErrorMessage";

export default function PreregisterVisitorList() {
   const { siteId, hostId } = useParams();
   const navigate = useNavigate();
   const { status, data, error } = usePreregisterVisitors({ siteId });
   const filteredVisitors =
      data?.data.filter(
         (visitor) => Number(visitor.host.id) === Number(hostId)
      ) ?? [];

   return (
      <div className="pages-body flex flex-column my-4">
         <div className="align-self-center mt-auto mb-auto">
            <div className="flex flex-column mb-4">
               <div className="flex flex-column">
                  {filteredVisitors.length > 0 && (
                     <h4>
                        Host name: {filteredVisitors[0].host.first_name}{" "}
                        {filteredVisitors[0].host.last_name}
                     </h4>
                  )}
                  <div>
                     <p>Visitor invited</p>
                     {status === "loading" ? (
                        <p>loading...</p>
                     ) : filteredVisitors.length > 0 ? (
                        filteredVisitors.map((visitor) => (
                           <div
                              className="flex justify-content-between align-items-center mb-3"
                              key={visitor.id}
                           >
                              <div>
                                 <p className="mb-2">
                                    {visitor.first_name} {visitor.last_name}
                                 </p>
                                 <span>{formatDate(visitor.end_date)}</span>
                              </div>
                              <Button
                                 onClick={() =>
                                    navigate(`${visitor.id}`, {
                                       state: visitor,
                                    })
                                 }
                                 label="Select"
                              />
                           </div>
                        ))
                     ) : status === "error" ? (
                        <ErrorMessage error={error} />
                     ) : (
                        <span>data not found</span>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
