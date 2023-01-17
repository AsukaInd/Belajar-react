import { useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
// import { Dropdown } from "primereact/dropdown";
// import { getCountries } from "~/utils/getCountries";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { gigsSchema } from "./gigsSchema";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropzone } from "~/components/Dropzone";
import { ErrorMessage } from "~/components/ErrorMessage";
import { useUploadImage } from "../hooks/gigs/useUploadImage";
import { classNames } from "primereact/utils";
import { FilePreview } from "~/components/FilePreview";

export function GigsForm(props) {
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
      // resolver: yupResolver(gigsSchema),
      defaultValues: {
         title: "",
         seo_title: "",
         description: "",
         category_id: 1,
         sub_category_id: 1,
         gig_photos: [
            {
               image: null,
            }
         ],
         package_gig: [
            {
               level_package: "",
               name_package: "",
               description: "",
               price_package: "",
               revision_package_id: "1",
               delivery_time_package_id: "1",
               delivery_time: "1",
               revision_limit: "1",
            },
         ],
         legal_doc: "1",
         // faqs_gigs: [
         //    {
         //       project_detail_name: "",
         //       description_faq: "",
         //    }
         // ]
      },
   });
   const image = watch("gig_photos[0].image");
   const disableButton = !isValid || image === null;
   const uploadImage = useUploadImage();

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
   }, [editData]);

   function onSubmit(data) {
      save(data);
   }

   function closeDialog() {
      onClose();
      reset();
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
         <div className="grid grid-cols-2">
            <div className="col">
               <div className="field">
                  <label htmlFor="name">
                     Title
                     <span className="required-field">*</span>
                  </label>
                  <Controller
                     name="title"
                     control={control}
                     render={({ field }) => (
                        <InputText disabled={isView} id="name" {...field} />
                     )}
                  />
                  {errors.title?.message && (
                     <small className="p-invalid">
                        {t(errors.title?.message)}
                     </small>
                  )}
               </div>
               <div className="field">
                  <label htmlFor="local-name">SEO Title</label>
                  <Controller
                     name="seo_title"
                     control={control}
                     render={({ field }) => (
                        <InputText
                           disabled={isView}
                           id="seo-title"
                           {...field}
                        />
                     )}
                  />
               </div>
               <div className="field">
                  <label htmlFor="description">Description</label>
                  <span className="required-field">*</span>
                  <Controller
                     name="description"
                     control={control}
                     render={({ field }) => (
                        <InputTextarea
                           disabled={isView}
                           id="description"
                           rows={7}
                           cols={50}
                           {...field}
                        />
                     )}
                  />
                  {errors.description?.message && (
                     <small className="p-invalid">
                        {t(errors.description?.message)}
                     </small>
                  )}
               </div>
               <div className="field">
                  <label htmlFor="phone">Level Package</label>
                  <span className="required-field">*</span>
                  <Controller
                     name="package_gig.0.level_package"
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
                           id="level"
                           {...field}
                        />
                     )}
                  />
               </div>
               <div className="field">
                  <label htmlFor="industry-type">Package name</label>
                  <span className="required-field">*</span>
                  <Controller
                     name="package_gig.0.name_package"
                     control={control}
                     render={({ field }) => (
                        // <Dropdown
                        //    id="industry-type"
                        //    value={field.value}
                        //    options={transformDropdownType(
                        //       industryType,
                        //       "industry-type"
                        //    )}
                        //    onChange={field.onChange}
                        //    placeholder={t(
                        //       "dashboard.client.select-industry-type"
                        //    )}
                        // />
                        <InputText
                           disabled={isView}
                           id="name-package"
                           {...field}
                        />
                     )}
                  />
               </div>
               <div className="field">
                  <label htmlFor="supplier-type">Description Package</label>
                  <span className="required-field">*</span>
                  <Controller
                     name="package_gig.0.description"
                     control={control}
                     render={({ field }) => (
                        // <Dropdown
                        //    id="supplier-type"
                        //    value={field.value}
                        //    options={transformDropdownType(
                        //       supplierType,
                        //       "supplier-type"
                        //    )}
                        //    onChange={field.onChange}
                        //    placeholder={t(
                        //       "dashboard.client.select-supplier-type"
                        //    )}
                        // />
                        <InputText
                           disabled={isView}
                           id="description-package"
                           {...field}
                        />
                     )}
                  />
               </div>
            </div>
            <div className="col">
               <div className="field">
                  <label htmlFor="supplier-type">Price Package</label>
                  <span className="required-field">*</span>
                  <Controller
                     name="package_gig.0.price_package"
                     control={control}
                     render={({ field }) => (
                        <InputText
                           disabled={isView}
                           id="price-package"
                           {...field}
                        />
                     )}
                  />
               </div>
               {/* <div className="field">
                  <label htmlFor="supplier-type">Faqs Gigs Project Name</label>
                  <span className="required-field">*</span>
                  <Controller
                     name="faqs_gigs.0.project_detail_name"
                     control={control}
                     render={({ field }) => (
                        <InputText
                           disabled={isView}
                           id="projectdetailname"
                           {...field}
                        />
                     )}
                  />
               </div>
               <div className="field">
                  <label htmlFor="supplier-type">Description Faq</label>
                  <span className="required-field">*</span>
                  <Controller
                     name="faqs_gigs.0.description_faq"
                     control={control}
                     render={({ field }) => (
                        <InputText
                           disabled={isView}
                           id="description-faq"
                           {...field}
                        />
                     )}
                  />
               </div> */}
               {editData && (
                  <div className="edit-view-profile-picture">
                     <div className="flex align-items-center">
                        {image instanceof File ? (
                           <FilePreview files={image} />
                        ) : (
                           <img src={image} />
                        )}
                        <div className="ml-4">
                           <span className="block text-xl font-bold">
                              Gigs image
                           </span>
                           <span
                              className="text-sm"
                              style={{ color: "var(--accent-text-color)" }}
                           >
                              You can change this image
                           </span>
                        </div>
                     </div>
                     <div
                        className={classNames(
                           "p-button w-max p-button-outlined p-0",
                           {
                              "p-button:disabled": uploadImage.isLoading,
                           }
                        )}
                        style={{
                           color: uploadImage.isLoading ? "var(--gray-500)" : "",
                        }}
                     >
                        <label htmlFor="upload">
                           {uploadImage.isLoading && (
                              <span className="p-button-icon p-c p-button-loading-icon p-button-icon-left pi pi-spinner pi-spin"></span>
                           )}
                           Upload new image
                        </label>
                        <input
                           // disabled={uploadImage.isLoading}
                           style={{ display: "none" }}
                           type="file"
                           id="upload"
                           {...register(`gig_photos.${0}.image`)}
                           onChange={(event) => {
                              const fields = getValues();
                              uploadImage.mutate({
                                 ...fields,
                                 gig_photos: event.target.files[0],
                              });
                           }}
                        />
                     </div>
                  </div>
               )}
            </div>
         </div>
         {!editData && (
            <Dropzone
               register={register}
               file={image}
               setValue={setValue}
               valueKey="gig_photos[0].image"
            />
         )}
         {errors.image?.message && (
            <small className="p-invalid">
               {t(errors.image?.message)}
            </small>
         )}
         <div className="my-4">
            <ErrorMessage error={error} />
         </div>
         <div className="flex ml-auto w-11rem mt-4">
            {isView ? (
               <Button
                  className="p-button-outlined w-max ml-auto"
                  label="Edit Gigs"
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