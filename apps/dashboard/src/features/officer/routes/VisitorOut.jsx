import { useTranslation } from "react-i18next";
import { Button } from "primereact/button";
import { useState } from "react";
import { CheckOutDialog } from "../visitor/CheckOutDialog";
import { useParams } from "react-router-dom";
import { useVisitors } from "../hooks/useVisitors";
import { ErrorMessage } from "~/components/ErrorMessage";

export default function VisitorOut() {
   const { t } = useTranslation();
   const [open, setOpen] = useState(false);
   const [selected, setSelected] = useState(null);
   const { siteId } = useParams();
   const { status, data, error } = useVisitors({ siteId });

   function closeDialog() {
      setOpen(false);
      setSelected(null);
   }

   function openDialog(data) {
      setSelected(data);
      setOpen(true);
   }

   return (
      <>
         <div className="pages-body flex flex-column my-4">
            <div className="align-self-center mt-auto mb-auto">
               <div className="flex flex-column mb-4">
                  <h4>{t("visitor.visitor-list")}</h4>
                  <div className="visitor-list">
                     {status === "loading" ? (
                        <span>loading...</span>
                     ) : status === "success" && data?.data.length > 0 ? (
                        data?.data.map((visitor) => {
                           return (
                              <div
                                 key={visitor.id}
                                 className="card visitor-item"
                              >
                                 <p>
                                    {t("visitor.visitor-name")}: {visitor.name}
                                 </p>
                                 <p>
                                    {t("common.date")}: {visitor.date_in}
                                 </p>
                                 <p>
                                    {t("officer-common.company")}:{" "}
                                    {visitor.company}
                                 </p>
                                 <p>
                                    {t("visitor.destination")}:{" "}
                                    {visitor.destination}
                                 </p>
                                 <Button
                                    onClick={() => openDialog(visitor)}
                                    label={t("common.details")}
                                 />
                              </div>
                           );
                        })
                     ) : status === "error" ? (
                        <ErrorMessage error={error} />
                     ) : (
                        <span>{t("common.no-data")}</span>
                     )}
                  </div>
               </div>
            </div>
         </div>
         <CheckOutDialog
            siteId={siteId}
            isOpen={open}
            onClose={closeDialog}
            data={selected}
         />
      </>
   );
}
