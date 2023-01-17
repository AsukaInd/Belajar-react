import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
// import { useAuth } from "~/features/auth/useAuth";
// import { Navigate } from "react-router-dom";
import { useFreelancerRegister } from "../hooks/freelancer/useFreelancerRegister";
import { FREELANCER_KEY } from "~/utils/tokenStorage";
import { useForm, Controller } from "react-hook-form";
import { InputTextarea } from "primereact/inputtextarea";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { freelancerRegisterSchema } from "~/features/auth/registerSchema";
import { useTranslation } from "react-i18next";
import { useUploadImage } from "../hooks/gigs/useUploadImage";
import { classNames } from "primereact/utils";
import { FilePreview } from "~/components/FilePreview";
import { getCountries } from "~/utils/getCountries";
import { Dropdown } from "primereact/dropdown";

export default function RegisterFreelancer() {
   //  const { freelancerToken, setAuth } = useAuth();
   const { t } = useTranslation();
   const {
      control,
      handleSubmit,
      formState: { errors },
      watch,
      register,
      getValues,
   } = useForm({
      // resolver: yupResolver(freelancerRegisterSchema),
      defaultValues: {
         first_name: "",
         last_name: "",
         is_freelancer: 1,
         phone_number: "",
         mobile_number: "",
         photo: null,
         description: "",
         educations: [
            {
               university: "",
               major: "",
               from: "",
               to: "",
               certificate_education: null,
            }
         ],
         residence_birth: {
            country_id: 1,
            id_type_id: 1,
            address: "",
            address_local_language: "",
            province: "",
            city: "",
            postal_code: "",
            date_of_birth: "",
            id_number: 12312412123,
         },
         work_experience: [
            {
               industry_type_id: 1,
               company_size_id: 1,
               country_id: 1,
               city_id: 1,
               organization: "",
               title_or_position: "",
               current_company: true,
               from: "",
               to: "",
               description_job: "",
               client: "",
               standart_protocols: "",
            }
         ],
         certifications: [
            {
               certificate_id: 1,
               training_organization: "",
               from: "",
               to: "",
               certification_image: null,
            }
         ],
         languages: [
            {
               language_level_id: 1,
               language: "english",
            }
         ],
         product_inspection: {
            report_language_id: 2,
            product_line_id: 1,
            sub_product_line_id: 2,
         },
         services: [
            {
               service_type_id: 1,
            }
         ]
      },
   });
   const photo = watch("photo");
   const uploadProfileImg = useUploadImage();
   const countries = getCountries();
   const freelancerRegister = useFreelancerRegister({
      onSuccess(data) {
         setAuth(FREELANCER_KEY, data.token);
      },
      onError(error) {
         console.log(error);
      },
   });

   function onSubmit(data) {
      freelancerRegister.mutate(data);
   }

   //  if (freelancerToken) {
   //     return <Navigate to="/freelancer" replace />;
   //  }

   return (
      <div className="pages-body flex flex-column">
         <div className="align-self-center mt-auto mb-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
               <div className="pages-panel card flex flex-column">
                  <h2 className="py-4">Complete Your Profile</h2>

                  <div className="p-inputgroup mb-4 flex-column">
                     <span className="p-float-label">
                        <Controller
                           name="first_name"
                           control={control}
                           render={({ field }) => (
                              <InputText
                                 id="freelancer-register-firstname"
                                 {...field}
                              />
                           )}
                        />
                        <label htmlFor="freelancer-register-firstname">
                           First Name
                        </label>
                     </span>
                     {errors.first_name?.message && (
                        <small className="p-invalid">
                           {t(errors.first_name?.message)}
                        </small>
                     )}
                  </div>

                  <div className="p-inputgroup mb-4 flex-column">
                     <span className="p-float-label">
                        <Controller
                           name="last_name"
                           control={control}
                           render={({ field }) => (
                              <InputText
                                 id="freelancer-register-lastname"
                                 {...field}
                              />
                           )}
                        />
                        <label htmlFor="freelancer-register-lastname">
                           Last Name
                        </label>
                     </span>
                     {errors.last_name?.message && (
                        <small className="p-invalid">
                           {t(errors.last_name?.message)}
                        </small>
                     )}
                  </div>

                  <div className="p-inputgroup mb-4 flex-column">
                     <span className="p-float-label">
                        <Controller
                           name="phone_number"
                           control={control}
                           render={({ field }) => (
                              <InputText
                                 id="freelancer-register-phonenumber"
                                 {...field}
                              />
                           )}
                        />
                        <label htmlFor="freelancer-register-phonenumber">
                           Phone Number
                        </label>
                     </span>
                     {errors.phone_number?.message && (
                        <small className="p-invalid">
                           {t(errors.phone_number?.message)}
                        </small>
                     )}
                  </div>

                  <div className="p-inputgroup mb-4 flex-column">
                     <span className="p-float-label">
                        <Controller
                           name="mobile_number"
                           control={control}
                           render={({ field }) => (
                              <InputText
                                 id="freelancer-register-mobilenumber"
                                 {...field}
                              />
                           )}
                        />
                        <label htmlFor="freelancer-register-mobilenumber">
                           Mobile Number
                        </label>
                     </span>
                     {errors.mobile_number?.message && (
                        <small className="p-invalid">
                           {t(errors.mobile_number?.message)}
                        </small>
                     )}
                  </div>

                  <div className="input-panel flex flex-column">
                     <div className="p-inputgroup mb-4 flex-column">
                        <span className="p-float-label">
                           <Controller
                              name="educations.0.university"
                              control={control}
                              render={({ field }) => (
                                 <InputText
                                    id="freelancer-register-education-university"
                                    {...field}
                                 />
                              )}
                           />
                           <label htmlFor="freelancer-register-education-university">
                              University
                           </label>
                        </span>
                        {/* {errors.educations[0]?.university?.message && (
                           <small className="p-invalid">
                              {t(errors.educations[0]?.university?.message)}
                           </small>
                        )} */}
                     </div>
                  </div>

                  <div className="input-panel flex flex-column">
                     <div className="p-inputgroup mb-4 flex-column">
                        <span className="p-float-label">
                           <Controller
                              name="educations.0.major"
                              control={control}
                              render={({ field }) => (
                                 <InputText
                                    id="freelancer-register-education-major"
                                    {...field}
                                 />
                              )}
                           />
                           <label htmlFor="freelancer-register-education-major">
                              Major
                           </label>
                        </span>
                        {errors.educations?.message && (
                           <small className="p-invalid">
                              {t(errors.educations?.message)}
                           </small>
                        )}
                     </div>
                  </div>

                  <div className="input-panel flex flex-column">
                     <div className="p-inputgroup mb-4 flex-column">
                        <span className="p-float-label">
                           <Controller
                              name="educations.0.from"
                              control={control}
                              render={({ field }) => (
                                 <InputText
                                    id="freelancer-register-education-from"
                                    {...field}
                                 />
                              )}
                           />
                           <label htmlFor="freelancer-register-education-from">
                              From
                           </label>
                        </span>
                        {errors.educations?.message && (
                           <small className="p-invalid">
                              {t(errors.educations?.message)}
                           </small>
                        )}
                     </div>
                  </div>

                  <div className="input-panel flex flex-column">
                     <div className="p-inputgroup mb-4 flex-column">
                        <span className="p-float-label">
                           <Controller
                              name="educations.0.to"
                              control={control}
                              render={({ field }) => (
                                 <InputText
                                    id="freelancer-register-education-to"
                                    {...field}
                                 />
                              )}
                           />
                           <label htmlFor="freelancer-register-education-to">
                              To
                           </label>
                        </span>
                        {errors.educations?.message && (
                           <small className="p-invalid">
                              {t(errors.educations?.message)}
                           </small>
                        )}
                     </div>

                     <div className="certificate-education-photo-picture">
                        <div className="ml-4">
                           <span className="block text-xl font-bold">
                              certificate_educations
                           </span>
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
                              Upload certificate_education
                           </label>
                           <input
                              disabled={uploadProfileImg.isLoading}
                              style={{ display: "none" }}
                              type="file"
                              id="upload"
                              {...register("educations.0.certificate_education")}
                              onChange={(event) => {
                                 const fields = getValues();
                                 uploadProfileImg.mutate({
                                    ...fields,
                                    certificate_education: event.target.files[0],
                                 });
                              }}
                           />
                        </div>
                     </div>

                     <div className="edit-view-profile-picture">
                        <div className="flex align-items-center">
                           {photo instanceof File ? (
                              <FilePreview files={photo} />
                           ) : (
                              <img src={photo} />
                           )}
                           <div className="ml-4">
                              <span className="block text-xl font-bold">
                                 Photo Profile
                              </span>
                           </div>
                        </div>
                        <div

                        >
                           <label htmlFor="upload">
                              {uploadProfileImg.isLoading && (
                                 <span className="p-button-icon p-c p-button-loading-icon p-button-icon-left pi pi-spinner pi-spin"></span>
                              )}
                              Upload Photo
                           </label>
                           <input
                              disabled={uploadProfileImg.isLoading}
                              style={{ display: "none" }}
                              type="file"
                              id="upload"
                              {...register("photo")}
                              onChange={(event) => {
                                 const fields = getValues();
                                 uploadProfileImg.mutate({
                                    ...fields,
                                    photo: event.target.files[0],
                                 });
                              }}
                           />
                        </div>
                     </div>

                     <div className="p-inputgroup mb-4 flex-column">
                        <span className="p-float-label">
                           <Controller
                              name="description"
                              control={control}
                              render={({ field }) => (
                                 <InputTextarea
                                    id="freelancer-register-description"
                                    rows={5}
                                    cols={30}
                                    {...field}
                                 />
                              )}
                           />
                           <label htmlFor="freelancer-register-description">
                              Description
                           </label>
                        </span>
                        {errors.description?.message && (
                           <small className="p-invalid">
                              {t(errors.description?.message)}
                           </small>
                        )}
                     </div>

                     {/* <div className="p-inputgroup mb-4 flex-column">
                     <span className="p-float-label">
                        <Controller
                           name="residence_birth.address"
                           control={control}
                           render={({ field }) => (
                              <InputText
                                 id="freelancer-register-birth-address"
                                 {...field}
                              />
                           )}
                        />
                        <label htmlFor="freelancer-register-birth-address">
                           Birth Address
                        </label>
                     </span>
                     {errors.residence_birth?.address?.message && (
                        <small className="p-invalid">
                           {t(errors.residence_birth?.address?.message)}
                        </small>
                     )}
                  </div> */}

                     <div className="p-inputgroup mb-4 flex-column">
                        <span className="p-float-label">
                           <Controller
                              name="residence_birth.address_local_language"
                              control={control}
                              render={({ field }) => (
                                 <InputText
                                    id="freelancer-register-address_local_language"
                                    {...field}
                                 />
                              )}
                           />
                           <label htmlFor="freelancer-register-address_local_language">
                              Local
                           </label>
                        </span>
                        {errors.residence_birth?.address_local_language?.message && (
                           <small className="p-invalid">
                              {t(errors.residence_birth?.address_local_language?.message)}
                           </small>
                        )}
                     </div>

                     {/* <div className="p-inputgroup mb-4 flex-column">
                     <span className="p-float-label">
                        <Controller
                           name="residence_birth.province"
                           control={control}
                           render={({ field }) => (
                              <InputText
                                 id="freelancer-register-province"
                                 {...field}
                              />
                           )}
                        />
                        <label htmlFor="freelancer-register-province">
                           Province
                        </label>
                     </span>
                     {errors.residence_birth?.province?.message && (
                        <small className="p-invalid">
                           {t(errors.residence_birth?.province?.message)}
                        </small>
                     )}
                  </div>

                  <div className="p-inputgroup mb-4 flex-column">
                     <span className="p-float-label">
                        <Controller
                           name="residence_birth.city"
                           control={control}
                           render={({ field }) => (
                              <InputText
                                 id="freelancer-register-city"
                                 {...field}
                              />
                           )}
                        />
                        <label htmlFor="freelancer-register-city">
                           City
                        </label>
                     </span>
                     {errors.residence_birth?.city?.message && (
                        <small className="p-invalid">
                           {t(errors.residence_birth?.city?.message)}
                        </small>
                     )}
                  </div>

                  <div className="p-inputgroup mb-4 flex-column">
                     <span className="p-float-label">
                        <Controller
                           name="residence_birth.postal_code"
                           control={control}
                           render={({ field }) => (
                              <InputText
                                 id="freelancer-register-postal_code"
                                 {...field}
                              />
                           )}
                        />
                        <label htmlFor="freelancer-register-postal_code">
                           Postal Code
                        </label>
                     </span>
                     {errors.residence_birth?.postal_code?.message && (
                        <small className="p-invalid">
                           {t(errors.residence_birth?.postal_code?.message)}
                        </small>
                     )}
                  </div> */}

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
                                    // disabled={isView}
                                    value={field.value}
                                    options={countries}
                                    onChange={field.onChange}
                                    optionLabel="name"
                                    filter
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
                        <div className="field">
                           <label htmlFor="city">
                              {t("common.city")}
                              <span className="required-field">*</span>
                           </label>
                           <Controller
                              name="residence_birth.city"
                              control={control}
                              render={({ field }) => (
                                 <InputText
                                    //  disabled={isView}
                                    id="city" {...field} />
                              )}
                           />
                           {errors.residence_birth?.city?.message && (
                              <small className="p-invalid">
                                 {t(errors.residence_birth?.city?.message)}
                              </small>
                           )}
                        </div>
                        <div className="field">
                           <label htmlFor="state">
                              Province / State
                              <span className="required-field">*</span>
                           </label>
                           <Controller
                              name="residence_birth.province"
                              control={control}
                              render={({ field }) => (
                                 <InputText
                                    //  disabled={isView}
                                    id="state" {...field} />
                              )}
                           />
                           {errors.residence_birth?.province?.message && (
                              <small className="p-invalid">
                                 {t(residence_birth?.province?.message)}
                              </small>
                           )}
                        </div>
                        <div className="field">
                           <label htmlFor="postal-code">
                              Zip Postal Code
                              <span className="required-field">*</span>
                           </label>
                           <Controller
                              name="residence_birth.postal_code"
                              control={control}
                              render={({ field }) => (
                                 <InputText
                                    // disabled={isView}
                                    id="postal-code"
                                    {...field}
                                 />
                              )}
                           />
                           {errors.residence_birth?.postal_code?.message && (
                              <small className="p-invalid">
                                 {t(errors.residence_birth?.postal_code?.message)}
                              </small>
                           )}
                        </div>
                        <div className="field">
                           <label htmlFor="address">
                              {t("common.address")}
                              <span className="required-field">*</span>
                           </label>
                           <Controller
                              name="residence_birth.address"
                              control={control}
                              render={({ field }) => (
                                 <InputTextarea
                                    autoResize
                                    className="address"
                                    // disabled={isView}
                                    id="address"
                                    rows={5}
                                    cols={30}
                                    {...field}
                                 />
                              )}
                           />
                           {errors.residence_birth?.address?.message && (
                              <small className="p-invalid">
                                 {t(errors.residence_birth?.address?.message)}
                              </small>
                           )}
                        </div>
                     </div>

                     <div className="p-inputgroup mb-4 flex-column">
                        <span className="p-float-label">
                           <Controller
                              name="residence_birth.date_of_birth"
                              control={control}
                              render={({ field }) => (
                                 <InputText
                                    id="freelancer-register-date_of_birth"
                                    {...field}
                                 />
                              )}
                           />
                           <label htmlFor="freelancer-register-date_of_birth">
                              Date Of Birth
                           </label>
                        </span>
                        {errors.residence_birth?.date_of_birth?.message && (
                           <small className="p-invalid">
                              {t(errors.residence_birth?.date_of_birth?.message)}
                           </small>
                        )}
                     </div>

                     <div className="p-inputgroup mb-4 flex-column">
                        <span className="p-float-label">
                           <Controller
                              name="work_experience[0].organization"
                              control={control}
                              render={({ field }) => (
                                 <InputText
                                    id="freelancer-register-organization"
                                    {...field}
                                 />
                              )}
                           />
                           <label htmlFor="freelancer-register-organization">
                              Organization
                           </label>
                        </span>
                        {/* {errors.work_experience[0]?.organization?.message && (
                        <small className="p-invalid">
                           {t(errors.work_experience[0]?.organization?.message)}
                        </small>
                     )} */}
                     </div>

                     <div className="p-inputgroup mb-4 flex-column">
                        <span className="p-float-label">
                           <Controller
                              name="work_experience[0].title_or_position"
                              control={control}
                              render={({ field }) => (
                                 <InputText
                                    id="freelancer-register-title_or_position"
                                    {...field}
                                 />
                              )}
                           />
                           <label htmlFor="freelancer-register-title_or_position">
                              title or position
                           </label>
                        </span>
                        {/* {errors.work_experience[0]?.title_or_position?.message && (
                        <small className="p-invalid">
                           {t(errors.work_experience[0]?.title_or_position?.message)}
                        </small>
                     )} */}
                     </div>

                     <div className="p-inputgroup mb-4 flex-column">
                        <span className="p-float-label">
                           <Controller
                              name="work_experience[0].from"
                              control={control}
                              render={({ field }) => (
                                 <InputText
                                    id="freelancer-register-from"
                                    {...field}
                                 />
                              )}
                           />
                           <label htmlFor="freelancer-register-from">
                              from
                           </label>
                        </span>
                        {/* {errors.work_experience[0]?.from?.message && (
                        <small className="p-invalid">
                           {t(errors.work_experience[0]?.from?.message)}
                        </small>
                     )} */}
                     </div>

                     <div className="p-inputgroup mb-4 flex-column">
                        <span className="p-float-label">
                           <Controller
                              name="work_experience[0].to"
                              control={control}
                              render={({ field }) => (
                                 <InputText
                                    id="freelancer-register-to"
                                    {...field}
                                 />
                              )}
                           />
                           <label htmlFor="freelancer-register-to">
                              to
                           </label>
                        </span>
                        {/* {errors.work_experience[0]?.to?.message && (
                        <small className="p-invalid">
                           {t(errors.work_experience[0]?.to?.message)}
                        </small>
                     )} */}
                     </div>

                     <div className="p-inputgroup mb-4 flex-column">
                        <span className="p-float-label">
                           <Controller
                              name="work_experience[0].client"
                              control={control}
                              render={({ field }) => (
                                 <InputText
                                    id="freelancer-register-client"
                                    {...field}
                                 />
                              )}
                           />
                           <label htmlFor="freelancer-register-client">
                              client
                           </label>
                        </span>
                        {/* {errors.work_experience[0]?.client?.message && (
                        <small className="p-invalid">
                           {t(errors.work_experience[0]?.client?.message)}
                        </small>
                     )} */}
                     </div>

                     <div className="p-inputgroup mb-4 flex-column">
                        <span className="p-float-label">
                           <Controller
                              name="work_experience[0].standart_protocols"
                              control={control}
                              render={({ field }) => (
                                 <InputText
                                    id="freelancer-register-standart_protocols"
                                    {...field}
                                 />
                              )}
                           />
                           <label htmlFor="freelancer-register-standart_protocols">
                              standart protocols
                           </label>
                        </span>
                        {/* {errors.work_experience[0]?.standart_protocols?.message && (
                        <small className="p-invalid">
                           {t(errors.work_experience[0]?.standart_protocols?.message)}
                        </small>
                     )} */}
                     </div>

                     <div className="p-inputgroup mb-4 flex-column">
                        <span className="p-float-label">
                           <Controller
                              name="work_experience[0].description_job"
                              control={control}
                              render={({ field }) => (
                                 <InputText
                                    id="freelancer-register-description_job"
                                    {...field}
                                 />
                              )}
                           />
                           <label htmlFor="freelancer-register-description_job">
                              description job
                           </label>
                        </span>
                        {/* {errors.work_experience[0]?.description_job?.message && (
                        <small className="p-invalid">
                           {t(errors.work_experience[0]?.description_job?.message)}
                        </small>
                     )} */}
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
                           Certification Image
                        </label>
                        <input
                           // disabled={uploadProfileImg.isLoading}
                           style={{ display: "none" }}
                           type="file"
                           id="upload"
                           {...register(`work_experience.${0}.certification_image`)}
                           onChange={(event) => {
                              const fields = getValues();
                              uploadProfileImg.mutate({
                                 ...fields,
                                 work_experience: event.target.files[0],
                              });
                           }}
                        />
                     </div>

                     <span>
                        {freelancerRegister.error &&
                           freelancerRegister.error.status < 500
                           ? freelancerRegister.error.data.message
                           : freelancerRegister?.error?.statusText}
                     </span>
                  </div>
                  <Button
                     loading={freelancerRegister.isLoading}
                     label="REGISTER"
                     className="login-button mb-4"
                  />
               </div>
            </form>
         </div>
      </div>
   );
}
