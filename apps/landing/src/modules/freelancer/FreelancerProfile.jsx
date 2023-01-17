import { LandingPageLayout } from "@/modules/layout/landing-page-layout/LandingPageLayout";
import { Container } from "../layout/landing-page-layout/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";
// import { Chip } from "@/components/ui/Chip";
import Link from "next/link"
import { Footer } from "@/modules/layout/landing-page-layout/Footer";
import { ServiceItem } from "./service/ServiceItem";
import { ReviewItem } from "./service-review/ReviewItem";
import { SpinnerWithLoadingText } from "@/components/ui/LoadingSpinner";
import { SomethingWentWrong } from "@/components/SomethingWentWrong";
import { UserPhoto } from "./service/UserPhoto";

export function FreelancerProfile({ isLoading, isSuccess, data, isError }) {
   return (
      <LandingPageLayout>
         <Container>
            {
               isLoading
                  ? (
                     <div className="h-screen flex justify-center items-center gap-4">
                        <SpinnerWithLoadingText />
                     </div>
                  )
                  : isSuccess
                     ? (
                        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-[50px] text-black-custom">
                           <ProfileUI userData={data} />
                           <div className="col-span-2 mt-[60px] lg:mt-0">
                              <UserServices gig={data?.gig} />
                              <SellerReview />
                           </div>
                        </div>
                     )
                     : isError
                        ? (
                           <div className="my-[100px] text-center">
                              <SomethingWentWrong />
                           </div>
                        )
                        : null
            }
         </Container>
         <Footer className="bg-[#F5FAFF]" />
      </LandingPageLayout>
   );
}

function ProfileUI({ userData }) {

   // const skills = [
   //    "Product Inspection",
   //    "Sample ColLection",
   //    "Production Supervision",
   //    "Gap Analysis",
   //    "Quality Audit GSV",
   //    "GSV"
   // ]

   // const certifications = [
   //    "ISO 9001",
   //    "ISO 14001",
   //    "APSCA",
   //    "BSCI"
   // ]

   return (
      <div className="flex flex-col gap-[40px]">
         <Card className="p-[40px] flex flex-col">
            <div className="flex flex-col items-center">
               <UserPhoto
                  className="w-[120px] h-[120px] mb-[24px] text-[90px]"
                  firstName={userData.first_name}
                  src={userData.photo}
               />
               <h1 className="text-[24px] font-semibold mb-[4px] capitalize">
                  {userData.first_name} {userData.last_name}
               </h1>
               <p className="mb-[40px] text-center">UI/UX Designer | UX Researcher</p>
               <Button contained className="shadow-[0px_40px_60px_rgba(0,90,166,0.1)]">Contact Me</Button>
               <Separator className="my-[40px]" />
            </div>
            <div className="flex flex-col gap-[24px]">
               <div className="flex items-center justify-between">
                  <p>From</p>
                  {/* <p>United States</p> */}
               </div>
               <div className="flex items-center justify-between">
                  <p>Member Since</p>
                  <p>{userData.created_at}</p>
               </div>
               <div className="flex items-center justify-between">
                  <p>Avg. Response Time</p>
                  {/* <p>2 hours</p> */}
               </div>
            </div>
         </Card>
         <Card className="p-[40px]">
            <h1 className="font-semibold text-[24px]" >Description</h1>
            <Separator className="my-[20px]" />
            <p>{userData.description}</p>
         </Card>
         {/* <Card className="p-[40px]">
            <h1 className="font-semibold text-[24px]" >Languages</h1>
            <Separator className="my-[20px]" />
            <div className="flex flex-col gap-[20px]">
               <p>English (Fluent)</p>
               <p>Spanish (Conversational)</p>
               <p>French (Basic)</p>
            </div>
         </Card>
         <Card className="p-[40px]">
            <h1 className="font-semibold text-[24px]" >Skills</h1>
            <Separator className="my-[20px]" />
            <div className="flex flex-wrap gap-x-[10px] gap-y-[16px]">
               {
                  skills.map(skill => <Chip key={skill}>{skill}</Chip>)
               }
            </div>
         </Card>
         <Card className="p-[40px]">
            <h1 className="font-semibold text-[24px]" >Certification</h1>
            <Separator className="my-[20px]" />
            <div className="flex flex-wrap gap-x-[10px] gap-y-[16px]">
               {
                  certifications.map(certification => <Chip key={certification}>{certification}</Chip>)
               }
            </div>
         </Card> */}
      </div>
   )
}

function UserServices({ gig }) {
   return (
      <div>
         {
            gig ?
               (
                  <>
                     <div className="grid md:grid-cols-2 gap-16">
                        {
                           gig?.map(item => <ServiceItem bannerClassName="h-[210px]" key={item.id} item={item} />)
                        }
                     </div>
                     <Button className="my-[40px] mx-auto" contained>Load More</Button>
                  </>
               )
               : null
         }
      </div>
   )
}

function SellerReview() {
   const reviews = [
      {
         id: 1,
         user_picture: '/landing-images/john-smith.png',
         full_name: 'John Smith',
         country: "China",
         rating: 5,
         content: "The process was smooth, after providing the required info, Pragyesh sent me an outstanding packet of wireframes. Thank you a lot!",
         created_at: 'Published 4 weeks ago'
      }
   ]

   return (
      <div>
         <div className="text-[16px] md:text-[24px] font-[600] flex justify-between mb-[30px]">
            <h2>
               Reviews as Seller <span className="font-normal">(62 reviews)</span>
            </h2>
            <Link href="#"><a className="text-blue-custom">View All</a></Link>
         </div>
         <div>
            {
               reviews.map(review => <ReviewItem key={review.id} review={review} />)
            }
         </div>
      </div>
   )
}
