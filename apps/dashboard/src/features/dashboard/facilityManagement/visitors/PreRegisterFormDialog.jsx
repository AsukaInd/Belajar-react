import { useEffect, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { Dropdown } from "primereact/dropdown";
import { yupResolver } from "@hookform/resolvers/yup";
import { preregisterSchema } from "./preregisterSchema";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropzone } from "~/components/Dropzone";
import { ErrorMessage } from "~/components/ErrorMessage";
import { Calendar } from "primereact/calendar";
import { useHosts } from '~/features/dashboard/facilityManagement/hooks/preregisterVisitor/useHosts'
import { transformToDropdownOptions } from '~/utils/transformToDropdownOptions'
import { useVisitorSites } from "../hooks/preregisterVisitor/useVisitorSites";

export function PreRegisterFormDialog(props) {
   const {
      isOpen,
      onClose,
      save,
      loading,
      error,
      editData,
      status,
      title = "Pre Register Visitor"
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
   } = useForm({
      mode: "onChange",
      resolver: yupResolver(preregisterSchema),
      defaultValues: {
         host_id: "",
         // site_id: "",
         company: "",
         first_name: "",
         last_name: "",
         email: "",
         phone: "",
         start_date: "",
         end_date: "",
         purpose_of_visit: "",
         notes: "",
         files: [],

         destination: "0",
         pass_type: "temporary"
      },
   });
   const imageRef = useRef([])
   const image = watch("files");

   const hostsQuery = useHosts()
   const visitorSitesQuery = useVisitorSites()

   useEffect(() => {
      if (status === "success" && !error) {
         reset();
         imageRef.current = []
      }
   }, [status]);

   useEffect(() => {
      if (editData && !loading) {
         Object.entries(editData).forEach(([key, value]) => {
            if (key === 'host') {
               setValue('host_id', value?.id)
            } else if (key === 'site') {
               setValue('site_id', value?.id)
            } else if (key === 'start_date' || key === 'end_date') {
               setValue(key, new Date(value))
            } else {
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
            <span className="text-xl font-bold">{title}</span>
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
                  <label htmlFor="first-name">
                     First Name
                     <span className="required-field">*</span>
                  </label>
                  <Controller
                     name="first_name"
                     control={control}
                     render={({ field }) => (
                        <InputText
                           id="first-name"
                           placeholder="Input the first name ..."
                           {...field}
                        />
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
                     Last Name
                     <span className="required-field">*</span>
                  </label>
                  <Controller
                     name="last_name"
                     control={control}
                     render={({ field }) => (
                        <InputText
                           id="last-name"
                           placeholder="Input the last name ..."
                           {...field}
                        />
                     )}
                  />
                  {errors.last_name?.message && (
                     <small className="p-invalid">
                        {t(errors.last_name?.message)}
                     </small>
                  )}
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
                        <InputText
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
                  <label htmlFor="company">
                     Company
                     <span className="required-field">*</span>
                  </label>
                  <Controller
                     name="company"
                     control={control}
                     render={({ field }) => (
                        <InputText
                           id="company"
                           placeholder="Input the company name ..."
                           {...field}
                        />
                     )}
                  />
                  {errors.company?.message && (
                     <small className="p-invalid">
                        {t(errors.company?.message)}
                     </small>
                  )}
               </div>
               <div className="field">
                  <label htmlFor="start-date">
                     Start Date
                     <span className="required-field">*</span>
                  </label>
                  <Controller
                     name="start_date"
                     control={control}
                     render={({ field }) => (
                        <Calendar
                           id="start-date"
                           placeholder="mm/dd/yyyy"
                           showIcon
                           readOnlyInput
                           maxDate={watch('end_date') || null}
                           {...field}
                        />
                     )}
                  />
                  {errors.start_date?.message && (
                     <small className="p-invalid">
                        {t(errors.start_date?.message)}
                     </small>
                  )}
               </div>
               <div className="field">
                  <label htmlFor="end-date">
                     End Date
                     <span className="required-field">*</span>
                  </label>
                  <Controller
                     name="end_date"
                     control={control}
                     render={({ field }) => (
                        <Calendar
                           id="end-date"
                           placeholder="mm/dd/yyyy"
                           showIcon
                           readOnlyInput
                           minDate={watch('start_date') || null}
                           {...field}

                        />
                     )}
                  />
                  {errors.end_date?.message && (
                     <small className="p-invalid">
                        {t(errors.end_date?.message)}
                     </small>
                  )}
               </div>
            </div>
            <div>
               <div className="field">
                  <label htmlFor="host-name">
                     Host Name
                     <span className="required-field">*</span>
                  </label>
                  <Controller
                     name="host_id"
                     control={control}
                     render={({ field }) => (
                        <Dropdown
                           id="host-name"
                           placeholder="Start typing name ..."
                           options={transformToDropdownOptions(
                              hostsQuery.data?.data,
                              (host) => {
                                 return {
                                    label: host.first_name + " " + host.last_name,
                                    value: host.id
                                 }
                              }
                           )}
                           {...field}
                        />
                     )}
                  />
                  {errors.host_id?.message && (
                     <small className="p-invalid">
                        {t(errors.host_id?.message)}
                     </small>
                  )}
               </div>
               <div className="field">
                  <label htmlFor="site-name">
                     Site
                     <span className="required-field">*</span>
                  </label>
                  <Controller
                     name="site_id"
                     control={control}
                     render={({ field }) => (
                        <Dropdown
                           id="site-name"
                           placeholder="Start typing site name ..."
                           options={transformToDropdownOptions(
                              visitorSitesQuery.data?.data,
                              { label: 'site_name', value: 'id' }
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
                  <label htmlFor="purpose">
                     Purpose Of Visit
                  </label>
                  <Controller
                     name="purpose_of_visit"
                     control={control}
                     render={({ field }) => (
                        <InputTextarea
                           className="min-h-[234px]"
                           placeholder="Input purpose of visit here ..."
                           id="purpose"
                           rows={7}
                           cols={30}
                           {...field}
                        />
                     )}
                  />
               </div>
               <div className="field">
                  <label htmlFor="notes">
                     Notes
                  </label>
                  <Controller
                     name="notes"
                     control={control}
                     render={({ field }) => (
                        <InputTextarea
                           className="min-h-[234px]"
                           placeholder="Input notes here ..."
                           id="notes"
                           rows={7}
                           cols={30}
                           {...field}
                        />
                     )}
                  />
               </div>
            </div>
         </div>
         <div>
            {
               editData
                  ? (
                     <div className="flex flex-wrap justify-center gap-4">
                        {
                           editData.files.map((file, index) => {
                              return <img className="w-[300px] max-h-[250px] object-contain" key={index} src={file} />
                           })
                        }
                     </div>
                  )
                  : (
                     <Dropzone
                        multiple
                        register={register}
                        file={image}
                        setValue={onSetValue}
                        valueKey="files"
                        isRequired={false}
                     />
                  )
            }
         </div>
         <div className="my-4">
            <ErrorMessage error={error} />
         </div>
         <Button
            disabled={!isValid}
            onClick={handleSubmit(onSubmit)}
            loading={loading}
            label={editData ? "Save" : "Create"}
         />
      </Dialog>
   );
}
