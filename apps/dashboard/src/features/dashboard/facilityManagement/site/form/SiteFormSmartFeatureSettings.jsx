import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

export function SiteFormSmartFeatureSettings({ smart_feature, control }) {
   const { t } = useTranslation();

   return (
      <div>
         <div className="field flex">
            <label className="mr-2" htmlFor="scan-tour-tracker-activity">
               {t("dashboard.site.check-tour-tracker-scan-activity")}
            </label>
            <Controller
               name="smart_feature.tour_tracker_scan_activity"
               control={control}
               render={({ field }) => (
                  <Checkbox
                     inputId="scan-tour-tracker-activity"
                     checked={Boolean(Number(field.value))}
                     onChange={field.onChange}
                  />
               )}
            />
         </div>
         <div className="field">
            <label htmlFor="minutes-between-checks">
               {t("dashboard.site.minutes-between-checks")}
            </label>
            <Controller
               name="smart_feature.minutes_between_check"
               control={control}
               rules={{ min: 0 }}
               render={({ field }) => (
                  <InputText
                     min={0}
                     type="number"
                     id="minutes-between-checks"
                     {...field}
                     onChange={(event) => field.onChange(+event.target.value)}
                  />
               )}
            />
         </div>
         <div className="field">
            <label htmlFor="minimum-total-scans">
               {t("dashboard.site.minimum-total-scans")}
            </label>
            <Controller
               name="smart_feature.min_total_scan"
               control={control}
               rules={{ min: 0 }}
               render={({ field }) => (
                  <InputText
                     min={0}
                     type="number"
                     id="minimum-total-scans"
                     {...field}
                     onChange={(event) => field.onChange(+event.target.value)}
                  />
               )}
            />
         </div>
         <div className="field">
            <label htmlFor="minimum-unique-stops-scanned">
               {t("dashboard.site.minimum-unique-stops-scanned")}
            </label>
            <Controller
               name="smart_feature.min_unique_stop_scan"
               control={control}
               rules={{ min: 0 }}
               render={({ field }) => (
                  <InputText
                     min={0}
                     type="number"
                     id="minimum-unique-stops-scanned"
                     {...field}
                     onChange={(event) => field.onChange(+event.target.value)}
                  />
               )}
            />
         </div>
         <div className="field flex">
            <label
               className="mr-2"
               htmlFor="send-SMS-notification-to-supervisor"
            >
               {t("dashboard.site.send-SMS-notification-to-supervisor")}
            </label>
            <Controller
               name="smart_feature.send_sms_supervisor"
               control={control}
               render={({ field }) => (
                  <Checkbox
                     inputId="send-SMS-notification-to-supervisor"
                     checked={Boolean(Number(field.value))}
                     onChange={field.onChange}
                  />
               )}
            />
         </div>
         <div className="field flex">
            <label className="mr-2" htmlFor="send-geofence-alert">
               {t("dashboard.site.send-geofence-alert")}
            </label>
            <Controller
               name="smart_feature.send_geofence"
               control={control}
               render={({ field }) => (
                  <Checkbox
                     inputId="send-geofence-alert"
                     checked={Boolean(Number(field.value))}
                     onChange={field.onChange}
                  />
               )}
            />
         </div>
      </div>
   );
}
