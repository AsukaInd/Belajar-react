import { FreelancerProfile } from "@/modules/freelancer/FreelancerProfile";
import { useProfile } from "@/modules/freelancer/hooks/useProfile";
import { useRouter } from "next/router"
// import Head from 'next/head';

export default function FreelancerUserPage() {
   const { query } = useRouter()
   const { data, isSuccess, isLoading, isError } = useProfile({
      username: query.username,
      config: {
         enabled: Boolean(query.username)
      }
   })

   return (
      <>
         {/* <Head>
            <title>
               {isSuccess ? `${data?.data?.first_name} ${data?.data?.last_name} | INSPXT` : "INSPXT"}
            </title>
            <meta
               name="description"
               content="Hire Product Inspectors"
               key="desc"
            />
         </Head> */}
         <FreelancerProfile
            isLoading={isLoading}
            isSuccess={isSuccess}
            isError={isError}
            data={data?.data}
         />
      </>
   )
}