import { useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { Dropdown } from "primereact/dropdown";
import { yupResolver } from "@hookform/resolvers/yup";
import { inviteNewUserSchema } from "./inviteNewUserSchema";
import { ErrorMessage } from "~/components/ErrorMessage";
import { InputTextarea } from "primereact/inputtextarea";
import { Message } from "primereact/message";

export function InviteNewUserFormDialog(props) {
   const {
      isOpen,
      onClose,
      save,
      loading,
      error,
      status,
   } = props;
   const { t } = useTranslation();
   const {
      control,
      handleSubmit,
      formState: { errors, isValid },
      reset,
      setValue,
      getValues,
   } = useForm({
      mode: "onChange",
      resolver: yupResolver(inviteNewUserSchema),
      defaultValues: {
         email: "",
      },
   });

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
   }

   return (
      <Dialog
         dismissableMask
         modal
         visible={isOpen}
         style={{ width: "470px" }}
         showHeader={false}
         closable={false}
         className="p-fluid"
         onHide={closeDialog}
         transitionOptions={{
            timeout: 500,
         }}
      >
         <div
            className="flex align-items-center justify-content-between pb-2 mt-2"
         >
            <span className="text-xl font-bold">
               Add New User
            </span>
         </div>
         <p className="mb-4 text-[#a7a7a7]">
            You can adding any users by using their email. You can invite more than one user by sparate it by comma
         </p>
         <div>
            <div className="field">
               <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                     <InputTextarea
                        placeholder="Type email with separated by comma"
                        id="email"
                        rows={1}
                        cols={30}
                        {...field}
                     />
                  )}
               />
               {errors.email?.message && (
                  <small className="p-invalid">
                     {t(errors.email?.message)}
                  </small>
               )}
            </div>
         </div>
         <ErrorMessage error={error} />
         <div className="flex justify-end">
            <Button
               className="w-auto"
               disabled={!isValid}
               onClick={handleSubmit(onSubmit)}
               loading={loading}
               label="Invite"
            />
         </div>
      </Dialog>
   );
}
