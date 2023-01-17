import { useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { Dropdown } from "primereact/dropdown";
import { yupResolver } from "@hookform/resolvers/yup";
import { assetSchema } from "./companySchema";
import { ErrorMessage } from "~/components/ErrorMessage";
import { transformToDropdownOptions } from "~/utils/transformToDropdownOptions";
import { Dropzone } from "~/components/Dropzone";
import { useAllCountry } from "../../api/services/country.services";
import { useAllCity } from "../../api/services/city.services";
import { useAllProvince } from "../../api/services/province.services";
import { useCompanyType } from "../../api/services/company-type.services";

export function CompanyFormDialog(props) {
   const { isOpen, onClose, save, loading, error, editData, status, isView } =
      props;

   const allCountry = useAllCountry();
   const allProvince = useAllProvince();
   const allCity = useAllCity();
   const allCompanyType = useCompanyType();

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
         image: null,
      },
   });

   console.log(editData)

   const image = watch("image");

   useEffect(() => {
      if (status === "success") {
         reset();
      }
   }, [status]);

   function onSubmit(data) {
      console.log(data)
      const dataSupplier = {
         company_name: data.company_name,
         company_type_id: data.company_type,
         country_id: data.country_id,
         city_id: data.city_id,
         owner_name: data.owner_name,
         contact_name: data.contact_name,
         phone: data.phone_number,
         email: data.email,
         image: data.image,
         address: null,
         address_local: null,
         province_id: data.province_id,
         postal_code: null,
         supplier_type_id: null,
         firstname: null,
         lastname: null,
         name_local: null,
         phone_supplier: null,
         mobile: null,
         address_factory: null,
         address_factory_local: null,
         country_id_factory: null,
         province_id_factory: null,
         city_id_factory: null,
         postal_factory: null,
         firstname_factory: null,
         lastname_factory: null,
         name_local_factory: null,
         email_factory: "factory@mail.com",
         phone_factory: null,
         mobile_factory: null,
         inspect_req_date: null,
         expect_ship_date: null,
         this_inspection_is: null,
         who_will_pay_for_he_inspection: null,
         send_booking_email_to_suppliers: "supplier@mail.com",
         send_booking_email_to_others: "other@mail.com",
         send_copy_final_report: null,
         pay_by_letter_credit: null,
         product_inspection_book_id: null,
      };
      if (editData) {
         dataSupplier._method = "PUT";
      }
      console.log(dataSupplier)
      save(dataSupplier);
   }

   function closeDialog() {
      onClose();
      if (!editData) {
         reset();
      }
   }
   const selectedCountryTemplate = (option, props) => {
      if (option) {
         return (
            <div className="country-item country-item-value">
               <div>{option.label}</div>
            </div>
         );
      }

      return <span>{props.placeholder}</span>;
   };

   const countryOptionTemplate = (option) => {
      return (
         <div className="country-item">
            <div>{option.label}</div>
         </div>
      );
   };

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
                     View Company{" "}
                     <span style={{ color: "var(--primary-color)" }}>
                        {editData?.id}
                     </span>
                  </span>
               ) : editData ? (
                  "Edit Company"
               ) : (
                  "Add New Company"
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
                  />
               </div>
            )}
            <div className="field">
               <label htmlFor="company-name">
                  Company Name<span className="required-field">*</span>
               </label>
               <Controller
                  name="company_name"
                  control={control}
                  defaultValue={editData?.company_name}
                  render={({ field }) => (
                     <InputText
                        disabled={isView}
                        id="company-name"
                        placeholder="Input company name"
                        {...field}
                     />
                  )}
               />
               {errors.company_name?.message && (
                  <small className="text-red-500">
                     {t(errors.company_name?.message)}
                  </small>
               )}
            </div>
            <div className="field">
               <label htmlFor="company-type">
                  Company Type<span className="required-field">*</span>
               </label>
               <Controller
                  name="company_type"
                  control={control}
                  defaultValue={editData?.company_type_id}
                  render={({ field }) => (
                     <Dropdown
                        disabled={isView}
                        id="company-type"
                        options={transformToDropdownOptions(
                           allCompanyType?.data?.data?.data,
                           { label: "name", value: "id" }
                        )}
                        placeholder="Select company type ..."
                        value={field.value}
                        onChange={field.onChange}
                     />
                  )}
               />
               {errors.company_type?.message && (
                  <small className="text-red-500">
                     {t(errors.company_type?.message)}
                  </small>
               )}
            </div>
            <div className="field">
               <label htmlFor="country">
                  Country<span className="required-field">*</span>
               </label>
               <Controller
                  name="country_id"
                  control={control}
                  defaultValue={editData?.country?.id}
                  render={({ field }) => (
                     <Dropdown
                        id="country"
                        disabled={isView}
                        value={field.value}
                        options={transformToDropdownOptions(
                           allCountry?.data?.data?.data,
                           { label: "name", value: "id" }
                        )}
                        onChange={field.onChange}
                        optionLabel="name"
                        filter
                        showClear
                        filterBy="label"
                        placeholder="Select a Country"
                        valueTemplate={selectedCountryTemplate}
                        itemTemplate={countryOptionTemplate}
                     />
                  )}
               />
               {errors.country_id?.message && (
                  <small className="text-red-500">
                     {t(errors.country_id?.message)}
                  </small>
               )}
            </div>
            <div className="field">
               <label htmlFor="province">
                  Province<span className="required-field">*</span>
               </label>
               <Controller
                  name="province_id"
                  control={control}
                  defaultValue={editData?.province_id}
                  render={({ field }) => (
                     <Dropdown
                        id="province"
                        disabled={isView}
                        value={field.value}
                        options={transformToDropdownOptions(
                           allProvince?.data?.data?.data,
                           { label: "name", value: "id" }
                        )}
                        onChange={field.onChange}
                        optionLabel="name"
                        filter
                        showClear
                        filterBy="label"
                        placeholder="Select a Province"
                        valueTemplate={selectedCountryTemplate}
                        itemTemplate={countryOptionTemplate}
                     />
                  )}
               />
               {errors.country_id?.message && (
                  <small className="text-red-500">
                     {t(errors.country_id?.message)}
                  </small>
               )}
            </div>
            <div className="field">
               <label htmlFor="city">
                  City<span className="required-field">*</span>
               </label>
               <Controller
                  name="city_id"
                  control={control}
                  defaultValue={editData?.city?.id}
                  render={({ field }) => (
                     <Dropdown
                        value={field.value}
                        options={transformToDropdownOptions(
                           allCity?.data?.data?.data,
                           { label: "name", value: "id" }
                        )}
                        onChange={field.onChange}
                        optionLabel="name"
                        filter
                        showClear
                        filterBy="label"
                        placeholder="Select a Country"
                        valueTemplate={selectedCountryTemplate}
                        itemTemplate={countryOptionTemplate}
                     />
                  )}
               />
               {errors.city_id?.message && (
                  <small className="text-red-500">
                     {t(errors.city_id?.message)}
                  </small>
               )}
            </div>

            <div className="field">
               <label htmlFor="owner-name">
                  Owner Name<span className="required-field">*</span>
               </label>
               <Controller
                  name="owner_name"
                  control={control}
                  defaultValue={editData?.owner_name}
                  render={({ field }) => (
                     <InputText
                        disabled={isView}
                        id="owner-name"
                        placeholder="Input owner name"
                        {...field}
                     />
                  )}
               />
               {errors.owner_name?.message && (
                  <small className="text-red-500">
                     {t(errors.owner_name?.message)}
                  </small>
               )}
            </div>
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
                  defaultValue={editData?.phone}
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
               // disabled={disableButton}
               onClick={handleSubmit(onSubmit)}
               loading={loading}
               label={editData ? "Save" : "Create"}
               className="!bg-blue-500"
            />
         )}
      </Dialog>
   );
}
