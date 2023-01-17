import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useVisitorIn } from "../hooks/useVisitorIn";
import { ErrorMessage } from "~/components/ErrorMessage";
import { OfficerLayoutWithBackButton } from "../layout/OfficerLayoutWithBackButton";
import { MobileContainer } from "../components/Container";
import { yupResolver } from "@hookform/resolvers/yup";
import { visitorSchema } from "../visitor/visitorSchema";
import { Dropdown } from "primereact/dropdown";
import { transformToDropdownOptions } from "~/utils/transformToDropdownOptions";
import { useTypes } from "../hooks/useTypes";
import { Dropzone, useMultipleUpload } from "~/components/Dropzone";
import { OfficerAndSiteName } from "../../freelancer-admin/OfficerAndSiteName";

export default function VisitorIn() {
   const { siteId } = useParams();
   const { status, data } = useTypes({ siteId, name: 'visitor' })

   const {
      control,
      handleSubmit,
      formState: { isValid },
      setValue,
      register,
      watch,
   } = useForm({
      mode: "onChange",
      resolver: yupResolver(visitorSchema),
      defaultValues: {
         type_id: "",
         first_name: "",
         last_name: "",
         mobile_phone: "",
         destination: "",
         other_type: "",
         badge: "",
         lp: "",
         temperature: "",
         face_covering: "",
         company: "",
         notes: "",
         files: [],
      },
   });

   const image = watch("files");
   const { onSetValue } = useMultipleUpload(image, setValue)

   const report = useVisitorIn({
      onSuccess() {
         // on success
      },
   });

   function onSubmit(data) {
      report.mutate({ dataReport: data, siteId });
   }

   return (
      <>
         <OfficerLayoutWithBackButton title="Visitor Check-in">
            <MobileContainer>
               <OfficerAndSiteName />
               <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="field flex flex-col">
                     <label htmlFor="first-name">
                        First Name<span className="required-field">*</span>
                     </label>
                     <Controller
                        name="first_name"
                        control={control}
                        render={({ field }) => (
                           <InputText
                              id="first-name"
                              placeholder="Visitor first name"
                              {...field}
                           />
                        )}
                     />
                  </div>
                  <div className="field flex flex-col">
                     <label htmlFor="last-name">
                        Last Name<span className="required-field">*</span>
                     </label>
                     <Controller
                        name="last_name"
                        control={control}
                        render={({ field }) => (
                           <InputText
                              id="last-name"
                              placeholder="Visitor last name"
                              {...field}
                           />
                        )}
                     />
                  </div>
                  <div className="field flex flex-col">
                     <label htmlFor="mobile-phone">
                        Mobile Phone
                     </label>
                     <Controller
                        name="mobile_phone"
                        control={control}
                        render={({ field }) => (
                           <InputText
                              id="mobile-phone"
                              placeholder="+0000000000"
                              {...field}
                           />
                        )}
                     />
                  </div>
                  <div className="field flex flex-col">
                     <label htmlFor="destination">
                        Host Company / Destination<span className="required-field">*</span>
                     </label>
                     <Controller
                        name="destination"
                        control={control}
                        render={({ field }) => (
                           <InputText
                              id="destination"
                              placeholder="Destination"
                              value={field.value}
                              onChange={(event) => {
                                 const inputValue = event.target.value
                                 setValue('company', inputValue)
                                 field.onChange(event)
                              }}
                           />
                        )}
                     />
                  </div>
                  <div className="field flex flex-col">
                     <label htmlFor="type">ID Type<span className="required-field">*</span></label>
                     <Controller
                        name="type_id"
                        control={control}
                        render={({ field }) => (
                           <Dropdown
                              id="type"
                              disabled={status === "loading"}
                              value={field.value}
                              options={transformToDropdownOptions(data?.data)}
                              onChange={field.onChange}
                              placeholder="Select ID"
                           />
                        )}
                     />
                  </div>
                  <div className="field flex flex-col">
                     <label htmlFor="badge">
                        Badge #
                     </label>
                     <Controller
                        name="badge"
                        control={control}
                        render={({ field }) => (
                           <InputText
                              id="badge"
                              placeholder="Badge"
                              {...field}
                           />
                        )}
                     />
                  </div>
                  <div className="field flex flex-col">
                     <label htmlFor="lp">
                        License Plate #
                     </label>
                     <Controller
                        name="lp"
                        control={control}
                        render={({ field }) => (
                           <InputText
                              id="lp"
                              placeholder="License Plate"
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
                     loading={report.isLoading}
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
