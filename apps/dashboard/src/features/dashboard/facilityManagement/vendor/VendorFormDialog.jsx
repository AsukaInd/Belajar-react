import { useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { Dropdown } from "primereact/dropdown";
import { yupResolver } from "@hookform/resolvers/yup";
import { vendorSchema } from "./vendorSchema";
import { ErrorMessage } from "~/components/ErrorMessage";
import { Dropzone } from "~/components/Dropzone";
import { IconLocation } from "~/components/icons/IconLocation";
import { InputTextarea } from "primereact/inputtextarea";
import { useAssets } from "../hooks/asset/useAssets";
import { transformToDropdownOptions } from '~/utils/transformToDropdownOptions'
import { useVendorAssets } from "../hooks/vendor/useVendorAssets";

export function VendorFormDialog(props) {
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
      resolver: yupResolver(vendorSchema),
      defaultValues: {
         name: "",
         location: "",
         description: "",
         asset_id: "",
         image: null,
      },
   });

   const image = watch("image");
   const disableButton = !isValid || image === null;

   const assetsQuery = useVendorAssets()

   useEffect(() => {
      if (editData && !loading) {
         Object.entries(editData).forEach(([key, value]) => {
            if (key === 'assets') {
               if (value?.length > 0) {
                  setValue('asset_id', value[0].id)
               } else {
                  setValue('asset_id', null)
               }
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
         className="p-fluid"
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
                     View Vendor{" "}
                     <span style={{ color: "var(--primary-color)" }}>
                        {editData?.id}
                     </span>
                  </span>
               ) : editData ? (
                  "Edit Vendor"
               ) : (
                  "Add New Vendor"
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
            <div className="field">
               <label htmlFor="vendor-name">
                  Vendor Name<span className="required-field">*</span>
               </label>
               <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                     <InputText
                        disabled={isView}
                        id="vendor-name"
                        placeholder="Input your vendor name ..."
                        {...field}
                     />
                  )}
               />
               {errors.name?.message && (
                  <small className="p-invalid">{t(errors.name?.message)}</small>
               )}
            </div>
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
               <label htmlFor="description">
                  Description<span className="required-field">*</span>
               </label>
               <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                     <InputTextarea
                        placeholder="Input your description here"
                        disabled={isView}
                        id="description"
                        rows={5}
                        cols={30}
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
               <label htmlFor="location">
                  Location<span className="required-field">*</span>
               </label>
               <Controller
                  name="location"
                  control={control}
                  render={({ field }) => (
                     <span className="p-input-icon-left">
                        <IconLocation
                           width="20"
                           height="20"
                           style={{ color: "var(--primary-color)" }}
                        />
                        <InputText
                           disabled={isView}
                           id="location"
                           placeholder="Choose your location here ..."
                           {...field}
                        />
                     </span>
                  )}
               />
               {errors.location?.message && (
                  <small className="p-invalid">
                     {t(errors.location?.message)}
                  </small>
               )}
            </div>
            <div className="field">
               <label htmlFor="asset">
                  Asset
               </label>
               <Controller
                  name="asset_id"
                  control={control}
                  render={({ field }) => (
                     <Dropdown
                        disabled={isView}
                        id="asset"
                        options={transformToDropdownOptions(assetsQuery.data?.data)}
                        placeholder="Choose your asset type ..."
                        value={field.value}
                        onChange={field.onChange}
                     />
                  )}
               />
               {errors.asset?.message && (
                  <small className="p-invalid">
                     {t(errors.asset?.message)}
                  </small>
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
