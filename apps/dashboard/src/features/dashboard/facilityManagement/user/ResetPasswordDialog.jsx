import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPasswordSchema } from "./resetPasswordSchema";
import { ErrorMessage } from "~/components/ErrorMessage";

export function ResetPasswordDialog(props) {
   const { isOpen, onClose, save, loading, error } = props;

   const { t } = useTranslation();
   const {
      control,
      handleSubmit,
      formState: { errors },
      reset,
   } = useForm({
      resolver: yupResolver(resetPasswordSchema),
      defaultValues: {
         old_password: "",
         new_password: "",
         new_password_confirmation: "",
      },
   });

   function onSubmit(data) {
      save(data);
   }

   function closeDialog() {
      onClose();
      reset();
   }

   return (
      <Dialog
         modal
         visible={isOpen}
         style={{ width: "470px" }}
         showHeader={false}
         closable={false}
         className="p-fluid client-form-dialog"
         onHide={closeDialog}
         transitionOptions={{
            timeout: 500,
         }}
      >
         <div
            className="flex align-items-center justify-content-between border-bottom-1 pb-2 mt-2 mb-4"
            style={{ borderColor: "var(--gray-50)" }}
         >
            <span className="text-xl font-bold">Reset Password</span>
         </div>
         <div>
            <div className="field">
               <label htmlFor="old-password">
                  Old Password<span className="required-field">*</span>
               </label>
               <Controller
                  name="old_password"
                  control={control}
                  render={({ field }) => (
                     <InputText type="password" id="old-password" {...field} />
                  )}
               />
               {errors.old_password?.message && (
                  <small className="p-invalid">
                     {t(errors.old_password?.message)}
                  </small>
               )}
            </div>
            <div className="field">
               <label htmlFor="new-password">
                  New Passowrd<span className="required-field">*</span>
               </label>
               <Controller
                  name="new_password"
                  control={control}
                  render={({ field }) => (
                     <InputText type="password" id="new_password" {...field} />
                  )}
               />
               {errors.new_password?.message && (
                  <small className="p-invalid">
                     {t(errors.new_password?.message)}
                  </small>
               )}
            </div>
            <div className="field">
               <label htmlFor="new-password-confirmation">
                  New Password confirmation
                  <span className="required-field">*</span>
               </label>
               <Controller
                  name="new_password_confirmation"
                  control={control}
                  render={({ field }) => (
                     <InputText
                        type="password"
                        id="new-password-confirmation"
                        {...field}
                     />
                  )}
               />
               {errors.new_password_confirmation?.message && (
                  <small className="p-invalid">
                     {t(errors.new_password_confirmation?.message)}
                  </small>
               )}
            </div>
         </div>
         <ErrorMessage error={error} />
         <div className="flex ml-auto w-11rem mt-4">
            <Button
               onClick={closeDialog}
               label={t("common.cancel")}
               className="p-button-text"
               style={{ color: "var(--accent-text-color)" }}
            />
            <Button
               onClick={handleSubmit(onSubmit)}
               loading={loading}
               label="Reset"
               className="ml-3"
            />
         </div>
      </Dialog>
   );
}
