import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { useForm, Controller } from "react-hook-form";
import { useReport } from "../hooks/useReport";
import { ErrorMessage } from "~/components/ErrorMessage";
import { useParams } from "react-router-dom";
import { OfficerLayoutWithBackButton } from "../layout/OfficerLayoutWithBackButton";
import { MobileContainer } from "../components/Container";
import { OfficerAndSiteName } from "~/features/freelancer-admin/OfficerAndSiteName";
import { Dropzone, useMultipleUpload } from "~/components/Dropzone";
import { yupResolver } from "@hookform/resolvers/yup";
import { truckSchema } from "../truck/truckSchema";

export default function TruckIn() {
   const { siteId } = useParams();
   const name = "vehicle/in";

   const {
      control,
      handleSubmit,
      formState: { isValid },
      watch,
      register,
      setValue,
   } = useForm({
      mode: "onChange",
      resolver: yupResolver(truckSchema),
      defaultValues: {
         company: "",
         driver: "",
         license_plate: "",
         in_mileage: "",
         purpose: "",
         notes: "",
         files: [],
      },
   });

   const image = watch('files')
   const { onSetValue } = useMultipleUpload(image, setValue)

   const report = useReport({
      onSuccess() {
         // toast success
      },
   });

   function onSubmit(data) {
      report.mutate({ dataReport: data, name, siteId });
   }

   return (
      <>
         <OfficerLayoutWithBackButton title="Vehicle Check-in">
            <MobileContainer>
               <OfficerAndSiteName />
               <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="field flex flex-col">
                     <label htmlFor="driver-name">
                        Driver Name<span className="required-field">*</span>
                     </label>
                     <Controller
                        name="driver"
                        control={control}
                        render={({ field }) => (
                           <InputText
                              id="driver-name"
                              placeholder="Driver name"
                              {...field}
                           />
                        )}
                     />
                  </div>
                  <div className="field flex flex-col">
                     <label htmlFor="company">
                        Company<span className="required-field">*</span>
                     </label>
                     <Controller
                        name="company"
                        control={control}
                        render={({ field }) => (
                           <InputText
                              id="company"
                              placeholder="Company name"
                              {...field}
                           />
                        )}
                     />
                  </div>
                  <div className="field flex flex-col">
                     <label htmlFor="license-plate">
                        License Plate #
                     </label>
                     <Controller
                        name="lp"
                        control={control}
                        render={({ field }) => (
                           <InputText
                              id="license-plate"
                              placeholder="License plate"
                              {...field}
                           />
                        )}
                     />
                  </div>
                  <div className="field flex flex-col">
                     <label htmlFor="in-mileage">
                        In Mileage
                     </label>
                     <Controller
                        name="in_mileage"
                        control={control}
                        render={({ field }) => (
                           <InputText
                              id="in-mileage"
                              placeholder="In mileage"
                              {...field}
                           />
                        )}
                     />
                  </div>
                  <div className="field flex flex-col">
                     <label htmlFor="purpose">
                        Purpose
                     </label>
                     <Controller
                        name="purpose"
                        control={control}
                        render={({ field }) => (
                           <InputText
                              id="purpose"
                              placeholder="Purpose"
                              {...field}
                           />
                        )}
                     />
                  </div>
                  <div className="field flex flex-col">
                     <label htmlFor="notes">
                        Entry Notes
                     </label>
                     <Controller
                        name="notes"
                        control={control}
                        render={({ field }) => (
                           <InputTextarea
                              id="notes"
                              className="min-h-[150px]"
                              rows={5}
                              cols={30}
                              placeholder="Write your note here"
                              {...field}
                           />
                        )}
                     />
                  </div>
                  <div className="my-4">
                     <Dropzone
                        multiple
                        register={register}
                        file={image}
                        setValue={onSetValue}
                        valueKey="files"
                        isRequired={false}
                     />
                  </div>
                  <div className="my-4">
                     <ErrorMessage error={report.error} />
                  </div>
                  <Button
                     disabled={!isValid}
                     type="submit"
                     className="bg-blue-4 hover:!bg-blue-4/75 w-full"
                     label="Submit"
                  />
               </form>
            </MobileContainer>
         </OfficerLayoutWithBackButton>
      </>
   );
}
