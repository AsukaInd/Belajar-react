import { LandingPageLayout } from "@/modules/layout/landing-page-layout/LandingPageLayout";
import { Container } from "@/modules/layout/landing-page-layout/Container";
import clsx from "clsx";
import { ServiceList } from "./service/ServiceList";
import { Footer } from "@/modules/layout/landing-page-layout/Footer";
import { useServices } from "./hooks/useServices";
import { SomethingWentWrong } from "@/components/SomethingWentWrong";
import { SpinnerWithLoadingText } from "../../components/ui/LoadingSpinner";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/Accordion';
import { useRouter } from 'next/router'

export function MainFreelancer() {
   const router = useRouter()

   const { data, isLoading, isSuccess } = useServices({
      page: router.query?.id,
      budget: router.query?.budget,
      delivery_time: router.query?.delivery_time
   })

   return (
      <LandingPageLayout>
         <div className="relative">
            <div
               className="w-full h-full absolute opacity-70"
               style={{
                  background:
                     "linear-gradient(101.01deg, #0C5492 -1.25%, #005AA6 100%)",
               }}
            ></div>
            <img
               alt=""
               className="h-[170px] lg:h-auto object-cover"
               src="/landing-images/hire-product-inspector-bg.png"
            />
            <h1
               className={clsx(
                  "absolute z-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
                  "text-white text-[27px] lg:text-[54px] font-semibold text-center"
               )}
            >
               Hire Product Inspectors
            </h1>
         </div>
         <Container>
            <div className="mt-[60px]">
               <div>
                  <h2 className="text-[34px] font-[500]">
                     Service in Mobile and Web
                  </h2>
                  <p className="text-[24px]">
                     Lorem ipsum dolor sit amet consectetur, adipisicing, elit
                  </p>
               </div>
               {
                  isLoading
                     ? (
                        <div className="h-screen flex justify-center items-center gap-4">
                           <SpinnerWithLoadingText />
                        </div>
                     )
                     : isSuccess
                        ? <ServiceList
                           services={data}
                           total={data?.data?.total}
                        />
                        : (
                           <div className="my-[100px] text-center">
                              <SomethingWentWrong />
                           </div>
                        )
               }
            </div>
         </Container>
         <div className="bg-[url(/landing-images/faq-ilustrasi.svg)] py-[60px]">
            <div className="relative z-2 h-full flex items-center justify-center">
               <Container>
                  <h2 className="text-[27px] md:text-[54px] text-blue-custom font-bold text-center mb-[60px] lg:mb-[100px]">
                     Quality Control Services FAQs
                  </h2>
                  <div className="grid md:grid-cols-2 md:gap-[40px]">
                     <Accordion type="multiple">
                        <AccordionItem value="1">
                           <AccordionTrigger>
                              Do I need to provide purchase
                              <br />
                              order and product specifications for inspection?
                           </AccordionTrigger>
                           <AccordionContent>
                              test
                           </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="2">
                           <AccordionTrigger>Who can I contact?</AccordionTrigger>
                           <AccordionContent>
                              test
                           </AccordionContent>
                        </AccordionItem>
                     </Accordion>

                     <Accordion type="multiple">
                        <AccordionItem value="3">
                           <AccordionTrigger>
                              What will be covered in the Product Inspection Scope?
                           </AccordionTrigger>
                           <AccordionContent>
                              test
                           </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="4">
                           <AccordionTrigger>
                              Do your inspectors provide product specific tests on site?
                           </AccordionTrigger>
                           <AccordionContent>
                              test
                           </AccordionContent>
                        </AccordionItem>
                     </Accordion>
                  </div>
               </Container>
            </div>
         </div>
         <Footer className="mt-0 pt-0" />
      </LandingPageLayout>
   );
}
