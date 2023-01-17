import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import { InputTextarea } from "primereact/inputtextarea";
import { useState } from "react";

export function PreregisterCheckoutDialog(props) {
   const { t } = useTranslation();
   const { isOpen, onClose, data, siteId } = props;
   const [notes, setNotes] = useState("");

   function onSubmit() {
      console.log({ siteId, id: data?.id, dataVisitorOut: data });
   }

   return (
      <Dialog
         visible={isOpen}
         style={{ width: "450px" }}
         header={t("common.details")}
         modal
         className="p-fluid"
         onHide={onClose}
      >
         <p>
            {t("visitor.visitor-name")}: {data?.first_name} {data?.last_name}
         </p>
         <p>Date in: {data && data?.date}</p>
         <p>
            {t("officer-common.company")}: {data?.host_company}
         </p>
         <p>
            {t("visitor.destination")}: {data?.destination}
         </p>
         <div className="field">
            <label htmlFor="notes-on-exit">
               {t("officer-common.notes-on-exit")}
            </label>
            <InputTextarea
               value={notes}
               onChange={(e) => setNotes(e.target.value)}
               id="notes-on-exit"
               rows={5}
               cols={30}
            />
         </div>
         <Button onClick={onSubmit} label={t("officer-common.check-out")} />
      </Dialog>
   );
}
