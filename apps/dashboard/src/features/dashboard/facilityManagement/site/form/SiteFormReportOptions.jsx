import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useLists } from "~/features/dashboard/facilityManagement/hooks/list/useLists";
import { InputText } from "primereact/inputtext";

export function SiteFormReportOptions({ control, errors, report_options }) {
   const { t } = useTranslation();

   const observationList = useLists({ name: "observation" });
   const maintenanceList = useLists({ name: "maintenance" });
   const visitorList = useLists({ name: "visitor_id" });
   const incidentList = useLists({ name: "incident" });
   const equipmentList = useLists({ name: "equipment" });

   function transform(data) {
      if (data) {
         return data.map((item) => ({ label: item.name, value: item.id }));
      }
   }

   return (
      <table className="site-form-report-options">
         <thead>
            <tr>
               <th>{t("dashboard.site.report")}</th>
               <th>{t("dashboard.site.approval-required")}</th>
               <th>{t("dashboard.site.editable")}</th>
               <th>{t("dashboard.site.email")}</th>
               <th>{t("dashboard.site.type-list")}</th>
            </tr>
         </thead>
         <tbody>
            <tr>
               <td>{t("dashboard.site.incident")}</td>
               <td>
                  <Controller
                     name="report_options.incident.approval_required"
                     control={control}
                     render={({ field }) => (
                        <Checkbox
                           checked={Boolean(Number(field.value))}
                           onChange={field.onChange}
                        />
                     )}
                  />
               </td>
               <td>
                  <Controller
                     name="report_options.incident.editable"
                     control={control}
                     render={({ field }) => (
                        <Checkbox
                           checked={Boolean(Number(field.value))}
                           onChange={field.onChange}
                        />
                     )}
                  />
               </td>
               <td>
                  <Controller
                     name="report_options.incident.email"
                     control={control}
                     render={({ field }) => (
                        <Checkbox
                           checked={Boolean(Number(field.value))}
                           onChange={field.onChange}
                        />
                     )}
                  />
               </td>
               <td>
                  <Controller
                     name="report_options.incident.incident_type_id"
                     control={control}
                     render={({ field }) => (
                        <Dropdown
                           value={field.value}
                           disabled={incidentList.isLoading}
                           options={
                              incidentList.isSuccess
                                 ? transform(incidentList.data.data)
                                 : []
                           }
                           placeholder="select type"
                           onChange={field.onChange}
                        />
                     )}
                  />
               </td>
            </tr>
            <tr>
               <td>{t("common.daily-activity")}</td>
               <td>
                  <Controller
                     name="report_options.daily_activity.approval_required"
                     control={control}
                     render={({ field }) => (
                        <Checkbox
                           checked={Boolean(Number(field.value))}
                           onChange={field.onChange}
                        />
                     )}
                  />
               </td>
               <td>
                  <Controller
                     name="report_options.daily_activity.editable"
                     control={control}
                     render={({ field }) => (
                        <Checkbox
                           checked={Boolean(Number(field.value))}
                           onChange={field.onChange}
                        />
                     )}
                  />
               </td>
               <td>
                  <Controller
                     name="report_options.daily_activity.email"
                     control={control}
                     render={({ field }) => (
                        <Checkbox
                           checked={Boolean(Number(field.value))}
                           onChange={field.onChange}
                        />
                     )}
                  />
               </td>
               <td>
                  <Controller
                     name="report_options.daily_activity.observation_type_id"
                     control={control}
                     render={({ field }) => (
                        <Dropdown
                           value={field.value}
                           disabled={observationList.isLoading}
                           options={
                              observationList.isSuccess
                                 ? transform(observationList.data.data)
                                 : []
                           }
                           placeholder="select type"
                           onChange={field.onChange}
                        />
                     )}
                  />
               </td>
            </tr>
            <tr>
               <td>{t("common.maintenance-request")}</td>
               <td>
                  <Controller
                     name="report_options.maintenance_request.approval_required"
                     control={control}
                     render={({ field }) => (
                        <Checkbox
                           checked={Boolean(Number(field.value))}
                           onChange={field.onChange}
                        />
                     )}
                  />
               </td>
               <td>
                  <Controller
                     name="report_options.maintenance_request.editable"
                     control={control}
                     render={({ field }) => (
                        <Checkbox
                           checked={Boolean(Number(field.value))}
                           onChange={field.onChange}
                        />
                     )}
                  />
               </td>
               <td>
                  <Controller
                     name="report_options.maintenance_request.email"
                     control={control}
                     render={({ field }) => (
                        <Checkbox
                           checked={Boolean(Number(field.value))}
                           onChange={field.onChange}
                        />
                     )}
                  />
               </td>
               <td>
                  <Controller
                     name="report_options.maintenance_request.maintenance_type_id"
                     control={control}
                     render={({ field }) => (
                        <Dropdown
                           value={field.value}
                           disabled={maintenanceList.isLoading}
                           options={
                              maintenanceList.isSuccess
                                 ? transform(maintenanceList.data.data)
                                 : []
                           }
                           placeholder="select type"
                           onChange={field.onChange}
                        />
                     )}
                  />
               </td>
            </tr>
            <tr>
               <td>{t("dashboard.site.field-inspection")}</td>
               <td>
                  <Controller
                     name="report_options.field_inspection.approval_required"
                     control={control}
                     render={({ field }) => (
                        <Checkbox
                           checked={Boolean(Number(field.value))}
                           onChange={field.onChange}
                        />
                     )}
                  />
               </td>
               <td>
                  <Controller
                     name="report_options.field_inspection.editable"
                     control={control}
                     render={({ field }) => (
                        <Checkbox
                           checked={Boolean(Number(field.value))}
                           onChange={field.onChange}
                        />
                     )}
                  />
               </td>
               <td>
                  <Controller
                     name="report_options.field_inspection.email"
                     control={control}
                     render={({ field }) => (
                        <Checkbox
                           checked={Boolean(Number(field.value))}
                           onChange={field.onChange}
                        />
                     )}
                  />
               </td>
            </tr>
            <tr>
               <td>{t("dashboard.site.temperature-log")}</td>
               <td>
                  <Controller
                     name="report_options.temperature_log.approval_required"
                     control={control}
                     render={({ field }) => (
                        <Checkbox
                           checked={Boolean(Number(field.value))}
                           onChange={field.onChange}
                        />
                     )}
                  />
               </td>
               <td>
                  <Controller
                     name="report_options.temperature_log.editable"
                     control={control}
                     render={({ field }) => (
                        <Checkbox
                           checked={Boolean(Number(field.value))}
                           onChange={field.onChange}
                        />
                     )}
                  />
               </td>
               <td>
                  <Controller
                     name="report_options.temperature_log.email"
                     control={control}
                     render={({ field }) => (
                        <Checkbox
                           checked={Boolean(Number(field.value))}
                           onChange={field.onChange}
                        />
                     )}
                  />
               </td>
               <td>
                  <Controller
                     name="report_options.temperature_log.equipment_type_id"
                     control={control}
                     render={({ field }) => (
                        <Dropdown
                           value={field.value}
                           disabled={equipmentList.isLoading}
                           options={
                              equipmentList.isSuccess
                                 ? transform(equipmentList.data.data)
                                 : []
                           }
                           placeholder="select type"
                           onChange={field.onChange}
                        />
                     )}
                  />
               </td>
            </tr>
            <tr>
               <td>{t("dashboard.site.tour-stop-scans")}</td>
               <td>
                  <Controller
                     name="report_options.tour_stop_scans.approval_required"
                     control={control}
                     render={({ field }) => (
                        <Checkbox
                           checked={Boolean(Number(field.value))}
                           onChange={field.onChange}
                        />
                     )}
                  />
               </td>
               <td>
                  <Controller
                     name="report_options.tour_stop_scans.editable"
                     control={control}
                     render={({ field }) => (
                        <Checkbox
                           checked={Boolean(Number(field.value))}
                           onChange={field.onChange}
                        />
                     )}
                  />
               </td>
               <td>
                  <Controller
                     name="report_options.tour_stop_scans.email"
                     control={control}
                     render={({ field }) => (
                        <Checkbox
                           checked={Boolean(Number(field.value))}
                           onChange={field.onChange}
                        />
                     )}
                  />
               </td>
               <td>
                  <Controller
                     name="report_options.tour_stop_scans.time_to_send_daily"
                     control={control}
                     render={({ field }) => (
                        <InputText placeholder="07:00" {...field} />
                     )}
                  />
               </td>
            </tr>
            <tr>
               <td>{t("dashboard.site.tour-exception")}</td>
               <td>
                  <Controller
                     name="report_options.tour_exception.approval_required"
                     control={control}
                     render={({ field }) => (
                        <Checkbox
                           checked={Boolean(Number(field.value))}
                           onChange={field.onChange}
                        />
                     )}
                  />
               </td>
               <td>
                  <Controller
                     name="report_options.tour_exception.editable"
                     control={control}
                     render={({ field }) => (
                        <Checkbox
                           checked={Boolean(Number(field.value))}
                           onChange={field.onChange}
                        />
                     )}
                  />
               </td>
               <td>
                  <Controller
                     name="report_options.tour_exception.email"
                     control={control}
                     render={({ field }) => (
                        <Checkbox
                           checked={Boolean(Number(field.value))}
                           onChange={field.onChange}
                        />
                     )}
                  />
               </td>
            </tr>
            <tr>
               <td>{t("dashboard.site.visitor-log")}</td>
               <td>
                  <Controller
                     name="report_options.visitor_log.approval_required"
                     control={control}
                     render={({ field }) => (
                        <Checkbox
                           checked={Boolean(Number(field.value))}
                           onChange={field.onChange}
                        />
                     )}
                  />
               </td>
               <td>
                  <Controller
                     name="report_options.visitor_log.editable"
                     control={control}
                     render={({ field }) => (
                        <Checkbox
                           checked={Boolean(Number(field.value))}
                           onChange={field.onChange}
                        />
                     )}
                  />
               </td>
               <td>
                  <Controller
                     name="report_options.visitor_log.email"
                     control={control}
                     render={({ field }) => (
                        <Checkbox
                           checked={Boolean(Number(field.value))}
                           onChange={field.onChange}
                        />
                     )}
                  />
               </td>
               <td>
                  <Controller
                     name="report_options.visitor_log.visitor_type_id"
                     control={control}
                     render={({ field }) => (
                        <Dropdown
                           value={field.value}
                           disabled={visitorList.isLoading}
                           options={
                              visitorList.isSuccess
                                 ? transform(visitorList.data.data)
                                 : []
                           }
                           placeholder="select type"
                           onChange={field.onChange}
                        />
                     )}
                  />
               </td>
            </tr>
         </tbody>
      </table>
   );
}
