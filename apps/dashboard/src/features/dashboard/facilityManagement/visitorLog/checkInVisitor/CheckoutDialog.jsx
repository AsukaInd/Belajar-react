import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "~/components/ErrorMessage";
import { InputTextarea } from "primereact/inputtextarea";

export function CheckoutDialog(props) {
   const {
      isOpen,
      onClose,
   } = props;
   const { t } = useTranslation();
   const {
      control,
      handleSubmit,
      reset,
   } = useForm({
      mode: "onChange",
      defaultValues: {
         exit_notes: ""
      },
   });

   function onSubmit(data) {
      console.log(data)
   }

   function closeDialog() {
      onClose();
      reset();
   }

   return (
      <Dialog
         modal
         showHeader={false}
         closable={false}
         visible={isOpen}
         className="p-fluid"
         onHide={closeDialog}
         transitionOptions={{
            timeout: 500,
         }}
      >
         <div
            className="flex align-items-center justify-content-between border-bottom-1 pb-2 mb-4"
            style={{ borderColor: "var(--gray-50)" }}
         >
            <span className="text-xl font-bold">Checkout Visitor</span>
            <Button
               icon="pi pi-times"
               className="p-button-rounded p-button-text"
               style={{ color: "var(--accent-text-color)" }}
               onClick={closeDialog}
            />
         </div>
         <div>
            <div className="field">
               <label htmlFor="exit-notes">
                  Exit Notes
               </label>
               <Controller
                  name="exit_notes"
                  control={control}
                  render={({ field }) => (
                     <InputTextarea
                        id="exit-notes"
                        className="h-[147px]"
                        placeholder="Input the exit notes ..."
                        rows={7}
                        cols={30}
                        {...field}
                     />
                  )}
               />
            </div>
         </div>
         {/* <div className="my-4">
            <ErrorMessage error={error} />
         </div> */}
         <Button
            onClick={handleSubmit(onSubmit)}
            label="Checkout"
         />
      </Dialog>
   );
}
