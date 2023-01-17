import { useState, useRef } from "react";
import { AppTopbar } from "~/features/freelancer/layout/AppTopbar";
import { Stepper } from "../gigs/components/Stepper";
import NavigationStep from "../profile/components/NavigationStep";
import { useForm } from "react-hook-form";
import PersonalInformation from "./components/personalInformation/PersonalInformation";
import ProfessionalInformation from "./components/professionalInformation/ProfessionalInformation";
import Skills from "./components/skills/Skills"
import { useFreelancerRegister } from "../hooks/freelancer/useFreelancerRegister";
import { Toast } from "primereact/toast";

export default function ProfileStepPage() {
   const toast = useRef(null);
   const [activeStep, setActiveStep] = useState(0);
   const labelStepper = [
      "Personal Information",
      "Professional Information",
      "Skills",
      "Payment Settings",
   ];

   const registerMutation = useFreelancerRegister({
      onSuccess(data) {
         localStorage.setItem("username", data?.data?.username);
         window.location.replace('/app/freelancer/my-profile')
      },
      onError() {
         toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "Unknown error",
            life: 3000,
         });
      }
   })

   const { control, handleSubmit, watch, setValue, register } = useForm({
      mode: "onChange",
      defaultValues: {
         first_name: '',
         last_name: '',
         name_in_local: '',
         email: '',
         phone_number: '',
         mobile_number: '',
         description: 'description',
         is_freelancer: 1,
         residence_birth: {
            address: '',
            address_local_language: '',
            country_id: '',
            province: '',
            city: '',
            postal_code: '',
            date_of_birth: '',
            id_type_id: '',
            id_number: ''
         },
         id_confirmation_photo: '',
         photo: '',
         work_experience: [
            {
               organization: '',
               title_or_position: '',
               industry_type_id: '',
               company_size_id: '',
               country_id: '',
               city_id: '',
               current_company: false,
               third_party_company: false,
               from: '',
               to: '',
               description_job: '',
               client: '',
               standart_protocols: ''
            }
         ],
         educations: [
            {
               major: '',
               university: '',
               from: '',
               to: '',
               certificate_education: ''
            }
         ],
         languages: [
            {
               language: '',
               language_level_id: '',
            }
         ],
         services: [{ service_type_id: '' }],
         product_inspection: {
            report_language_id: '',
            product_line_id: '',
            sub_product_line_id: ''
         },

         certifications: [
            {
               certificate_id: 1,
               training_organization: 'pagar nusa',
               from: '2020-01-01',
               to: '2020-01-02',
               certification_image: ''
            }
         ]
      }
   });

   const onSubmit = (data) => {
      registerMutation.mutate(data)
   };

   return (
      <>
         <AppTopbar
            left={
               <h1 className="mb-0" style={{ fontSize: "21px" }}>
                  My Profile
               </h1>
            }
         />
         <div className="layout-content">
            <div>
               <Stepper
                  label={labelStepper}
                  activeStep={activeStep}
                  setActiveStep={(data) => setActiveStep(data)}
               />
               <div className="my-12" />
               <form onSubmit={handleSubmit(onSubmit)}>
                  {/* step 1 */}
                  {activeStep === 0 &&
                     <PersonalInformation
                        watch={watch}
                        setValue={setValue}
                        register={register}
                        control={control}
                     />
                  }

                  {/* step 2 */}
                  {activeStep === 1 &&
                     <ProfessionalInformation
                        register={register}
                        watch={watch}
                        setValue={setValue}
                        control={control}
                     />}

                  {/* step 3 */}
                  {activeStep === 2 && <Skills watch={watch} setValue={setValue} control={control} />}

                  {/* step 4 */}
                  {/* {activeStep === 3 && <Gallery control={control}/>} */}

                  <NavigationStep
                     isLoading={registerMutation.isLoading}
                     activeStep={activeStep}
                     handleNext={(e) => setActiveStep(e)}
                     handlePrevious={(e) => setActiveStep(e)}
                     handleFinish={(e) => setActiveStep(e)}
                  />
               </form>
            </div>
         </div>
         <Toast ref={toast} position="top-right" />
      </>
   );
}