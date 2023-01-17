import { FreelancerDetail } from "@/modules/freelancer/FreelancerDetail"
import { useServices } from "@/modules/freelancer/hooks/useServices"
import { useRouter } from "next/router"
// import Head from 'next/head';
import { useProfile } from "@/modules/freelancer/hooks/useProfile";

export default function DetailPage() {
   const { query } = useRouter()

   const { data, isSuccess, isLoading, isError } = useServices({
      id: query.slug,
      config: {
         enabled: Boolean(query.slug)
      }
   })

   const profileQuery = useProfile({
      username: query.username,
      config: {
         enabled: Boolean(query.username)
      }
   })

   return (
      <>
         {/* <Head>
            <title>
               {isSuccess ? `${data?.data?.title} | INSPXT` : "INSPXT"}
            </title>
            <meta
               name="description"
               content={isSuccess ? data?.data?.description : "Hire Product Inspectors"}
               key="desc"
            />
         </Head> */}
         <FreelancerDetail
            isLoading={isLoading}
            isSuccess={isSuccess}
            isError={isError}
            data={data?.data}
            profile={profileQuery}
         />
      </>
   )
}