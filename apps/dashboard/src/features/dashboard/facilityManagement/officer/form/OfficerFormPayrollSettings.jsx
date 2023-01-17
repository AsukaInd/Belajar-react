import { Controller } from "react-hook-form";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { useTranslation } from "react-i18next";
import { InputText } from "primereact/inputtext";

export function OfficerFormPayrollSettings({ control, errors }) {
   const { t } = useTranslation();
   const timezone = Intl.supportedValuesOf("timeZone");

   return (
      <>
         <h4>{t("dashboard.officer.officer-info")}</h4>
         <div className="field">
            <label htmlFor="timezone">{t("dashboard.officer.timezone")}</label>
            <Controller
               name="timezone"
               control={control}
               rules={{ required: true }}
               render={({ field }) => (
                  <Dropdown
                     id="timezone"
                     value={field.value}
                     options={timezone}
                     onChange={field.onChange}
                     virtualScrollerOptions={{ itemSize: 38 }}
                     placeholder={t("dashboard.officer.select-a-timezone")}
                  />
               )}
            />
            {errors.timezone && t("dashboard.officer.timezone-required")}
         </div>

         <div className="field">
            <label htmlFor="payroll-number">
               {t("dashboard.officer.payroll-employee-number")}
            </label>
            <Controller
               name="payroll_number"
               control={control}
               render={({ field }) => (
                  <InputText id="payroll-number" {...field} />
               )}
            />
         </div>

         <h4>{t("dashboard.officer.overtime-configuration")}</h4>
         <div>
            <div className="flex">
               <label className="mr-2" htmlFor="overtime-paid-weekly">
                  {t("dashboard.officer.overtime-paid-weekly")}
               </label>
               <Controller
                  name="payroll_settings.overtime_paid_weekly.enabled"
                  control={control}
                  render={({ field }) => (
                     <Checkbox
                        inputId="overtime-paid-weekly"
                        checked={Boolean(Number(field.value))}
                        onChange={field.onChange}
                     />
                  )}
               />
            </div>
            <div className="field">
               <label htmlFor="overtime-paid-weekly-after">
                  {t("dashboard.officer.after")}
               </label>
               <Controller
                  name="payroll_settings.overtime_paid_weekly.hours"
                  control={control}
                  render={({ field }) => (
                     <InputText
                        className="w-22rem mx-2 mt-2"
                        id="overtime-paid-weekly-after"
                        type="number"
                        {...field}
                        onChange={(event) =>
                           field.onChange(+event.target.value)
                        }
                     />
                  )}
               />
               <span>{t("dashboard.officer.hours")}</span>
            </div>
         </div>

         <div>
            <div>
               <label className="mr-2" htmlFor="overtime-paid-daily">
                  {t("dashboard.officer.overtime-paid-daily")}
               </label>
               <Controller
                  name="payroll_settings.overtime_paid_daily.enabled"
                  control={control}
                  render={({ field }) => (
                     <Checkbox
                        inputId="overtime-paid-daily"
                        checked={Boolean(Number(field.value))}
                        onChange={field.onChange}
                     />
                  )}
               />
            </div>
            <div className="field">
               <label htmlFor="overtime-paid-daily-after">
                  {t("dashboard.officer.after")}
               </label>
               <Controller
                  name="payroll_settings.overtime_paid_daily.hours"
                  control={control}
                  render={({ field }) => (
                     <InputText
                        className="w-22rem mx-2 mt-2"
                        id="overtime-paid-daily-after"
                        type="number"
                        {...field}
                        onChange={(event) =>
                           field.onChange(+event.target.value)
                        }
                     />
                  )}
               />
               <span>{t("dashboard.officer.hours")}</span>
            </div>
         </div>

         <div>
            <div className="flex">
               <label className="mr-2" htmlFor="overtime2-paid-daily">
                  {t("dashboard.officer.overtime-paid-daily-2")}
               </label>
               <Controller
                  name="payroll_settings.overtime2_paid_daily.enabled"
                  control={control}
                  render={({ field }) => (
                     <Checkbox
                        inputId="overtime2-paid-daily"
                        checked={Boolean(Number(field.value))}
                        onChange={field.onChange}
                     />
                  )}
               />
            </div>
            <div className="field">
               <label htmlFor="overtime2-paid-daily-after">
                  {t("dashboard.officer.after")}
               </label>
               <Controller
                  name="payroll_settings.overtime2_paid_daily.hours"
                  control={control}
                  render={({ field }) => (
                     <InputText
                        className="w-22rem mx-2 mt-2"
                        id="overtime2-paid-daily-after"
                        type="number"
                        {...field}
                        onChange={(event) =>
                           field.onChange(+event.target.value)
                        }
                     />
                  )}
               />
               <span>{t("dashboard.officer.hours")}</span>
            </div>
         </div>

         <div className="field flex">
            <label className="mr-2" htmlFor="apply-7th">
               {t("dashboard.officer.apply-7th-consecutive-day-overtime-rule")}
            </label>
            <Controller
               name="apply_7th"
               control={control}
               render={({ field }) => (
                  <Checkbox
                     inputId="apply-7th"
                     checked={Boolean(Number(field.value))}
                     onChange={field.onChange}
                  />
               )}
            />
         </div>

         <h4>{t("dashboard.officer.hourly-pay-rates")}</h4>
         <div className="field">
            <label htmlFor="hourly-rate-regular">
               {t("dashboard.officer.regular-rate")}
            </label>
            <Controller
               name="payroll_settings.hourly_rate.regular"
               control={control}
               render={({ field }) => (
                  <InputText
                     id="hourly-rate-regular"
                     type="number"
                     {...field}
                     onChange={(event) => field.onChange(+event.target.value)}
                  />
               )}
            />
         </div>
         <div className="field">
            <label htmlFor="hourly-rate-overtime">
               {t("dashboard.officer.overtime-rate")}
            </label>
            <Controller
               name="payroll_settings.hourly_rate.overtime"
               control={control}
               render={({ field }) => (
                  <InputText
                     id="hourly-rate-overtime"
                     type="number"
                     {...field}
                     onChange={(event) => field.onChange(+event.target.value)}
                  />
               )}
            />
         </div>
         <div className="field">
            <label htmlFor="hourly-rate-overtime2">
               {t("dashboard.officer.overtime2-rate")}
            </label>
            <Controller
               name="payroll_settings.hourly_rate.overtime2"
               control={control}
               render={({ field }) => (
                  <InputText
                     id="hourly-rate-overtime2"
                     type="number"
                     {...field}
                     onChange={(event) => field.onChange(+event.target.value)}
                  />
               )}
            />
         </div>
      </>
   );
}
