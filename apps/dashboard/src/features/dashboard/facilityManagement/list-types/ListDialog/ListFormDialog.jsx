import { useForm, Controller } from "react-hook-form";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useEffect } from "react";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import { Checkbox } from "primereact/checkbox";

export function ListFormDialog(props) {
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
         name: "",
         is_default: false,
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
         <form>
            <div className="field">
               <label htmlFor="name">{t("common.name")}</label>
               <Controller
                  name="name"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <InputText id="name" {...field} />}
               />
               {errors.name && t("validation.name-required")}
            </div>
            <div className="field flex">
               <label className="mr-2" htmlFor="is-default">
                  {t("dashboard.type-list.is-default")}
               </label>
               <Controller
                  name="is_default"
                  control={control}
                  render={({ field }) => (
                     <Checkbox
                        inputId="is-default"
                        checked={Boolean(Number(field.value))}
                        onChange={field.onChange}
                     />
                  )}
               />
            </div>
            {error && error.status < 500 ? (
               <span className="mb-4">{error.data.message}</span>
            ) : (
               error?.statusText
            )}
         </form>
      </Dialog>
   );
}
