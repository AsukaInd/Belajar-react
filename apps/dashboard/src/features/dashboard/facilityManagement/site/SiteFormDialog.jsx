import { useEffect, useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { Dropdown } from "primereact/dropdown";
import { yupResolver } from "@hookform/resolvers/yup";
import { siteSchema } from "./siteSchema";
import { ErrorMessage } from "~/components/ErrorMessage";
import { Mapbox } from "./Mapbox";
import { useCountries } from "../hooks/useCountries";
import { useStates } from "../hooks/useStates";
import { Message } from "primereact/message";
import { Dropzone } from "~/components/Dropzone";

export function SiteFormDialog(props) {
   const { isOpen, onClose, title, save, loading, error, editData, status } =
      props;
   const { t } = useTranslation();
   const [countryCode, setCountryCode] = useState('')

   const {
      control,
      handleSubmit,
      formState: { errors, isValid },
      reset,
      setValue,
      watch,
      register
   } = useForm({
      mode: "onChange",
      resolver: yupResolver(siteSchema),
      defaultValues: {
         client_id: "",
         site_name: "",
         country: "",
         state: "",
         city: "",
         image: "",

         // old version
         enable_reporting: 0,
         enable_tour_tracking: 0,
         enable_hipaa_compliant: 0,
         site_address: "",
         geo_type: "",
         geo_data: null,
         latitude: "0",
         longitude: "0",
         report_options: {},
         supervisor_assignment: [],
         smart_feature: {},
      },
   });
   const countries = useCountries();
   const states = useStates({
      country: countryCode,
      config: {
         enabled: countryCode !== ''
      }
   })
   const image = watch("image");
   const disableButton = !isValid || watch('geo_data') === null || watch('geo_data')?.features.length === 0 || image === null;

   useEffect(() => {
      if (status === "success") {
         reset();
      }
   }, [status]);

   useEffect(() => {
      if (editData && !loading) {
         Object.entries(editData).forEach(([key, value]) => {
            setValue(key, typeof value === 'boolean' ? Number(value) : value);
         });

         setCountryCode(getCountryCode(editData.country))
      }
   }, [editData, isOpen]);

   function onSubmit(data) {
      save(data);
   }

   function closeDialog() {
      onClose();

      if (!editData) {
         reset();
         setCountryCode("")
      }
   }

   function setGeoData(data) {
      setValue("geo_data", data);
   }

   function setGeoType(type) {
      setValue("geo_type", type);
   }

   function setLatitudeAndLongtitude([longitude, latitude]) {
      setValue("latitude", latitude);
      setValue("longitude", longitude);
   }

   function getCountryCode(country) {
      if (!countries.data?.data) return ''

      const arr = Object.entries(countries.data?.data).filter(([key, value]) => {
         return country === value
      })

      return arr.length > 0 ? arr[0].length > 0 ? arr[0][0] : null : null
   }

   return (
      <Dialog
         modal
         visible={isOpen}
         style={{ width: "1800px" }}
         showHeader={false}
         closable={false}
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
         <div className="grid md:grid-cols-2 px-2">
            <div className="md:mr-3">
               <div className="field">
                  <label htmlFor="name">
                     Site Name<span className="required-field">*</span>
                  </label>
                  <Controller
                     name="site_name"
                     control={control}
                     render={({ field }) => <InputText placeholder="Input site name" id="name" {...field} />}
                  />
                  {errors.site_name?.message && (
                     <small className="p-invalid">
                        {t(errors.site_name?.message)}
                     </small>
                  )}
               </div>
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
                           disabled={countries.isLoading}
                           value={field.value}
                           options={
                              countries?.data?.data ? Object.values(countries?.data?.data) : []
                           }
                           onChange={(e) => {
                              const country = e.target.value
                              field.onChange(country)
                              setCountryCode(getCountryCode(country))
                           }}
                           placeholder="Select your country"
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
                  <label htmlFor="state">
                     Province / State<span className="required-field">*</span>
                  </label>
                  <Controller
                     name="state"
                     control={control}
                     render={() => {
                        return (
                           <>
                              <Controller
                                 name="state"
                                 control={control}
                                 render={({ field }) => (
                                    <Dropdown
                                       disabled={states.isLoading || countryCode === ''}
                                       value={field.value}
                                       options={
                                          states?.data?.data ? Object.values(states?.data?.data) : []
                                       }
                                       tooltip="Select country first!"
                                       tooltipOptions={{
                                          showOnDisabled: true,
                                          position: 'bottom',
                                          disabled: Boolean(countryCode)
                                       }}
                                       onChange={field.onChange}
                                       placeholder="Input your province/state"
                                    />
                                 )}
                              />
                           </>
                        )
                     }}
                  />
                  {errors.state?.message && (
                     <small className="p-invalid">
                        {t(errors.state?.message)}
                     </small>
                  )}
               </div>
               <div className="field">
                  <label htmlFor="city">
                     City<span className="required-field">*</span>
                  </label>
                  <Controller
                     name="city"
                     control={control}
                     render={({ field }) => <InputText placeholder="Input your city" id="name" {...field} />}
                  />
                  {errors.city?.message && (
                     <small className="p-invalid">{t(errors.city?.message)}</small>
                  )}
               </div>
               <div className="my-4">
                  <Dropzone
                     className="h-[340px] flex items-center justify-center"
                     previewImageClassName="!max-h-[190px]"
                     register={register}
                     file={image}
                     setValue={setValue}
                     valueKey="image"
                     isEdit={Boolean(editData)}
                  />
               </div>
            </div>
            <div>
               <Message
                  className="mb-4"
                  severity="info"
                  text="To get started, enter the full address of the site to the search area, then search."
               />
               <Message
                  className="mb-4"
                  severity="info"
                  text="Geofence Instructions: Drag the circle until it is centered over the approximate center point of the Site. Then drag the edge of the circle to size the geofence."
               />
               <Message
                  className="mb-4"
                  severity="info"
                  text='VERY IMPORTANT: Make the geofence larger than the actual Site to allow for device location inaccuracies. We recommend a 1/4 mile or 400 meters cushion. Otherwise, officers may get a "No Sites In Range" message. Therefore, officers are not be able to sign into the Site or scan QR Codes and perform Inspect assignment at the tour stop.'
               />
               <Mapbox
                  setLatitudeAndLongtitude={setLatitudeAndLongtitude}
                  setGeoType={setGeoType}
                  setGeoData={setGeoData}
                  geoData={editData ? editData?.geo_data : null}
                  longtitudeAndLatitude={
                     editData ? [editData?.longitude, editData?.latitude] : null
                  }
               />
            </div>
         </div>
         <div className="my-4">
            <ErrorMessage error={error} />
         </div>
         <div className="flex ml-auto w-11rem mt-4">
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
         </div>
      </Dialog>
   );
}
