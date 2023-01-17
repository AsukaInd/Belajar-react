import { useTranslation } from "react-i18next";
import { formatDate } from "~/utils/formatDate";
import { Button } from "primereact/button";
import { useState } from "react";
import { TruckCheckOutDialog } from "../truck/TruckCheckOutDialog";
import { useTruckIn } from "../hooks/useTruckIn";
import { useParams } from "react-router-dom";

export default function TruckOut() {
   const { t } = useTranslation();
   const [open, setOpen] = useState(false);
   const [selected, setSelected] = useState(null);
   const { siteId } = useParams();
   const { status, data } = useTruckIn({ siteId });

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
                  <h4>{t("truck.truck-list")}</h4>
                  <div className="visitor-list">
                     {status === "loading" ? (
                        <span>loading...</span>
                     ) : status === "success" && data?.data.length > 0 ? (
                        data?.data.map((truck) => {
                           return (
                              <div key={truck.id} className="visitor-item card">
                                 <p>
                                    {t("common.date")}:{" "}
                                    {formatDate(truck.created_at)}
                                 </p>
                                 <p>
                                    {t("officer-common.company")}:{" "}
                                    {truck.company}
                                 </p>
                                 <p>
                                    {t("truck.driver-name")}: {truck.driver}
                                 </p>
                                 <p>
                                    {t("truck.tractor")}: {truck.tractor}
                                 </p>
                                 <Button
                                    onClick={() => openDialog(truck)}
                                    label={t("common.details")}
                                 />
                              </div>
                           );
                        })
                     ) : status === "error" ? (
                        <span>error</span>
                     ) : (
                        <span>data not found</span>
                     )}
                  </div>
               </div>
            </div>
         </div>
         <TruckCheckOutDialog
            isOpen={open}
            onClose={closeDialog}
            dataTruck={selected}
            siteId={siteId}
         />
      </>
   );
}
