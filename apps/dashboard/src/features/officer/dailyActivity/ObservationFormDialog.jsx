import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { useTranslation } from "react-i18next";
import { InputTextarea } from "primereact/inputtextarea";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import { useTypes } from "../hooks/useTypes";
import { transformToDropdownOptions } from "~/utils/transformToDropdownOptions";

export function ObservationFormDialog(props) {
   const { isOpen, onClose, editData, save, title, name, siteId } = props;
   const { t } = useTranslation();
   const {
      control,
      handleSubmit,
      formState: { errors },
      reset,
      setValue,
   } = useForm({
      defaultValues: {
         type: "",
         type_id: "",
         comments: "",
      },
   });

   const { status, data } = useTypes({ name, siteId });
   const options = transformToDropdownOptions(data?.data);

   useEffect(() => {
      if (editData) {
         Object.entries(editData).forEach(([key, value]) => {
            setValue(key, value === null ? "" : value);
         });
      }
   }, [editData]);

   function closeDialog() {
      onClose();
      reset();
   }

   function onSubmit(data) {
      save(data);
      reset();
   }

   function findLabel(id) {
      return options.findIndex((option) => option.value === id);
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
                  onClick={handleSubmit(onSubmit)}
                  label={t("common.submit")}
                  icon="pi pi-check"
                  className="p-button-text"
               />
            </>
         }
      >
         <form>
            <div className="field flex flex-column mb-3">
               <Controller
                  name="type_id"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                     <Dropdown
                        disabled={status === "loading"}
                        value={field.value}
                        options={options}
                        onChange={(e) => {
                           setValue("type", options[findLabel(e.value)]?.label);
                           field.onChange(e);
                        }}
                        placeholder="select type"
                     />
                  )}
               />
               {errors.type_id && t("daily-activity.type-observation-required")}
            </div>
            <div className="field flex flex-column mb-3">
               <label htmlFor="comments">{t("daily-activity.comments")}</label>
               <Controller
                  name="comments"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                     <InputTextarea
                        value={field.value}
                        onChange={field.onChange}
                        id="comments"
                        rows={5}
                        cols={30}
                     />
                  )}
               />
               {errors.comments && t("daily-activity.comments-required")}
            </div>
         </form>
      </Dialog>
   );
}
