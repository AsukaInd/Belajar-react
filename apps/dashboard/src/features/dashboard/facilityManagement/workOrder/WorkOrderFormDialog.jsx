import { useEffect, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { Dropdown } from "primereact/dropdown";
import { getCountries } from "~/utils/getCountries";
import { yupResolver } from "@hookform/resolvers/yup";
import { workOrderSchema } from "./workOrderSchema";
import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";
import { Dropzone } from "~/components/Dropzone";
import { FilePreview } from "~/components/FilePreview";
import { ErrorMessage } from "~/components/ErrorMessage";
import { Calendar } from "primereact/calendar";
import { SelectButton } from "primereact/selectbutton";
import { useMembers } from '~/features/dashboard/facilityManagement/hooks/members/useMembers'
import { useSites } from '~/features/dashboard/facilityManagement/hooks/site/useSites'
import { useVendors } from '~/features/dashboard/facilityManagement/hooks/vendor/useVendors'
import { useAssets } from '~/features/dashboard/facilityManagement/hooks/asset/useAssets'
import { transformToDropdownOptions } from '~/utils/transformToDropdownOptions'
import { useWorkOrderAssets } from "../hooks/workOrder/useWorkOrderAssets";

export function WorkOrderFormDialog(props) {
   const {
      isOpen,
      onClose,
      title,
      save,
      loading,
      error,
      editData,
      status,
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
      getValues
   } = useForm({
      mode: "onChange",
      resolver: yupResolver(workOrderSchema),
      defaultValues: {
         name: "",
         assigned_to: "",
         due_date: "",
         description: "",
         site_id: "",
         asset_id: "",
         vendor_id: "",
         category_id: "",
         priority: "",
         files: [],
      },
   });
   const imageRef = useRef([])
   const image = watch("files");
   const disableButton = !isValid || image?.length === 0;

   const usersQuery = useMembers({ perPage: 999 })
   const sitesQuery = useSites({ perPage: 999 })
   const vendorsQuery = useVendors({ perPage: 999 })
   const assetsQuery = useWorkOrderAssets()

   const options = [
      { value: "none", label: "None" },
      { value: "low", label: "Low" },
      { value: "medium", label: "Medium" },
      { value: "high", label: "High" }
   ];

   const categoryOptions = [
      "Critical",
      "Medium",
      "Work",
      "Fixed",
   ];

   useEffect(() => {
      if (status === "success") {
         reset();
         imageRef.current = []
      }
   }, [status]);

   useEffect(() => {
      if (editData && !loading) {
         Object.entries(editData).forEach(([key, value]) => {
            if (key === 'assigned_to') {
               setValue('assigned_to', value?.id)
            } else if (key === 'site') {
               setValue('site_id', value?.id)
            } else if (key === 'asset') {
               setValue('asset_id', value?.id)
            } else if (key === 'vendor') {
               setValue('vendor_id', value?.id)
            } else if (key === 'due_date') {
               setValue(key, new Date(value))
            } else if (key !== 'assigned_by') {
               setValue(key, value);
            }
         });
      }

   }, [editData, isOpen]);

   function onSetValue(key, value, index) {
      if (index != null) {
         const filtered = image.filter((_, idx) => {
            return idx !== index
         })
         imageRef.current = filtered
         setValue(key, filtered)
      }

      if (value && index == null) {
         imageRef.current.push(value)
         setValue(key, [...imageRef.current])
      }
   }

   function onSubmit(data) {
      save(data);
   }

   function closeDialog() {
      onClose();
      imageRef.current = []

      if (!editData) {
         reset();
      }
   }

   return (
      <Dialog
         modal
         showHeader={false}
         closable={false}
         visible={isOpen}
         style={{ width: "750px" }}
         className="p-fluid"
         onHide={closeDialog}
         transitionOptions={{
            timeout: 500,
         }}
      >
         <div
            className="flex align-items-center justify-content-between border-bottom-1 pb-2 mb-4"
            style={{ borderColor: "var(--gray-50)" }}
         >
            <span className="text-xl font-bold">New Work</span>
            <Button
               icon="pi pi-times"
               className="p-button-rounded p-button-text"
               style={{ color: "var(--accent-text-color)" }}
               onClick={closeDialog}
            />
         </div>
         <div className="grid md:grid-cols-2 px-2">
            <div className="md:mr-3">
               <div className="field">
                  <label htmlFor="name">
                     Work Name
                     <span className="required-field">*</span>
                  </label>
                  <Controller
                     name="name"
                     control={control}
                     render={({ field }) => (
                        <InputText
                           id="name"
                           placeholder="What's to be done?"
                           {...field}
                        />
                     )}
                  />
                  {errors.name?.message && (
                     <small className="p-invalid">
                        {t(errors.name?.message)}
                     </small>
                  )}
               </div>
               <div className="field">
                  <label htmlFor="assign-to">
                     Assign to
                     <span className="required-field">*</span>
                  </label>
                  <Controller
                     name="assigned_to"
                     control={control}
                     render={({ field }) => (
                        <Dropdown
                           id="assign-to"
                           placeholder="Start typing name ..."
                           options={transformToDropdownOptions(
                              usersQuery.data?.data,
                              (user) => {
                                 return {
                                    label: user.first_name + " " + user.last_name,
                                    value: user.id
                                 }
                              }
                           )}
                           {...field}
                        />
                     )}
                  />
                  {errors.assigned_to?.message && (
                     <small className="p-invalid">
                        {t(errors.assigned_to?.message)}
                     </small>
                  )}
               </div>
               <div className="field">
                  <label htmlFor="due-date">
                     Due Date
                     <span className="required-field">*</span>
                  </label>
                  <Controller
                     name="due_date"
                     control={control}
                     render={({ field }) => (
                        <Calendar
                           id="due-date"
                           placeholder="mm/dd/yyyy"
                           showIcon
                           {...field}
                        />
                     )}
                  />
                  {errors.due_date?.message && (
                     <small className="p-invalid">
                        {t(errors.due_date?.message)}
                     </small>
                  )}
               </div>
               <div className="field">
                  <label htmlFor="description">
                     Work Description
                     <span className="required-field">*</span>
                  </label>
                  <Controller
                     name="description"
                     control={control}
                     render={({ field }) => (
                        <InputTextarea
                           autoResize
                           id="description"
                           placeholder="Describe your work detail"
                           rows={5}
                           cols={30}
                           style={{ minHeight: "240px" }}
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
            </div>
            <div>
               <div className="field">
                  <Dropzone
                     multiple
                     register={register}
                     file={image}
                     setValue={onSetValue}
                     valueKey="files"
                  />
               </div>
               <div className="field">
                  <label htmlFor="site">
                     Site
                     <span className="required-field">*</span>
                  </label>
                  <Controller
                     name="site_id"
                     control={control}
                     render={({ field }) => (
                        <Dropdown
                           id="site"
                           placeholder="Start typing site name ..."
                           options={transformToDropdownOptions(
                              sitesQuery.data?.data,
                              {
                                 label: 'site_name',
                                 value: 'id'
                              }
                           )}
                           {...field}
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
                  <label htmlFor="asset">Asset</label>
                  <Controller
                     name="asset_id"
                     control={control}
                     render={({ field }) => (
                        <Dropdown
                           id="asset"
                           placeholder="Start typing asset name ..."
                           options={transformToDropdownOptions(
                              assetsQuery.data?.data,
                              {
                                 label: 'name',
                                 value: 'id'
                              }
                           )}
                           {...field}
                        />
                     )}
                  />
               </div>
               <div className="field">
                  <label htmlFor="vendor">Vendor</label>
                  <Controller
                     name="vendor_id"
                     control={control}
                     render={({ field }) => (
                        <Dropdown
                           id="vendor"
                           placeholder="Start typing vendor name ..."
                           options={transformToDropdownOptions(
                              vendorsQuery.data?.data,
                              {
                                 label: "name",
                                 value: "id"
                              }
                           )}
                           {...field}
                        />
                     )}
                  />
               </div>
               <div className="field">
                  <label htmlFor="category">Category</label>
                  <Controller
                     name="category_id"
                     control={control}
                     render={({ field }) => (
                        <Dropdown
                           id="category"
                           placeholder="Start typing category name ..."
                           options={categoryOptions}
                           {...field}
                        />
                     )}
                  />
               </div>
            </div>
         </div>
         <div className="field md:w-[460px]">
            <label htmlFor="priority">Select Priority</label>
            <Controller
               name="priority"
               control={control}
               render={({ field }) => {
                  return (
                     <SelectButton
                        options={options}
                        value={field.value}
                        onChange={field.onChange}
                     />
                  );
               }}
            />
         </div>
         <div className="my-4">
            <ErrorMessage error={error} />
         </div>
         <Button
            disabled={disableButton}
            onClick={handleSubmit(onSubmit)}
            loading={loading}
            label={editData ? "Save" : "Create"}
         />
      </Dialog>
   );
}
