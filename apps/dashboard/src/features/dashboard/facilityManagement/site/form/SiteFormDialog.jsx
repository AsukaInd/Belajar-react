import { useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import { SiteFormHeader } from "./SiteFormHeader";
import { TabView, TabPanel } from "primereact/tabview";
import { SiteFormLocation } from "./SiteFormLocation";
import { SiteFormReportOptions } from "./SiteFormReportOptions";
import { SiteFormSpvAssingment } from "./SiteFormSpvAssingment";
import { SiteFormSmartFeatureSettings } from "./SiteFormSmartFeatureSettings";
import { useForm } from "react-hook-form";

export function SiteFormDialog(props) {
   const { isOpen, onClose, title, save, loading, error, editData, status } =
      props;
   const { t } = useTranslation();
   const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
      watch,
      reset,
   } = useForm({
      defaultValues: {
         building: "",
         floor: "",
         room: "",
         description: "",
         client_id: "",
         site_name: "",
         enable_reporting: 1,
         enable_tour_tracking: 1,
         enable_hipaa_compliant: 1,
         site_address: "",
         geo_type: "",
         geo_data: null,
         latitude: "",
         longitude: "",
         report_options: {
            incident: {
               approval_required: false,
               editable: false,
               email: false,
               incident_type_id: "",
            },
            daily_activity: {
               approval_required: false,
               editable: false,
               email: false,
               observation_type_id: "",
            },
            maintenance_request: {
               approval_required: false,
               editable: false,
               email: false,
               maintenance_type_id: "",
            },
            parking_violation: {
               approval_required: false,
               editable: false,
               email: false,
               parking_violation_type_id: "",
            },
            field_inspection: {
               approval_required: false,
               editable: false,
               email: false,
            },
            temperature_log: {
               approval_required: false,
               editable: false,
               email: false,
               equipment_type_id: "",
            },
            tour_stop_scans: {
               approval_required: false,
               editable: false,
               email: false,
               time_to_send_daily: "",
            },
            tour_exception: {
               approval_required: false,
               editable: false,
               email: false,
            },
            visitor_log: {
               approval_required: false,
               editable: false,
               email: false,
               visitor_type_id: "",
            },
         },
         supervisor_assignment: [],
         smart_feature: {
            tour_tracker_scan_activity: false,
            minutes_between_check: 0,
            min_total_scan: 0,
            min_unique_stop_scan: 0,
            send_sms_supervisor: false,
            send_geofence: false,
         },
      },
   });

   useEffect(() => {
      if (editData && !loading) {
         Object.entries(editData).forEach(([key, value]) => {
            setValue(key, value === null ? "" : value);
         });
      }
   }, [editData]);

   useEffect(() => {
      if (status === "success") {
         reset();
      }
   }, [status]);

   function onSave(data) {
      save(data);
   }

   function closeDialog() {
      reset();
      onClose();
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

   return (
      <Dialog
         showHeader={false}
         style={{ minHeight: "600px" }}
         visible={isOpen}
         header={title}
         modal
         className="p-fluid"
         onHide={closeDialog}
         footer={
            <>
               <Button
                  onClick={closeDialog}
                  label={t("common.cancel")}
                  icon="pi pi-times"
                  className="p-button-text"
               />
               <Button
                  loading={loading}
                  onClick={handleSubmit(onSave)}
                  label={t("common.save")}
                  icon="pi pi-check"
                  className="p-button-text"
               />
            </>
         }
      >
         <SiteFormHeader control={control} errors={errors} />

         <TabView scrollable={false}>
            <TabPanel header={t("dashboard.site.site-location")}>
               <SiteFormLocation
                  geoData={editData ? editData?.geo_data : null}
                  longtitudeAndLatitude={
                     editData ? [editData?.longitude, editData?.latitude] : null
                  }
                  setLatitudeAndLongtitude={setLatitudeAndLongtitude}
                  setGeoData={setGeoData}
                  setGeoType={setGeoType}
                  control={control}
               />
            </TabPanel>
            <TabPanel header={t("dashboard.site.report-options")}>
               <SiteFormReportOptions
                  report_options={watch("report_options")}
                  control={control}
                  errors={errors}
               />
            </TabPanel>
            <TabPanel header={t("dashboard.site.supervisor-assignment")}>
               <SiteFormSpvAssingment
                  supervisorSelected={watch("supervisor_assignment")}
                  setValue={setValue}
               />
            </TabPanel>
            <TabPanel header={t("dashboard.site.smart-feature-settings")}>
               <SiteFormSmartFeatureSettings control={control} />
            </TabPanel>
         </TabView>

         {error ? <span className="mb-4">{error}</span> : undefined}
      </Dialog>
   );
}
