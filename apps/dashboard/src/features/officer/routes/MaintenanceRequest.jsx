import { useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { useTranslation } from "react-i18next";
import { useTypes } from "../hooks/useTypes";
import { useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useReport } from "../hooks/useReport";
import { Toast } from "primereact/toast";
import { FilePreview } from "~/components/FilePreview";
import { ErrorMessage } from "~/components/ErrorMessage";
import { transformToDropdownOptions } from "~/utils/transformToDropdownOptions";

export default function MaintenanceRequest() {
   const { t } = useTranslation();
   const { siteId } = useParams();
   const name = "maintenance-request";
   const { status, data } = useTypes({ name, siteId });
   const toast = useRef(null);

   const emailClientValues = [
      { label: t("common.yes"), value: 1 },
      { label: t("common.no"), value: 0 },
   ];

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
         type_id: "",
         other_type: "",
         details: "",
         who_notified: "",
         email_client: 0,
         files: null,
      },
   });

   const files = Array.from(watch("files") ?? []);

   const report = useReport({
      onSuccess() {
         toast.current.show({
            severity: "success",
            summary: "Success",
            detail: t("maintenance-request.request-submitted"),
            life: 3000,
         });
      },
   });

   function onSubmit(data) {
      report.mutate({ dataReport: data, name, siteId });
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
                  <h4>{t("common.maintenance-request")}</h4>
                  <div className="flex flex-column mb-3">
                     <label htmlFor="type">
                        {t("maintenance-request.type")}
                     </label>
                     <br />
                     <Controller
                        name="type_id"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                           <Dropdown
                              id="type"
                              disabled={status === "loading"}
                              value={field.value}
                              options={transformToDropdownOptions(data?.data)}
                              onChange={field.onChange}
                              placeholder={t("maintenance-request.select-type")}
                           />
                        )}
                     />
                     {errors.type_id && (
                        <span className="p-invalid">
                           {t("validation.maintenance-type-required")}
                        </span>
                     )}
                  </div>
                  <div className="flex flex-column mb-3">
                     <label htmlFor="other-type">
                        {t("officer-common.other-type")}
                     </label>
                     <br />
                     <Controller
                        name="other_type"
                        control={control}
                        render={({ field }) => (
                           <InputText id="other-type" {...field} />
                        )}
                     />
                  </div>
                  <div className="flex flex-column">
                     <label htmlFor="details">{t("common.details")}</label>
                     <br />
                     <Controller
                        name="details"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                           <InputTextarea
                              id="details"
                              rows={5}
                              cols={30}
                              {...field}
                           />
                        )}
                     />
                     {errors.details && (
                        <span className="p-invalid">
                           {t("validation.details-required")}
                        </span>
                     )}
                  </div>
                  <h4>Notification</h4>
                  <div className="flex flex-column mb-3">
                     <label htmlFor="notified">
                        {t("maintenance-request.who-has-been-notified")}
                     </label>
                     <br />
                     <Controller
                        name="who_notified"
                        control={control}
                        render={({ field }) => (
                           <InputTextarea
                              id="notified"
                              rows={5}
                              cols={30}
                              {...field}
                           />
                        )}
                     />
                  </div>
                  <div className="flex flex-column mb-3">
                     <label htmlFor="email-client">
                        {t("maintenance-request.email-client")}
                     </label>
                     <br />
                     <Controller
                        name="email_client"
                        control={control}
                        render={({ field }) => (
                           <Dropdown
                              id="email-client"
                              value={field.value}
                              options={emailClientValues}
                              onChange={field.onChange}
                              placeholder={t("officer-common.yes-or-no")}
                           />
                        )}
                     />
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
                  <Button
                     onClick={handleSubmit(onSubmit)}
                     className="mt-4"
                     label={t("officer-common.submit")}
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
         <Toast ref={toast} position="top-right" />
      </>
   );
}
