import { useState, useRef, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { useTranslation } from "react-i18next";
import { AddObservation } from "../dailyActivity/AddObservation";
import { EditObservation } from "../dailyActivity/EditObservation";
import { useForm, Controller } from "react-hook-form";
import { FilePreview } from "~/components/FilePreview";
import { useParams } from "react-router-dom";
import { Toast } from "primereact/toast";
import { useReport } from "../hooks/useReport";
import { ErrorMessage } from "~/components/ErrorMessage";
import { ObservationList } from "../dailyActivity/ObservationList";

export default function DailyActivity() {
   const name = "daily-activity";
   const { t } = useTranslation();
   const { siteId } = useParams();
   const [isOpen, setIsOpen] = useState(false);
   const [isOpenEdit, setIsOpenEdit] = useState(false);
   const [selected, setSelected] = useState(null);
   const toast = useRef(null);
   const [observationError, setObservationError] = useState(false);

   const report = useReport({
      onSuccess() {
         toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Daily activity has been submitted",
            life: 3000,
         });
      },
   });

   const {
      control,
      handleSubmit,
      formState: { errors },
      reset,
      register,
      watch,
      setValue,
   } = useForm({
      defaultValues: {
         post_shift: "",
         special_instruction: "",
         post_item_received: "",
         observations: [],
         files: [],
         relieving_officer_first_name: "",
         relieving_officer_last_name: "",
         additional_notes: "",
      },
   });
   const observations = watch("observations");
   const files = Array.from(watch("files") ?? []);

   useEffect(() => {
      if (observations.length > 0) {
         setObservationError(false);
      }
   }, [observations]);

   function openObservation() {
      setIsOpen(true);
   }

   function closeObservation() {
      setIsOpen(false);
   }

   function openEditObservation(data) {
      setSelected(data);
      setIsOpenEdit(true);
   }

   function closeEditObservation() {
      setSelected(null);
      setIsOpenEdit(false);
   }

   function deleteObservation(id) {
      setValue(
         "observations",
         observations.filter((observation) => observation.id !== id)
      );
   }

   function saveObservation(data) {
      setValue("observations", [
         ...observations.filter((observation) => observation.id !== data.id),
         data,
      ]);
   }

   function onSubmit(data) {
      setObservationError(false);
      if (observations.length > 0) {
         report.mutate({ dataReport: data, name, siteId });
      } else {
         setObservationError(true);
      }
   }

   function removeFile({ name }) {
      setValue(
         "files",
         files.filter((file) => file.name !== name)
      );
   }

   return (
      <>
         <div className="pages-body flex flex-column my-4">
            <div className="align-self-center mt-auto mb-auto">
               <div className="card flex flex-column mb-4">
                  <h4>{t("daily-activity.shift-start-notes")}</h4>
                  <div className="flex flex-column mb-3">
                     <label htmlFor="post-shift">
                        {t("daily-activity.post-shift")}
                     </label>
                     <br />
                     <Controller
                        name="post_shift"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                           <InputText id="post-shift" {...field} />
                        )}
                     />
                     {errors.post_shift && "post shift is required"}
                  </div>
                  <div className="flex flex-column mb-3">
                     <label htmlFor="special-instruction">
                        {t("daily-activity.special-instruction")}
                     </label>
                     <br />
                     <Controller
                        name="special_instruction"
                        control={control}
                        render={({ field }) => (
                           <InputTextarea
                              id="special-instruction"
                              rows={5}
                              cols={30}
                              {...field}
                           />
                        )}
                     />
                  </div>
                  <div className="flex flex-column mb-3">
                     <label htmlFor="post-item-received">
                        {t("daily-activity.post-item-received")}
                     </label>
                     <br />
                     <Controller
                        name="post_item_received"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                           <InputTextarea
                              id="post-item-received"
                              rows={5}
                              cols={30}
                              {...field}
                           />
                        )}
                     />
                     {errors.post_item_received &&
                        "post item received is required"}
                  </div>
                  <div>
                     <h4>{t("daily-activity.observations")}</h4>
                     <ObservationList
                        observations={observations}
                        deleteObservation={deleteObservation}
                        openEditObservation={openEditObservation}
                     />
                     <Button
                        onClick={openObservation}
                        label={t("daily-activity.add-observation")}
                     />
                     {observationError && <p>observations is required</p>}
                  </div>
                  <h4>{t("daily-activity.relieving-officer-information")}</h4>
                  <div className="flex flex-column mb-3">
                     <label htmlFor="first-name">
                        {t("daily-activity.relieving-officer-first-name")}
                     </label>
                     <br />
                     <Controller
                        name="relieving_officer_first_name"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                           <InputText id="first-name" {...field} />
                        )}
                     />
                     {errors.relieving_officer_first_name &&
                        "Relieving officer first name is required"}
                  </div>
                  <div className="flex flex-column mb-3">
                     <label htmlFor="last-name">
                        {t("daily-activity.relieving-officer-last-name")}
                     </label>
                     <br />
                     <Controller
                        name="relieving_officer_last_name"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                           <InputText id="last-name" {...field} />
                        )}
                     />
                     {errors.relieving_officer_last_name &&
                        "Relieving officer last name is required"}
                  </div>
                  <div className="report-upload-btn">
                     <label htmlFor="upload">
                        {t("officer-common.upload-file")}
                     </label>
                     <input
                        style={{ display: "none" }}
                        type="file"
                        id="upload"
                        {...register("files")}
                        onChange={(e) => {
                           setValue("files", [...files, e.target.files[0]]);
                        }}
                     />
                  </div>
                  <FilePreview files={files} removeFile={removeFile} />
                  <h4>{t("daily-activity.additional-notes")}</h4>
                  <div className="flex flex-column mb-3">
                     <label htmlFor="additional-notes">
                        {t("daily-activity.additional-notes")}
                     </label>
                     <br />
                     <Controller
                        name="additional_notes"
                        control={control}
                        render={({ field }) => (
                           <InputTextarea
                              id="additional-notes"
                              rows={5}
                              cols={30}
                              {...field}
                           />
                        )}
                     />
                  </div>
                  <Button
                     className="mt-4"
                     label={t("officer-common.submit")}
                     onClick={handleSubmit(onSubmit)}
                     loading={report.isLoading}
                  />
                  <Button
                     onClick={() => reset()}
                     className="mt-4"
                     label={t("officer-common.clear-form")}
                  />
                  <ErrorMessage error={report.error} />
               </div>
            </div>
         </div>
         <AddObservation
            isOpen={isOpen}
            onClose={closeObservation}
            saveObservation={saveObservation}
            name={name}
            siteId={siteId}
         />
         <EditObservation
            isOpen={isOpenEdit}
            onClose={closeEditObservation}
            editData={selected}
            saveObservation={saveObservation}
            name={name}
            siteId={siteId}
         />
         <Toast ref={toast} position="top-right" />
      </>
   );
}
