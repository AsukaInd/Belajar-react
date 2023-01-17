import { LandingPageLayout } from "@/modules/layout/landing-page-layout/LandingPageLayout";
import { Container } from "../layout/landing-page-layout/Container";
import { Footer } from "@/modules/layout/landing-page-layout/Footer";
import { DetailHeader } from "./service-detail/DetailHeader";
import { DetailOverview } from "./service-detail/DetailOverview";
import { ServicePackages } from "./service-detail/ServicePackages";
import { ImageSwiper } from "./service-detail/ImageSwiper";
import { DetailDescription } from "./service-detail/DetailDescription";
import { AboutTheSeller } from "./service-detail/AboutTheSeller";
import { ComparePackages } from "./service-detail/ComparePackages";
// import { RecomendedForYou } from "./service-detail/RecomendedForYou";
import { Faq } from "./service-detail/Faq";
// import { Reviews } from "./service-detail/Reviews";
// import { AlsoViewed } from "./service-detail/AlsoViewed";
import { SomethingWentWrong } from "@/components/SomethingWentWrong";
import { SpinnerWithLoadingText } from "@/components/ui/LoadingSpinner";
import clsx from "clsx";

export function FreelancerDetail({ isLoading, isSuccess, data, isError, profile }) {
   return (
      <LandingPageLayout>
         <Container>
            {
               isLoading || profile.isLoading
                  ? (
                     <div className="h-screen flex justify-center items-center gap-4">
                        <SpinnerWithLoadingText />
                     </div>
                  )
                  : isSuccess && profile.isSuccess ? (
                     <>
                        <DetailHeader />
                        <DetailOverview title={data?.title} userData={profile?.data?.data} />
                        <div className="flex flex-col lg:flex-row gap-[40px]">
                           <div
                              className={clsx(
                                 "flex flex-col gap-[60px]",
                                 { 'flex-1': !profile.hasPackage }
                              )}
                           >
                              <ImageSwiper images={data?.gig_gallery?.gig_photos} />
                              <DetailDescription description={data?.description} />
                              <AboutTheSeller user={profile?.data?.data} />
                              <ComparePackages hasPackage={data?.hasPackage} packages={data?.package_gigs} />
                              {/* <RecomendedForYou /> */}
                              <Faq faqData={data?.faqs_gig} />
                              {/* <Reviews reviews={serviceDetailData?.reviews} /> */}
                           </div>
                           <aside className="sticky w-[400px] top-5 self-start">
                              <ServicePackages hasPackage={data?.hasPackage} packages={data?.package_gigs} />
                           </aside>
                        </div>
                        <div className="mt-[60px]">
                           {/* <AlsoViewed /> */}
                        </div>
                     </>
                  )
                     : isError || profile.isError
                        ? (
                           <div className="my-[100px] text-center">
                              <SomethingWentWrong />
                           </div>
                        )
                        : <div className="h-screen"></div>
            }
         </Container>
         <Footer className="bg-[#F5FAFF]" />
      </LandingPageLayout>
   );
}
