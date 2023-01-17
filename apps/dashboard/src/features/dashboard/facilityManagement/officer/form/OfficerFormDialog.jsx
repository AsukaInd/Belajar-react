import { useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { OfficerFormBasicInformation } from "./OfficerFormBasicInformation";
// import { OfficerFormPayrollSettings } from "./OfficerFormPayrollSettings";
// import { TabView, TabPanel } from "primereact/tabview";

export function OfficerFormDialog(props) {
   const { isOpen, onClose, title, save, loading, error, editData, status } =
      props;

   const { t } = useTranslation();
   const {
      control,
      handleSubmit,
      formState: { errors },
      reset,
      setValue,
   } = useForm({
      defaultValues: {
         first_name: "",
         last_name: "",
         emp_number: "",
         is_supervisor: false,
         email: "",
         phone: "",
         pushover_key: "",
         address_1: "",
         address_2: "",
         city: "",
         state: "",
         postal_code: "",
         country: "",
         username: "",
         password: "",
         password_confirmation: "",
         timezone: "",
         role: "",
         payroll_number: "",
         payroll_settings: {
            overtime_paid_weekly: {
               enabled: false,
               hours: 0,
            },
            overtime_paid_daily: {
               enabled: false,
               hours: 0,
            },
            overtime2_paid_daily: {
               enabled: false,
               hours: 0,
            },
            hourly_rate: {
               regular: 0,
               overtime: 0,
               overtime2: 0,
            },
         },
         apply_7th: false,
      },
   });

   useEffect(() => {
      if (editData && !loading) {
         Object.entries(editData).forEach(([key, value]) => {
            if (key !== "payroll_settings") {
               setValue(
                  key === "roles" ? "role" : key,
                  key === "roles"
                     ? Array.isArray(value) && value.length > 0 && value[0].name
                     : value === null
                     ? ""
                     : value
               );
            }
         });

         setValue("payroll_settings", editData.payroll_settings);
         setValue("password", "");
         setValue("password_confirmation", "");
      }
   }, [editData, isOpen]);

   useEffect(() => {
      if (status === "success") {
         reset();
      }
   }, [status]);

   function onSubmit(data) {
      save(data);
   }

   function closeDialog() {
      onClose();
      reset();
   }

   return (
      <Dialog
         visible={isOpen}
         style={{ width: "450px" }}
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
                  onClick={handleSubmit(onSubmit)}
                  label={t("common.save")}
                  icon="pi pi-check"
                  className="p-button-text"
               />
            </>
         }
      >
         <OfficerFormBasicInformation control={control} errors={errors} />

         {error && error.status < 500 ? (
            <span className="mb-4">{error.data.message}</span>
         ) : (
            error?.statusText
         )}
      </Dialog>
   );
}
