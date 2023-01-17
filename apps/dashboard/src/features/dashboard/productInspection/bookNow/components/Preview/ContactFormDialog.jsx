import { useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { Dropdown } from "primereact/dropdown";
import { yupResolver } from "@hookform/resolvers/yup";
import { assetSchema } from "./contactSchema";
import { ErrorMessage } from "~/components/ErrorMessage";
import { Dropzone } from "~/components/Dropzone";

export function ContactFormDialog(props) {
   const { isOpen, onClose, save, loading, error, editData, status, isView } =
      props;

   const { t } = useTranslation();
   const {
      control,
      handleSubmit,
      formState: { errors, isValid },
      reset,
      setValue,
      register,
      watch,
   } = useForm({
      mode: "onChange",
      resolver: yupResolver(assetSchema),
      defaultValues: {
         name: "",
         location: "",
         type: "",
         assign_to: "",
         vendor_id: "",
         image: null,
      },
   });

   const image = watch("image");
   const disableButton = !isValid || image === null;

   useEffect(() => {
      if (editData && !loading) {
         Object.entries(editData).forEach(([key, value]) => {
            if (key === "vendor") {
               setValue("vendor_id", value.id);
            } else {
               setValue(key, value);
            }
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
         className="p-fluid asset-form-dialog"
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
               {isView ? (
                  <span>
                     View Contact{" "}
                     <span style={{ color: "var(--primary-color)" }}>
                        {editData?.id}
                     </span>
                  </span>
               ) : editData ? (
                  "Edit Contact"
               ) : (
                  "Add New Contact"
               )}
            </span>
            <Button
               icon="pi pi-times"
               className="p-button-rounded p-button-text"
               style={{ color: "var(--accent-text-color)" }}
               onClick={closeDialog}
            />
         </div>
         <div>
            {isView && editData && (
               <img src={editData?.image} className="dialog-detail-image" />
            )}

            {!isView && (
               <div className="my-4">
                  <Dropzone
                     register={register}
                     file={image}
                     setValue={setValue}
                     valueKey="image"
                     isEdit={Boolean(editData)}
                  />
               </div>
            )}
            <div className="field">
               <label htmlFor="first-name">
                  First Name<span className="required-field">*</span>
               </label>
               <Controller
                  name="first_name"
                  control={control}
                  render={({ field }) => (
                     <InputText
                        disabled={isView}
                        id="first-name"
                        placeholder="Input first name"
                        {...field}
                     />
                  )}
               />
               {errors.name?.message && (
                  <small className="p-invalid">{t(errors.name?.message)}</small>
               )}
            </div>
            <div className="field">
               <label htmlFor="last-name">
                  First Name<span className="required-field">*</span>
               </label>
               <Controller
                  name="last_name"
                  control={control}
                  render={({ field }) => (
                     <InputText
                        disabled={isView}
                        id="last-name"
                        placeholder="Input last name"
                        {...field}
                     />
                  )}
               />
               {errors.name?.message && (
                  <small className="p-invalid">{t(errors.name?.message)}</small>
               )}
            </div>
            <div className="field">
               <label htmlFor="position">
                  Position<span className="required-field">*</span>
               </label>
               <Controller
                  name="position"
                  control={control}
                  render={({ field }) => (
                     <Dropdown
                        disabled={isView}
                        id="position"
                        options={[
                           { value: "Team Owner", label: "team_owner" },
                           { value: "Team Editor", label: "team_editor" },
                           { value: "Sales Manager", label: "sales_manager" },
                        ]}
                        placeholder="Select Position"
                        value={field.value}
                        onChange={field.onChange}
                     />
                  )}
               />
               {errors.type?.message && (
                  <small className="p-invalid">{t(errors.type?.message)}</small>
               )}
            </div>
            <div className="field">
               <label htmlFor="contact-name">
                  Contact Name<span className="required-field">*</span>
               </label>
               <Controller
                  name="contact_name"
                  control={control}
                  render={({ field }) => (
                     <InputText
                        disabled={isView}
                        id="contact-name"
                        placeholder="Input contact name"
                        {...field}
                     />
                  )}
               />
               {errors.name?.message && (
                  <small className="p-invalid">{t(errors.name?.message)}</small>
               )}
            </div>
            <div className="field">
               <label htmlFor="phone-number">
                  Phone Number<span className="required-field">*</span>
               </label>
               <Controller
                  name="phone_number"
                  control={control}
                  render={({ field }) => (
                     <InputText
                        disabled={isView}
                        id="phone-number"
                        placeholder="Input phone number"
                        {...field}
                     />
                  )}
               />
               {errors.name?.message && (
                  <small className="p-invalid">{t(errors.name?.message)}</small>
               )}
            </div>

            <div className="field">
               <label htmlFor="email">
                  Email<span className="required-field">*</span>
               </label>
               <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                     <InputText
                        disabled={isView}
                        id="email"
                        placeholder="Input email"
                        {...field}
                     />
                  )}
               />
               {errors.name?.message && (
                  <small className="p-invalid">{t(errors.name?.message)}</small>
               )}
            </div>
         </div>
         <ErrorMessage error={error} />
         {!isView && (
            <Button
               disabled={disableButton}
               onClick={handleSubmit(onSubmit)}
               loading={loading}
               label={editData ? "Save" : "Create"}
            />
         )}
      </Dialog>
   );
}
