import { Controller } from "react-hook-form";
import { Checkbox } from "primereact/checkbox";
import { useTranslation } from "react-i18next";
import { InputText } from "primereact/inputtext";
import { useRoles } from "~/features/dashboard/facilityManagement/hooks/useRoles";
import { Dropdown } from "primereact/dropdown";

export function OfficerFormBasicInformation({ control, errors }) {
   const { t } = useTranslation();
   const roles = useRoles();

   return (
      <>
         <div className="field">
            <label htmlFor="first_name">{t("common.first-name")}</label>
            <Controller
               name="first_name"
               control={control}
               rules={{ required: true }}
               render={({ field }) => <InputText id="first_name" {...field} />}
            />
            {errors.first_name && t("validation.first-name-required")}
         </div>

         <div className="field">
            <label htmlFor="last_name">{t("common.last-name")}</label>
            <Controller
               name="last_name"
               control={control}
               rules={{ required: true }}
               render={({ field }) => <InputText id="last_name" {...field} />}
            />
            {errors.last_name && t("validation.last-name-required")}
         </div>

         <div className="field">
            <label htmlFor="role">Role</label>
            <Controller
               name="role"
               control={control}
               render={({ field }) => {
                  return (
                     <Dropdown
                        disabled={roles.isLoading}
                        value={field.value}
                        options={roles.isSuccess ? roles?.data?.data : []}
                        onChange={field.onChange}
                        placeholder="select role"
                     />
                  );
               }}
            />
            {errors.role && "Role is required"}
         </div>

         <div className="field">
            <label htmlFor="employee-number">
               {t("dashboard.officer.employee-number")}
            </label>
            <Controller
               name="emp_number"
               control={control}
               render={({ field }) => (
                  <InputText id="employee-number" {...field} />
               )}
            />
         </div>

         <div className="field flex">
            <label className="mr-2" htmlFor="is-supervisor">
               {t("dashboard.officer.is-supervisor")}
            </label>
            <Controller
               name="is_supervisor"
               control={control}
               render={({ field }) => (
                  <Checkbox
                     inputId="is-supervisor"
                     checked={Boolean(Number(field.value))}
                     onChange={field.onChange}
                  />
               )}
            />
         </div>

         <div className="field">
            <label htmlFor="email-address">{t("common.email")}</label>
            <Controller
               name="email"
               control={control}
               render={({ field }) => (
                  <InputText id="email-address" {...field} />
               )}
            />
         </div>

         <div className="field">
            <label htmlFor="phone-number">{t("common.phone")}</label>
            <Controller
               name="phone"
               control={control}
               render={({ field }) => (
                  <InputText type="tel" id="phone-number" {...field} />
               )}
            />
         </div>

         <div className="field">
            <label htmlFor="pushover-key">
               {t("dashboard.officer.pushover-key")}
            </label>
            <Controller
               name="pushover_key"
               control={control}
               render={({ field }) => (
                  <InputText id="pushover-key" {...field} />
               )}
            />
         </div>

         <div className="field">
            <label htmlFor="address-1">
               {t("dashboard.officer.address-1")}
            </label>
            <Controller
               name="address_1"
               control={control}
               render={({ field }) => <InputText id="address-1" {...field} />}
            />
         </div>

         <div className="field">
            <label htmlFor="address-2">
               {t("dashboard.officer.address-2")}
            </label>
            <Controller
               name="address_2"
               control={control}
               render={({ field }) => <InputText id="address-2" {...field} />}
            />
         </div>

         <div className="field">
            <label htmlFor="city">{t("dashboard.officer.city")}</label>
            <Controller
               name="city"
               control={control}
               render={({ field }) => <InputText id="city" {...field} />}
            />
         </div>

         <div className="field">
            <label htmlFor="state">{t("dashboard.officer.state")}</label>
            <Controller
               name="state"
               control={control}
               render={({ field }) => <InputText id="state" {...field} />}
            />
         </div>

         <div className="field">
            <label htmlFor="postal-code">
               {t("dashboard.officer.postal-code")}
            </label>
            <Controller
               name="postal_code"
               control={control}
               render={({ field }) => <InputText id="postal-code" {...field} />}
            />
         </div>

         <div className="field">
            <label htmlFor="country">{t("dashboard.officer.country")}</label>
            <Controller
               name="country"
               control={control}
               render={({ field }) => <InputText id="country" {...field} />}
            />
         </div>

         <div className="field">
            <label htmlFor="username">{t("common.username")}</label>
            <Controller
               name="username"
               control={control}
               rules={{ required: true }}
               render={({ field }) => <InputText id="username" {...field} />}
            />
            {errors.username && (
               <small className="p-invalid">
                  {t("validation.username-required")}
               </small>
            )}
         </div>

         <div className="field">
            <label htmlFor="password">{t("common.password")}</label>
            <Controller
               name="password"
               control={control}
               rules={{ required: true, minLength: 8 }}
               render={({ field }) => (
                  <InputText type="password" id="password" {...field} />
               )}
            />
            {errors.password?.type === "required" && (
               <small className="p-invalid">
                  {t("validation.password-required")}
               </small>
            )}
            {errors.password?.type === "minLength" && (
               <span>{t("validation.min-length-8")}</span>
            )}
         </div>

         <div className="field">
            <label htmlFor="password-confirmation">
               {t("common.password-confirmation")}
            </label>
            <Controller
               name="password_confirmation"
               control={control}
               rules={{ required: true, minLength: 8 }}
               render={({ field }) => (
                  <InputText
                     type="password"
                     id="password-confirmation"
                     {...field}
                  />
               )}
            />
            {errors.password_confirmation?.type === "required" && (
               <small className="p-invalid">
                  {t("validation.password-confirmation-required")}
               </small>
            )}
            {errors.password_confirmation?.type === "minLength" && (
               <span>{t("validation.min-length-8")}</span>
            )}
         </div>
      </>
   );
}
