import { useAuth } from "../../auth/useAuth"
import { MobileContainer } from "../components/Container"
import { OfficerHomeLayout } from "../layout/OfficerHomeLayout"
import { OnboardingSwiper } from "../onboarding/OnboardingSwiper"
import { MainHome } from "../home/MainHome"

export default function Onboarding() {
   const { officerToken } = useAuth()

   if (officerToken) {
      return (
         <OfficerHomeLayout>
            <MobileContainer>
               <MainHome />
            </MobileContainer>
         </OfficerHomeLayout>
      )
   }

   return <OnboardingSwiper />
}