import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { Dropdown } from "primereact/dropdown";
import { getCountries } from "~/utils/getCountries";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileSchema } from "./profileSchema";
import { PhoneInput } from "~/components/PhoneInput";
import { useProfile } from "../hooks/useProfile";
import { useEffect, useRef, useState } from "react";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import { Toast } from "primereact/toast";
import { industryType } from "../client/industryType";
import { supplierType } from "../client/supplierType";
import { transformDropdownType } from "~/utils/transformDropdownType";

export function MyProfile() {
   const toast = useRef(null);
   const [uploading, setUploading] = useState(false);
   const { t } = useTranslation();
   const { status, data } = useProfile();
   const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
      register,
      watch,
      getValues,
   } = useForm({
      resolver: yupResolver(profileSchema),
      defaultValues: {
         company: "",
         username: "",
         email: "",
         address: "",
         address_local: "",
         country: "",
         state: "",
         city: "",
         zip: "",
         industry_type: "",
         supplier_type: "",
         assigned_person: "",
         timezone: "",
         photo: null,
         phone: "",
      },
   });
   const updateProfile = useUpdateProfile({
      handleSuccess() {
         setUploading(false);
         toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Profile updated successfully",
            life: 3000,
         });
      },
   });
   const photo = watch("photo");
   const timezone = Intl.supportedValuesOf("timeZone");
   const countries = getCountries();

   function onSubmit(data) {
      updateProfile.mutate(data);
   }

   useEffect(() => {
      if (status === "success") {
         Object.entries(data?.data).forEach(([key, value]) => {
            setValue(
               key,
               key === "country" ? { name: value } : value === null ? "" : value
            );
         });
      }
   }, [status, data]);

   return (
      <div className="w-8 mx-auto my-4">
         {status === "loading" && <p>loading...</p>}
         {status === "success" && (
            <>
               <div className="grid">
                  <div className="col">
                     <div className="field flex flex-column">
                        <label htmlFor="name">
                           {t("dashboard.client.company-name")}
                        </label>
                        <Controller
                           name="company"
                           control={control}
                           render={({ field }) => (
                              <InputText id="name" {...field} />
                           )}
                        />
                        {errors.company?.message && (
                           <small className="p-invalid">
                              {t(errors.company?.message)}
                           </small>
                        )}
                     </div>
                     <div className="field flex flex-column">
                        <label htmlFor="phone">{t("common.phone")}</label>
                        <Controller
                           name="phone"
                           control={control}
                           render={({ field }) => (
                              <PhoneInput
                                 id="phone"
                                 country={"us"}
                                 value={field.value}
                                 onChange={(phone) => field.onChange(phone)}
                              />
                           )}
                        />
                     </div>
                     <div className="field flex flex-column">
                        <label htmlFor="address">{t("common.address")}</label>
                        <Controller
                           name="address"
                           control={control}
                           render={({ field }) => (
                              <InputText id="address" {...field} />
                           )}
                        />
                        {errors.address?.message && (
                           <small className="p-invalid">
                              {t(errors.address?.message)}
                           </small>
                        )}
                     </div>
                     <div className="field flex flex-column">
                        <label htmlFor="country">{t("common.country")}</label>
                        <Controller
                           name="country"
                           control={control}
                           render={({ field }) => (
                              <Dropdown
                                 value={field.value}
                                 options={countries}
                                 onChange={field.onChange}
                                 optionLabel="name"
                                 filter
                                 showClear
                                 filterBy="name"
                                 placeholder="Select a Country"
                              />
                           )}
                        />
                        {errors.country?.message && (
                           <small className="p-invalid">
                              {t(errors.country?.message)}
                           </small>
                        )}
                     </div>
                     <div className="field flex flex-column">
                        <label htmlFor="city">{t("common.city")}</label>
                        <Controller
                           name="city"
                           control={control}
                           render={({ field }) => (
                              <InputText id="city" {...field} />
                           )}
                        />
                        {errors.city?.message && (
                           <small className="p-invalid">
                              {t(errors.city?.message)}
                           </small>
                        )}
                     </div>
                     <div className="field flex flex-column">
                        <label htmlFor="industry-type">
                           {t("dashboard.client.industry-type")}
                        </label>
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
                     <div className="field flex flex-column">
                        <label htmlFor="assigned-person">
                           {t("dashboard.client.assigned-person")}
                        </label>
                        <Controller
                           name="assigned_person"
                           control={control}
                           render={({ field }) => (
                              <InputText id="assigned-person" {...field} />
                           )}
                        />
                     </div>
                  </div>
                  <div className="col">
                     <div className="field flex flex-column">
                        <label htmlFor="username">Username</label>
                        <Controller
                           name="username"
                           control={control}
                           render={({ field }) => (
                              <InputText id="username" {...field} />
                           )}
                        />
                     </div>
                     <div className="field flex flex-column">
                        <label htmlFor="email">{t("common.email")}</label>
                        <Controller
                           name="email"
                           control={control}
                           render={({ field }) => (
                              <InputText type="email" id="email" {...field} />
                           )}
                        />
                        {errors.email?.message && (
                           <small className="p-invalid">
                              {t(errors.email?.message)}
                           </small>
                        )}
                     </div>
                     <div className="field flex flex-column">
                        <label htmlFor="local-address">
                           {t("dashboard.client.address-in-local-language")}
                        </label>
                        <Controller
                           name="address_local"
                           control={control}
                           render={({ field }) => (
                              <InputText id="local-address" {...field} />
                           )}
                        />
                     </div>
                     <div className="field flex flex-column">
                        <label htmlFor="state">
                           {t("dashboard.client.state")}
                        </label>
                        <Controller
                           name="state"
                           control={control}
                           render={({ field }) => (
                              <InputText id="state" {...field} />
                           )}
                        />
                        {errors.state?.message && (
                           <small className="p-invalid">
                              {t(errors.state?.message)}
                           </small>
                        )}
                     </div>
                     <div className="field flex flex-column">
                        <label htmlFor="zip">Zip</label>
                        <Controller
                           name="zip"
                           control={control}
                           render={({ field }) => (
                              <InputText id="zip" {...field} />
                           )}
                        />
                        {errors.zip?.message && (
                           <small className="p-invalid">
                              {t(errors.zip?.message)}
                           </small>
                        )}
                     </div>
                     <div className="field flex flex-column">
                        <label htmlFor="supplier-type">
                           {t("dashboard.client.supplier-type")}
                        </label>
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
                     <div className="field flex flex-column">
                        <label htmlFor="timezone">{t("common.timezone")}</label>
                        <Controller
                           name="timezone"
                           control={control}
                           render={({ field }) => (
                              <Dropdown
                                 id="timezone"
                                 value={field.value}
                                 options={timezone}
                                 onChange={field.onChange}
                                 virtualScrollerOptions={{ itemSize: 38 }}
                                 placeholder={t(
                                    "dashboard.officer.select-a-timezone"
                                 )}
                              />
                           )}
                        />
                        {errors.timezone?.message && (
                           <small className="p-invalid">
                              {t(errors.timezone?.message)}
                           </small>
                        )}
                     </div>
                  </div>
               </div>
               <div>
                  <Button
                     className="w-full mb-4"
                     onClick={handleSubmit(onSubmit)}
                     label={t("common.save")}
                     loading={updateProfile.isLoading}
                  ></Button>
                  <div className="report-upload-btn">
                     <label className="text-center" htmlFor="upload">
                        {uploading && updateProfile.isLoading
                           ? "uploading..."
                           : "upload photo"}
                     </label>
                     <input
                        disabled={updateProfile.isLoading}
                        style={{ display: "none" }}
                        type="file"
                        id="upload"
                        {...register("photo")}
                        onChange={(e) => {
                           setUploading(true);
                           const fields = getValues();
                           updateProfile.mutate({
                              ...fields,
                              photo: e.target.files[0],
                           });
                        }}
                     />
                  </div>
                  {photo && <img className="mt-4" width="200" src={photo} />}
               </div>
            </>
         )}
         <Toast ref={toast} position="top-right" />
      </div>
   );
}
