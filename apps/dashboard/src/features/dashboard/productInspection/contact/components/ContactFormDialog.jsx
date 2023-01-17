import { useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { Dropdown } from "primereact/dropdown";
import { yupResolver } from "@hookform/resolvers/yup";
import { contactSchema } from "./contactSchema";
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
      resolver: yupResolver(contactSchema),
      defaultValues: {
         image: null,
      },
   });

   const image = watch("image");

   useEffect(() => {
      if (status === "success") {
         reset();
      }
   }, [status]);

   function onSubmit(data) {
      console.log(data);
      console.log(errors);
      const dataContact = {
         first_name: data.first_name,
         last_name: data.last_name,
         contact_name: data.contact_name,
         phone_number: data.phone_number,
         email: data.email,
         image: data.image,
      };
      if (editData) {
         dataContact._method = "PUT";
      }
      console.log(data);
      save(dataContact);
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
                  />{" "}
                  {errors?.image?.message && (
                     <small className="text-red-500">
                        {t(errors?.image?.message)}
                     </small>
                  )}
               </div>
            )}

            <div className="field">
               <label htmlFor="first-name">
                  First Name<span className="required-field">*</span>
               </label>
               <Controller
                  name="first_name"
                  control={control}
                  defaultValue={editData?.first_name}
                  render={({ field }) => (
                     <InputText
                        disabled={isView}
                        id="first-name"
                        placeholder="Input first name"
                        {...field}
                     />
                  )}
               />
               {errors.first_name?.message && (
                  <small className="text-red-500">
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
                  defaultValue={editData?.last_name}
                  render={({ field }) => (
                     <InputText
                        disabled={isView}
                        id="last-name"
                        placeholder="Input last name"
                        {...field}
                     />
                  )}
               />
               {errors.last_name?.message && (
                  <small className="text-red-500">
                     {t(errors.last_name?.message)}
                  </small>
               )}
            </div>
            {/* <div className="field">
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
            </div> */}
            <div className="field">
               <label htmlFor="contact-name">
                  Contact Name<span className="required-field">*</span>
               </label>
               <Controller
                  name="contact_name"
                  control={control}
                  defaultValue={editData?.contact_name}
                  render={({ field }) => (
                     <InputText
                        disabled={isView}
                        id="contact-name"
                        placeholder="Input contact name"
                        {...field}
                     />
                  )}
               />
               {errors.contact_name?.message && (
                  <small className="text-red-500">
                     {t(errors.contact_name?.message)}
                  </small>
               )}
            </div>
            <div className="field">
               <label htmlFor="phone-number">
                  Phone Number<span className="required-field">*</span>
               </label>
               <Controller
                  name="phone_number"
                  control={control}
                  defaultValue={editData?.phone_number}
                  render={({ field }) => (
                     <InputText
                        disabled={isView}
                        id="phone-number"
                        placeholder="Input phone number"
                        {...field}
                     />
                  )}
               />
               {errors.phone_number?.message && (
                  <small className="text-red-500">
                     {t(errors.phone_number?.message)}
                  </small>
               )}
            </div>
            <div className="field">
               <label htmlFor="email">
                  Email<span className="required-field">*</span>
               </label>
               <Controller
                  name="email"
                  control={control}
                  defaultValue={editData?.email}
                  render={({ field }) => (
                     <InputText
                        disabled={isView}
                        id="email"
                        placeholder="Input email"
                        {...field}
                     />
                  )}
               />
               {errors.email?.message && (
                  <small className="text-red-500">
                     {t(errors.email?.message)}
                  </small>
               )}
            </div>
         </div>
         <ErrorMessage error={error} />
         {!isView && (
            <Button
               onClick={handleSubmit(onSubmit)}
               loading={loading}
               label={editData ? "Save" : "Create"}
               className="!bg-blue-500"
            />
         )}
      </Dialog>
   );
}
