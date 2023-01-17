import { useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { Dropdown } from "primereact/dropdown";
import { yupResolver } from "@hookform/resolvers/yup";
import { assetSchema } from "./assetSchema";
import { ErrorMessage } from "~/components/ErrorMessage";
import { transformToDropdownOptions } from "~/utils/transformToDropdownOptions";
import { Dropzone } from "~/components/Dropzone";
import { IconLocation } from "~/components/icons/IconLocation";
import { useAssetsVendors } from '~/features/dashboard/facilityManagement/hooks/asset/useAssetsVendors'
import { useAllAssignees } from '~/features/dashboard/facilityManagement/hooks/asset/useAllAssignees'
import { assetTypeOptions } from "./assetTypeOptions";

export function AssetFormDialog(props) {
   const {
      isOpen,
      onClose,
      save,
      loading,
      error,
      editData,
      status,
      isView
   } = props;

   const assetsVendors = useAssetsVendors()
   const allAssigneesQuery = useAllAssignees()

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
            if (key === 'vendor') {
               setValue('vendor_id', value?.id);
            } else if (key === 'assignee') {
               setValue('assign_to', value?.id);
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
                     View Asset{" "}
                     <span style={{ color: "var(--primary-color)" }}>
                        {editData?.id}
                     </span>
                  </span>
               ) : editData ? (
                  "Edit Asset"
               ) : (
                  "Add New Asset"
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
               <label htmlFor="asset-name">
                  Asset Name<span className="required-field">*</span>
               </label>
               <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                     <InputText
                        disabled={isView}
                        id="asset-name"
                        placeholder="Input your asset name ..."
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
               <label htmlFor="asset-type">
                  Type<span className="required-field">*</span>
               </label>
               <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                     <Dropdown
                        disabled={isView}
                        id="asset-type"
                        options={assetTypeOptions}
                        placeholder="Choose your asset type ..."
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
               <label htmlFor="assign-to">
                  Assign to<span className="required-field">*</span>
               </label>
               <Controller
                  name="assign_to"
                  control={control}
                  render={({ field }) => (
                     <Dropdown
                        disabled={isView}
                        id="assign-to"
                        options={transformToDropdownOptions(
                           allAssigneesQuery?.data?.data,
                           { label: 'name', value: 'id' }
                        )}
                        placeholder="Start typing name ..."
                        value={field.value}
                        onChange={field.onChange}
                     />
                  )}
               />
               {errors.assign_to?.message && (
                  <small className="p-invalid">
                     {t(errors.assign_to?.message)}
                  </small>
               )}
            </div>
            <div className="field">
               <label htmlFor="vendor">
                  Vendor<span className="required-field">*</span>
               </label>
               <Controller
                  name="vendor_id"
                  control={control}
                  render={({ field }) => (
                     <Dropdown
                        disabled={isView}
                        id="vendor"
                        options={transformToDropdownOptions(
                           assetsVendors?.data?.data,
                           { label: 'name', value: 'id' }
                        )}
                        placeholder="Choose your vendor ..."
                        value={field.value}
                        onChange={field.onChange}
                     />
                  )}
               />
               {errors.vendor_id?.message && (
                  <small className="p-invalid">
                     {t(errors.vendor_id?.message)}
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
