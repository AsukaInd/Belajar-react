import { useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { Dropdown } from "primereact/dropdown";
import { getCountries } from "~/utils/getCountries";
import { yupResolver } from "@hookform/resolvers/yup";
import { clientSchema } from "./clientSchema";
// import { PhoneInput } from "~/components/PhoneInput";
import { industryType } from "./industryType";
import { supplierType } from "./supplierType";
import { transformDropdownType } from "~/utils/transformDropdownType";
import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";
import { Dropzone } from "~/components/Dropzone";
import { FilePreview } from "~/components/FilePreview";
import { ErrorMessage } from "~/components/ErrorMessage";
import { useUploadProfileImage } from "~/features/dashboard/facilityManagement/hooks/client/useUploadProfileImage";

export function ClientFormDialog(props) {
   const {
      isOpen,
      onClose,
      title,
      save,
      loading,
      error,
      editData,
      status,
      isView,
      editForm,
   } = props;
   const { t } = useTranslation();
   const {
      control,
      handleSubmit,
      formState: { errors, isValid },
      reset,
      setValue,
      register,
      watch,
      getValues,
   } = useForm({
      mode: "onChange",
      resolver: yupResolver(clientSchema),
      defaultValues: {
         company_name: "",
         local_company_name: "",
         email: "",
         address: "",
         local_address_name: "",
         country: "",
         state: "",
         city: "",
         postal_code: "",
         industry_type: "",
         supplier_type: "",
         timezone: "-",
         profile_image: null,
         phone: "",
      },
   });
   const profile_image = watch("profile_image");
   const countries = getCountries();
   const disableButton = !isValid || profile_image === null;
   const uploadProfileImg = useUploadProfileImage();

   useEffect(() => {
      if (status === "success") {
         reset();
      }
   }, [status]);

   useEffect(() => {
      if (editData && !loading) {
         Object.entries(editData).forEach(([key, value]) => {
            setValue(
               key,
               key === "country" ? { name: value } : value === null ? "" : value
            );
         });
      }
   }, [editData, isOpen]);

   function onSubmit(data) {
      save(data);
   }

   function closeDialog() {
      onClose();

      if(!editData) {
         reset();
      }
   }

   return (
      <Dialog
         modal
         showHeader={false}
         closable={false}
         visible={isOpen}
         style={{ width: "600px" }}
         className="p-fluid client-form-dialog"
         onHide={closeDialog}
         transitionOptions={{
            timeout: 500,
         }}
      >
         <div
            className="flex align-items-center justify-content-between border-bottom-1 pb-2 mb-4"
            style={{ borderColor: "var(--gray-50)" }}
         >
            <span className="text-xl font-bold">{title}</span>
            <Button
               icon="pi pi-times"
               className="p-button-rounded p-button-text"
               style={{ color: "var(--accent-text-color)" }}
               onClick={closeDialog}
            />
         </div>
         {editData && (
            <div className="edit-view-profile-picture">
               <div className="flex align-items-center">
                  {profile_image instanceof File ? (
                     <FilePreview files={profile_image} />
                  ) : (
                     <img src={profile_image} />
                  )}
                  <div className="ml-4">
                     <span className="block text-xl font-bold">
                        Profile image
                     </span>
                     <span
                        className="text-sm"
                        style={{ color: "var(--accent-text-color)" }}
                     >
                        You can change this photo
                     </span>
                  </div>
               </div>
               <div
                  className={classNames(
                     "p-button w-max p-button-outlined p-0",
                     {
                        "p-button:disabled": uploadProfileImg.isLoading,
                     }
                  )}
                  style={{
                     color: uploadProfileImg.isLoading ? "var(--gray-500)" : "",
                  }}
               >
                  <label htmlFor="upload">
                     {uploadProfileImg.isLoading && (
                        <span className="p-button-icon p-c p-button-loading-icon p-button-icon-left pi pi-spinner pi-spin"></span>
                     )}
                     Upload new image
                  </label>
                  <input
                     disabled={uploadProfileImg.isLoading}
                     style={{ display: "none" }}
                     type="file"
                     id="upload"
                     {...register("profile_image")}
                     onChange={(event) => {
                        const fields = getValues();
                        uploadProfileImg.mutate({
                           ...fields,
                           profile_image: event.target.files[0],
                        });
                     }}
                  />
               </div>
            </div>
         )}
         <div className="grid grid-cols-2">
            <div className="col">
               <div className="field">
                  <label htmlFor="name">
                     {t("dashboard.client.company-name")}
                     <span className="required-field">*</span>
                  </label>
                  <Controller
                     name="company_name"
                     control={control}
                     render={({ field }) => (
                        <InputText placeholder="Input company name" disabled={isView} id="name" {...field} />
                     )}
                  />
                  {errors.company_name?.message && (
                     <small className="p-invalid">
                        {t(errors.company_name?.message)}
                     </small>
                  )}
               </div>
               <div className="field">
                  <label htmlFor="local-name">Name In Local Language</label>
                  <Controller
                     name="local_company_name"
                     control={control}
                     render={({ field }) => (
                        <InputText
                           placeholder="Input name"
                           disabled={isView}
                           id="local-name"
                           {...field}
                        />
                     )}
                  />
               </div>
               <div className="field">
                  <label htmlFor="email">Email Address</label>
                  <span className="required-field">*</span>
                  <Controller
                     name="email"
                     control={control}
                     render={({ field }) => (
                        <InputText
                           placeholder="example@example.com"
                           disabled={isView}
                           type="email"
                           id="email"
                           {...field}
                        />
                     )}
                  />
                  {errors.email?.message && (
                     <small className="p-invalid">
                        {t(errors.email?.message)}
                     </small>
                  )}
               </div>
               <div className="field">
                  <label htmlFor="phone">Phone Number</label>
                  <span className="required-field">*</span>
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
                        <InputText
                           disabled={isView}
                           placeholder="+0000000000000"
                           type="tel"
                           id="phone"
                           {...field}
                        />
                     )}
                  />
                  {errors.phone?.message && (
                     <small className="p-invalid">
                        {t(errors.phone?.message)}
                     </small>
                  )}
               </div>
               <div className="field">
                  <label htmlFor="industry-type">Industry Type</label>
                  <span className="required-field">*</span>
                  <Controller
                     name="industry_type"
                     control={control}
                     render={({ field }) => (
                        <Dropdown
                           id="industry-type"
                           value={field.value}
                           options={transformDropdownType(
                              industryType,
                              "industry-type"
                           )}
                           onChange={field.onChange}
                           placeholder={t(
                              "dashboard.client.select-industry-type"
                           )}
                        />
                     )}
                  />
                  {errors.industry_type?.message && (
                     <small className="p-invalid">
                        {t(errors.industry_type?.message)}
                     </small>
                  )}
               </div>
               <div className="field">
                  <label htmlFor="supplier-type">Suppiler Type</label>
                  <span className="required-field">*</span>
                  <Controller
                     name="supplier_type"
                     control={control}
                     render={({ field }) => (
                        <Dropdown
                           id="supplier-type"
                           value={field.value}
                           options={transformDropdownType(
                              supplierType,
                              "supplier-type"
                           )}
                           onChange={field.onChange}
                           placeholder={t(
                              "dashboard.client.select-supplier-type"
                           )}
                        />
                     )}
                  />
                  {errors.supplier_type?.message && (
                     <small className="p-invalid">
                        {t(errors.supplier_type?.message)}
                     </small>
                  )}
               </div>
            </div>
            <div className="col">
               <div className="field">
                  <label htmlFor="country">
                     {t("common.country")}
                     <span className="required-field">*</span>
                  </label>
                  <Controller
                     name="country"
                     control={control}
                     render={({ field }) => (
                        <Dropdown
                           disabled={isView}
                           value={field.value}
                           options={countries}
                           onChange={field.onChange}
                           optionLabel="name"
                           filter
                           filterBy="name"
                           placeholder="Choose your country"
                        />
                     )}
                  />
                  {errors.country?.message && (
                     <small className="p-invalid">
                        {t(errors.country?.message)}
                     </small>
                  )}
               </div>
               <div className="field">
                  <label htmlFor="city">
                     {t("common.city")}
                     <span className="required-field">*</span>
                  </label>
                  <Controller
                     name="city"
                     control={control}
                     render={({ field }) => (
                        <InputText placeholder="Input your city" disabled={isView} id="city" {...field} />
                     )}
                  />
                  {errors.city?.message && (
                     <small className="p-invalid">
                        {t(errors.city?.message)}
                     </small>
                  )}
               </div>
               <div className="field">
                  <label htmlFor="state">
                     Province / State
                     <span className="required-field">*</span>
                  </label>
                  <Controller
                     name="state"
                     control={control}
                     render={({ field }) => (
                        <InputText placeholder="Input your province/state" disabled={isView} id="state" {...field} />
                     )}
                  />
                  {errors.state?.message && (
                     <small className="p-invalid">
                        {t(errors.state?.message)}
                     </small>
                  )}
               </div>
               <div className="field">
                  <label htmlFor="postal-code">
                     Zip Postal Code
                     <span className="required-field">*</span>
                  </label>
                  <Controller
                     name="postal_code"
                     control={control}
                     render={({ field }) => (
                        <InputText
                           placeholder="Input zip postal code"
                           disabled={isView}
                           id="postal-code"
                           {...field}
                        />
                     )}
                  />
                  {errors.postal_code?.message && (
                     <small className="p-invalid">
                        {t(errors.postal_code?.message)}
                     </small>
                  )}
               </div>
               <div className="field">
                  <label htmlFor="address">
                     {t("common.address")}
                     <span className="required-field">*</span>
                  </label>
                  <Controller
                     name="address"
                     control={control}
                     render={({ field }) => (
                        <InputTextarea
                           autoResize
                           placeholder="Input address"
                           className="address"
                           disabled={isView}
                           id="address"
                           rows={5}
                           cols={30}
                           {...field}
                        />
                     )}
                  />
                  {errors.address?.message && (
                     <small className="p-invalid">
                        {t(errors.address?.message)}
                     </small>
                  )}
               </div>
            </div>
         </div>
         {!editData && (
            <Dropzone
               register={register}
               file={profile_image}
               setValue={setValue}
            />
         )}
         {errors.profile_image?.message && (
            <small className="p-invalid">
               {t(errors.profile_image?.message)}
            </small>
         )}
         <div className="my-4">
            <ErrorMessage error={error} />
         </div>
         <div className="flex ml-auto w-11rem mt-4">
            {isView ? (
               <Button
                  className="p-button-outlined w-max ml-auto"
                  label="Edit Client"
                  style={{ color: "var(--accent-text-color)" }}
                  onClick={editForm}
               />
            ) : (
               <>
                  <Button
                     onClick={closeDialog}
                     label={t("common.cancel")}
                     className="p-button-text"
                     style={{ color: "var(--accent-text-color)" }}
                  />
                  <Button
                     disabled={disableButton}
                     onClick={handleSubmit(onSubmit)}
                     loading={loading}
                     label={editData ? "Save" : "Create"}
                     className="ml-3"
                  />
               </>
            )}
         </div>
      </Dialog>
   );
}
