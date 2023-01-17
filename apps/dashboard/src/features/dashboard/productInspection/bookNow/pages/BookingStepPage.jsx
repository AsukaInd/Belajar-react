import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { AppTopbar } from "~/features/dashboard/layout/AppTopbar";
import { Stepper } from "../components/Stepper";
import Checkout from "../components/Checkout/Checkout";
import NavigationStep from "../components/NavigationStep";
import Preview from "../components/Preview/Preview";
import InspectionDetail from "../components/InspectionDetail/InspectionDetail";
import ProductInformation from "../components/ProductInformation/ProductInformation";
import GeneralInformation from "../components/GeneralInformation/GeneralInformation";
import { useForm } from "react-hook-form";
import { useOrderForm } from "../../api/services/order.services";

export default function BookingStepPage() {
   const [activeStep, setActiveStep] = useState(0);
   const [supplierId, setSupplierId] = useState();
   const AssignStep = [
      "General Information",
      "Product Information",
      "Inspection Details",
      "Submit",
   ];
   const HireStep = [
      "General Information",
      "Product Information",
      "Inspection Details",
      "Preview",
      "Checkout",
   ];
   const [isHire, setIsHire] = useState(true);
   const { control, handleSubmit, watch, register, setValue, getValues } =
      useForm({
         mode: "onSubmit",
         defaultValues: {
            weight_chart: [
               {
                  style: { XS: "" },
               },
            ],
            size_measurement: [
               {
                  pom: { XS: "" },
               },
            ],
         },
      });

   const orderForm = useOrderForm({
      handleSuccess() {
         // onClose();
         location.href = "/app/product-inspection"
      },
   });

   function save(newData) {
      console.log(newData);
      orderForm.mutate(newData);
   }

   const onSubmit = (data) => {
      console.log(data);
      if (isHire) {
         delete data.assign_inspector;
      }

      const formData = new FormData();
      formData.append("subscriber_id", 0);
      formData.append("assign_to_id", 0);
      formData.append("supplier_id", getValues("supplier_id"));
      formData.append("expected_shipment_date", data["ii-expect_ship_date"]);
      formData.append("total_day", data.total_day);
      formData.append("aql_level", data.sample_size);
      formData.append("sample_size", 0);
      formData.append("country_id", getValues("si-country_id"));
      formData.append("critical_defect", data.critical);
      formData.append("major_defect", data.mayor);
      formData.append("minor_defect", data.minor);

      const productSaved = JSON.parse(localStorage.getItem("productId"));
      console.log(productSaved);
      for (let i = 0; i < productSaved.length; i++) {
         formData.append(`product_inspection[${i}]`, productSaved[i]);
      }
      
      for (const pair of formData.entries()) {
         console.log(pair[0] + ", " + pair[1]);
      }
      save(formData);
      console.log(formData);
   };

   return (
      <>
         <>
            <AppTopbar
               left={
                  <h1 className="mb-0" style={{ fontSize: "21px" }}>
                     Booking
                  </h1>
               }
               right={
                  <span className="p-input-icon-left search-client search">
                     <i className="pi pi-search" />
                     <InputText placeholder="Search your client or company name here" />
                  </span>
               }
            />
            <div className="layout-content">
               <div>
                  {/* main content */}
                  <div className="overflow-hidden divide-y m-2">
                     <h1 className="font-bold text-4xl">
                        Amazon FBA Inspection (FBAI)
                     </h1>
                  </div>

                  <Stepper
                     label={isHire ? HireStep : AssignStep}
                     activeStep={activeStep}
                     setActiveStep={(data) => setActiveStep(data)}
                     total={isHire ? HireStep.length : AssignStep.length}
                  />
                  <div className="my-12" />
                  <form onSubmit={handleSubmit(onSubmit)}>
                     {/* step 1 */}
                     {activeStep === 0 && (
                        <GeneralInformation
                           control={control}
                           register={register}
                           setValue={setValue}
                        />
                     )}

                     {/* step 2 */}
                     {activeStep === 1 && (
                        <ProductInformation
                           control={control}
                           register={register}
                           getValues={getValues}
                        />
                     )}

                     {/* step 3 */}
                     {activeStep === 2 && (
                        <InspectionDetail control={control} />
                     )}

                     {/* step 4 */}
                     {activeStep === 3 && (
                        <Preview
                           control={control}
                           setIsHire={(e) => setIsHire(e)}
                           hire={isHire}
                        />
                     )}

                     {/* step 5 */}
                     {activeStep === 4 && <Checkout />}

                     <NavigationStep
                        activeStep={activeStep}
                        total={isHire ? HireStep.length : AssignStep.length}
                        handleNext={(e) => setActiveStep(e)}
                        handlePrevious={(e) => setActiveStep(e)}
                        handleFinish={(e) => setActiveStep(e)}
                     />
                  </form>
               </div>
            </div>
         </>
      </>
   );
}
