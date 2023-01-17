import { useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { Dropdown } from "primereact/dropdown";
import { yupResolver } from "@hookform/resolvers/yup";
import { clientUserSchema } from "./clientUserSchema";
import { ErrorMessage } from "~/components/ErrorMessage";
import { useRoles } from "~/features/dashboard/facilityManagement/hooks/useRoles";
import { transformToDropdownOptions } from "~/utils/transformToDropdownOptions";
import { useSites } from "~/features/dashboard/facilityManagement/hooks/site/useSites";

export function UserFormDialog(props) {
   const { isOpen, onClose, save, loading, error, editData, status } = props;

   const sites = useSites({ perPage: 999 });

   const { t } = useTranslation();
   const {
      control,
      handleSubmit,
      formState: { errors, isValid },
      reset,
      setValue,
   } = useForm({
      mode: "onChange",
      resolver: yupResolver(clientUserSchema),
      defaultValues: {
         first_name: "",
         last_name: "",
         email: "",
         site_id: "",
         company: "",
         phone: "",
         job_title: "",
      },
   });

   useEffect(() => {
      if (editData && !loading) {
         Object.entries(editData).forEach(([key, value]) => {
            setValue(key, value);
         });
      }
   }, [editData, isOpen]);

   useEffect(() => {
      if (status === "success") {
         reset();
      }
   }, [status]);

   function onSubmit(data) {
      save(data);
   }

   function closeDialog() {
      onClose();

      if (!editData) {
         reset();
      }
   }

   return (
      <Dialog
         modal
         visible={isOpen}
         style={{ width: "470px" }}
         showHeader={false}
         closable={false}
         className="p-fluid client-form-dialog"
         onHide={closeDialog}
         transitionOptions={{
            timeout: 500,
         }}
      >
         <div
            className="flex align-items-center justify-content-between border-bottom-1 pb-2 mt-2 mb-4"
            style={{ borderColor: "var(--gray-50)" }}
         >
            <span className="text-xl font-bold">
               {editData ? t("dashboard.user.edit-host") : t("dashboard.user.add-host")}
            </span>
         </div>
         <div>
            <div className="field">
               <label htmlFor="first-name">
                  First Name<span className="required-field">*</span>
               </label>
               <Controller
                  name="first_name"
                  control={control}
                  render={({ field }) => (
                     <InputText placeholder="Input first name" id="first-name" {...field} />
                  )}
               />
               {errors.first_name?.message && (
                  <small className="p-invalid">
                     {t(errors.first_name?.message)}
                  </small>
               )}
            </div>
            <div className="field">
               <label htmlFor="last-name">
                  Last Name<span className="required-field">*</span>
               </label>
               <Controller
                  name="last_name"
                  control={control}
                  render={({ field }) => (
                     <InputText placeholder="Input last name" id="first-name" {...field} />
                  )}
               />
               {errors.last_name?.message && (
                  <small className="p-invalid">
                     {t(errors.last_name?.message)}
                  </small>
               )}
            </div>
            <div className="field">
               <label htmlFor="email">
                  Email Address<span className="required-field">*</span>
               </label>
               <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                     <InputText placeholder="example@example.com" type="email" id="email" {...field} />
                  )}
               />
               {errors.email?.message && (
                  <small className="p-invalid">
                     {t(errors.email?.message)}
                  </small>
               )}
            </div>
            <div className="field">
               <label htmlFor="site-id">
                  {editData ? "Selected" : "Select"} Site
                  <span className="required-field">*</span>
               </label>
               <Controller
                  name="site_id"
                  control={control}
                  render={({ field }) => (
                     <Dropdown
                        disabled={editData}
                        options={transformToDropdownOptions(sites?.data?.data, {
                           label: "site_name",
                           value: "id",
                        })}
                        id="site-id"
                        placeholder="Select your site"
                        value={field.value}
                        onChange={field.onChange}
                     />
                  )}
               />
               {errors.site_id?.message && (
                  <small className="p-invalid">
                     {t(errors.site_id?.message)}
                  </small>
               )}
            </div>
            <div className="field">
               <label htmlFor="company">
                  Company
               </label>
               <Controller
                  name="company"
                  control={control}
                  render={({ field }) => <InputText placeholder="Input your company" id="company" {...field} />}
               />
            </div>
            <div className="field">
               <label htmlFor="phone">Phone Number</label>
               <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                     // <PhoneInput
                     //    id="phone"
                     //    country={"us"}
                     //    value={field.value}
                     //    onChange={(phone) => field.onChange(phone)}
                     // />
                     <InputText placeholder="+000000000000" type="tel" id="phone" {...field} />
                  )}
               />
            </div>
            <div className="field">
               <label htmlFor="job-title">
                  Job Title
               </label>
               <Controller
                  name="job_title"
                  control={control}
                  render={({ field }) => <InputText placeholder="Input your job title" id="job-title" {...field} />}
               />
            </div>
         </div>
         <ErrorMessage error={error} />
         <div className="flex ml-auto w-11rem mt-4">
            <Button
               onClick={closeDialog}
               label={t("common.cancel")}
               className="p-button-text"
               style={{ color: "var(--accent-text-color)" }}
            />
            <Button
               disabled={!isValid}
               onClick={handleSubmit(onSubmit)}
               loading={loading}
               label={editData ? "Save" : "Create"}
               className="ml-3"
            />
         </div>
      </Dialog>
   );
}
