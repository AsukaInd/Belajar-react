import { useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { Dropdown } from "primereact/dropdown";
import { yupResolver } from "@hookform/resolvers/yup";
import { tourStopSchema } from "./tourStopSchema";
import { ErrorMessage } from "~/components/ErrorMessage";
import { useSites } from "~/features/dashboard/facilityManagement/hooks/site/useSites";
import { transformToDropdownOptions } from "~/utils/transformToDropdownOptions";
import { InputTextarea } from "primereact/inputtextarea";
import { Message } from "primereact/message";
import { Dropzone } from "~/components/Dropzone";
import { useSearchParams } from 'react-router-dom'

export function TourStopFormDialog(props) {
   const {
      isOpen,
      onClose,
      save,
      loading,
      error,
      editData,
      status,
      isView,
   } = props;
   const sites = useSites({ perPage: 999 });
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
      resolver: yupResolver(tourStopSchema),
      defaultValues: {
         site_id: "",
         name: "",
         description: "",
         placement: "",
         image: null,
      },
   });

   const image = watch("image");
   const disableButton = !isValid || image === null;
   const [searchParams] = useSearchParams()
   const siteId = searchParams.get('siteId')

   useEffect(() => {
      if (editData && !loading) {
         Object.entries(editData).forEach(([key, value]) => {
            if (key === 'site') {
               setValue('site_id', value.id);
            } else {
               setValue(key, value);
            }
         });
      }
   }, [editData, isOpen]);

   useEffect(() => {
      if (siteId && !editData) {
         setValue('site_id', Number(siteId))
      }
   }, [siteId, isOpen])

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
               {editData ? isView ? "View Tour Stop" : "Edit Tour Stop" : "Add New Tour Stop"}
            </span>
            <Button
               icon="pi pi-times"
               className="p-button-rounded p-button-text"
               style={{ color: "var(--accent-text-color)" }}
               onClick={closeDialog}
            />
         </div>
         {isView && editData && (
            <img src={editData?.image} className="dialog-detail-image" />
         )}
         <Message
            className="mb-4"
            severity="info"
            text="This tour stop would be created automatically"
         />
         <div>
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
                        disabled={isView || editData || siteId}
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
               <label htmlFor="tour-stop-name">
                  Tour Stop Name<span className="required-field">*</span>
               </label>
               <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                     <InputText
                        placeholder="Input tour stop name"
                        disabled={isView}
                        id="tour-stop-name"
                        {...field}
                     />
                  )}
               />
               {errors.name?.message && (
                  <small className="p-invalid">{t(errors.name?.message)}</small>
               )}
            </div>
            <div className="field">
               <label htmlFor="description">
                  Description<span className="required-field">*</span>
               </label>
               <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                     <InputTextarea
                        placeholder="Input description"
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
               <label htmlFor="placement">
                  Placement Note
               </label>
               <Controller
                  name="placement"
                  control={control}
                  render={({ field }) => (
                     <InputTextarea
                        placeholder="Input placement"
                        disabled={isView}
                        id="placement"
                        rows={5}
                        cols={30}
                        {...field}
                     />
                  )}
               />
               {errors.placement?.message && (
                  <small className="p-invalid">
                     {t(errors.placement?.message)}
                  </small>
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
         </div>
         <ErrorMessage error={error} />
         {!isView && (
            <Button
               disabled={disableButton}
               onClick={handleSubmit(onSubmit)}
               loading={loading}
               label={editData ? "Save Changes" : "Create"}
            />
         )}
      </Dialog>
   );
}
