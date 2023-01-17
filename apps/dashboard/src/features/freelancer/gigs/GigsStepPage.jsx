import { InputText } from "primereact/inputtext";
import { useState, useRef } from "react";
import { AppTopbar } from "~/features/freelancer/layout/AppTopbar";
import { Stepper } from "../gigs/components/Stepper";
import NavigationStep from "../gigs/components/NavigationStep";
import Pricing from "../gigs/components/pricing/Pricing"
import Overview from "./components/overview/Overview";
import { useForm } from "react-hook-form";
import Faqs from "./components/faqs/Faqs";
import Gallery from "./components/gallery/Gallery";
import { useGigsForm } from "../hooks/gigs/useGigsForm";
import { Toast } from "primereact/toast";

export default function GigsStepPage() {
   const toast = useRef(null);
   const [activeStep, setActiveStep] = useState(0);
   const labelStepper = [
      "Overview",
      "Pricing",
      "FAQ's",
      "Gallery",
   ];

   const { control, handleSubmit, watch, setValue, register } = useForm({
      mode: "onSubmit",
      defaultValues: {
         title: "",
         seo_title: "",
         category_id: "",
         sub_category_id: "",
         job_type_id: "1",
         description: "",
         legal_doc: 1,
         package_gigs: [
            {
               price_package: '',
               level_package: 'basic',
               revision_package_id: '1',
               delivery_time_package_id: '1',
               name_package: '',
               description: '',
               scope_package_gigs: [
                  {
                     scope_id: 1,
                     scope_is_true: 0
                  },
                  {
                     scope_id: 2,
                     scope_is_true: 0
                  },
                  {
                     scope_id: 3,
                     scope_is_true: 0
                  },
                  {
                     scope_id: 4,
                     scope_is_true: 0
                  }
               ],
               delivery_time: '',
               revision_limit: '1'
            },
            {
               price_package: '',
               level_package: 'medium',
               revision_package_id: '1',
               delivery_time_package_id: '1',
               name_package: '',
               description: '',
               scope_package_gigs: [
                  {
                     scope_id: 1,
                     scope_is_true: 0
                  },
                  {
                     scope_id: 2,
                     scope_is_true: 0
                  },
                  {
                     scope_id: 3,
                     scope_is_true: 0
                  },
                  {
                     scope_id: 4,
                     scope_is_true: 0
                  }
               ],
               delivery_time: '',
               revision_limit: '1'
            },
            {
               price_package: '',
               level_package: 'premium',
               revision_package_id: '1',
               delivery_time_package_id: '1',
               name_package: '',
               description: '',
               scope_package_gigs: [
                  {
                     scope_id: 1,
                     scope_is_true: 0
                  },
                  {
                     scope_id: 2,
                     scope_is_true: 0
                  },
                  {
                     scope_id: 3,
                     scope_is_true: 0
                  },
                  {
                     scope_id: 4,
                     scope_is_true: 0
                  }
               ],
               delivery_time: '',
               revision_limit: '1'
            }
         ],
         faqs_gigs: [
            {
               faqs_id: 0,
               project_detail_name: "",
               description_faq: ""
            },
            {
               faqs_id: 1,
               project_detail_name: "",
               description_faq: ""
            },
            {
               faqs_id: 2,
               project_detail_name: "",
               description_faq: ""
            }
         ],
         gig_photos: [
            {
               image: null
            },
            {
               image: null
            },
            {
               image: null
            }
         ]
      },
   });

   const addGigsMutation = useGigsForm({
      onSuccess() {
         toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Gig successfully created",
            life: 3000,
         });
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

   const onSubmit = (data) => {
      addGigsMutation.mutate(data)
   };

   return (
      <>
         <AppTopbar
            left={
               <h1 className="mb-0" style={{ fontSize: "21px" }}>
                  Post Gigs
               </h1>
            }
         />
         <div className="layout-content">
            <div>
               {/* main content
                  <div className="overflow-hidden divide-y m-2">
                     <h1 className="font-bold text-4xl">
                        Amazon FBA Inspection (FBAI)
                     </h1>
                  </div> */}

               <Stepper
                  label={labelStepper}
                  activeStep={activeStep}
                  setActiveStep={(data) => setActiveStep(data)}
               />
               <div className="my-12" />
               <form onSubmit={handleSubmit(onSubmit)}>
                  {/* step 1 */}
                  {activeStep === 0 && <Overview control={control} />}

                  {/* step 2 */}
                  {activeStep === 1 && <Pricing control={control} />}

                  {/* step 3 */}
                  {activeStep === 2 && <Faqs control={control} />}

                  {/* step 4 */}
                  {activeStep === 3 && (
                     <Gallery
                        watch={watch}
                        setValue={setValue}
                        register={register}
                        control={control}
                     />
                  )}

                  <NavigationStep
                     isLoading={addGigsMutation.isLoading}
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
