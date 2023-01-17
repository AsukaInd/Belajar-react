import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import { formatDate } from "~/utils/formatDate";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import { useTruckOut } from "../hooks/useTruckOut";

export function TruckCheckOutDialog(props) {
   const { t } = useTranslation();
   const { isOpen, onClose, dataTruck, siteId } = props;
   const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
      reset,
   } = useForm({
      defaultValues: {
         driver: "",
         out_mileage: "",
         exit_notes: "",
      },
   });

   const truckOut = useTruckOut({
      handleSuccess() {
         handleClose();
      },
   });

   function handleClose() {
      reset();
      onClose();
   }

   function onSubmit(data) {
      truckOut.mutate({ siteId, id: dataTruck?.id, dataTruckOut: data });
   }

   useEffect(() => {
      if (dataTruck) {
         setValue("outbound_driver", dataTruck.driver);
      }
   }, [dataTruck]);

   return (
      <Dialog
         visible={isOpen}
         style={{ width: "450px" }}
         header={t("common.details")}
         modal
         className="p-fluid"
         onHide={handleClose}
      >
         <p>
            {t("common.date")}: {dataTruck && formatDate(dataTruck?.created_at)}
         </p>
         <p>
            {t("officer-common.company")}: {dataTruck?.company}
         </p>
         <p>
            {t("truck.inbound-driver")}: {dataTruck?.driver}
         </p>
         <p>
            {t("officer-common.LP")}: {dataTruck?.lp}
         </p>
         <div className="p-inputgroup flex-column mb-4">
            <span className="p-float-label">
               <Controller
                  name="driver"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                     <InputText id="outbound-driver" {...field} />
                  )}
               />
               {errors.driver && "outbound driver is required"}
               <label htmlFor="outbound-driver">
                  {t("truck.outbound-driver")}
               </label>
            </span>
         </div>
         <div className="p-inputgroup flex-column mb-4">
            <span className="p-float-label">
               <Controller
                  name="out_mileage"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                     <InputText id="out-mileage" {...field} />
                  )}
               />
               <label htmlFor="outbound-driver">
                  Out mileage
               </label>
            </span>
         </div>
         <div className="field">
            <label htmlFor="notes-on-exit">
               {t("officer-common.notes-on-exit")}
            </label>
            <Controller
               name="exit_notes"
               control={control}
               render={({ field }) => (
                  <InputTextarea
                     id="notes-on-exit"
                     rows={5}
                     cols={30}
                     {...field}
                  />
               )}
            />
         </div>
         <Button
            loading={truckOut.isLoading}
            onClick={handleSubmit(onSubmit)}
            label={t("officer-common.check-out")}
         />
      </Dialog>
   );
}
